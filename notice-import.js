const NOTICE_SYSTEMS = { QMS: 'q', EMS: 'e', OHSMS: 's' };

async function readTaskNotice(file) {
  if (file.size > 10 * 1024 * 1024) throw new Error('通知书不能超过 10 MB。');
  const extension = file.name.split('.').pop().toLowerCase();
  let text = '';
  if (extension === 'doc') {
    text = docToText(await file.arrayBuffer());
    if (text === null) throw new Error('无法读取该 Word 文件，可能已加密或格式不受支持。请另存为 .docx 后导入。');
  } else if (extension === 'docx') {
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    const entry = zip.file('word/document.xml');
    if (!entry) throw new Error('文件不是有效的 Word 通知书。');
    if (entry._data?.uncompressedSize > 20 * 1024 * 1024) throw new Error('Word 正文过大。');
    const xml = parseXml(await entry.async('string'));
    const body = elementsByLocalName(xml, 'body')[0];
    if (!body) throw new Error('Word 正文为空。');
    const paragraphText = p => elementsByLocalName(p, 't').filter(t => !t.closest('del')).map(t => t.textContent).join('');
    text = [...body.children].map(element => {
      if (element.localName === 'tbl') return [...element.children].filter(el => el.localName === 'tr').map(row =>
        [...row.children].filter(el => el.localName === 'tc').map(cell => elementsByLocalName(cell, 'p').map(paragraphText).join('\n')).join('\t')
      ).join('\n');
      return paragraphText(element);
    }).join('\n');
  } else if (extension === 'pdf') text = await extractPdfText(file);
  else if (extension === 'txt') text = await file.text();
  else throw new Error('请导入 .doc、.docx、带文字层的 PDF 或配套 .xlsx。');
  if (!text || text.replace(/\s/g, '').length < 50) throw new Error('未读取到有效正文。扫描件请先识别文字或改用 Word 通知书。');
  return parseTaskNotice(text, file.name);
}

function parseTaskNotice(rawText, fileName) {
  let text = rawText.replace(/\r\n?/g, '\n').replace(/\u0007/g, '\t').replace(/\u00a0/g, ' ').replace(/«[^»]*»/g, '').trim();
  for (const label of ['受审核方名称','注册地址','经营地址','管理者代表','联系人','认证领域和审核类型','认证标准','变更事项','审核范围','专业代码','申请评审补充说明','审核策划补充说明','多场所抽样','审核时间']) {
    text = text.replace(new RegExp([...label].join('\\s*'),'g'),label);
  }
  text = text.replace(/对于\s*M\s*MS/g,'对于MMS').replace(/对于\s*E\s*nMS/g,'对于EnMS');
  if (!/审核.{0,6}通知书/.test(text)) throw new Error('未识别为审核任务通知书。请核对文件，原计划未变更。');
  const warnings = [], project = {};
  // Delimit by form labels, never by a global first date or a person's qualifications.
  const between = (start, ends) => {
    const match = new RegExp(start).exec(text);
    if (!match) return '';
    let value = text.slice(match.index + match[0].length);
    const end = new RegExp(ends).exec(value);
    if (end) value = value.slice(0, end.index);
    return value.replace(/^[\s:：]+/, '').trim();
  };
  const fields = {
    company_name: ['受审核方名称|受审核组织名称', '合同编号|注册地址'],
    registered_address: ['注册地址', '经营地址|实际经营地址'],
    address: ['(?:^|\n)[\t ]*(?:经营地址|实际经营地址)', '管理者代表|联系人'],
    changes: ['变更事项', '证书状态|审核范围|认证范围'],
    industry_code: ['专业代码', '风险级别|认可标识|规模人数'],
    audit_type_detail: ['认证领域和审核类型', '其他[:：]|认证标准|审核标准'],
    application_notes: ['申请评审补充说明', '审核策划补充说明|2[.、．]审核组'],
    planning_notes: ['审核策划补充说明', '2[.、．]审核组']
  };
  for (const [key, [start, end]] of Object.entries(fields)) project[key] = between(start, end);
  const labelled = value => {
    const result = {};
    const matches = [...value.matchAll(/\b(QMS|EMS|OHSMS|Q|E|S)\s*[:：]/gi)];
    matches.forEach((m, i) => { result[{Q:'QMS',E:'EMS',S:'OHSMS'}[m[1].toUpperCase()] || m[1].toUpperCase()] = value.slice(m.index + m[0].length, matches[i+1]?.index ?? value.length).replace(/[;；\s]+$/, '').trim(); });
    return result;
  };
  const criteriaBlock = between('认证标准|审核标准', '变更事项|证书状态|审核范围');
  if (/27001|20000|50001|22000|13485|22301/.test(criteriaBlock)) throw new Error('当前通知书自动排程仅支持 QMS、EMS、OHSMS 及其组合，不能忽略通知书中的其他体系。');
  const criteria = labelled(criteriaBlock);
  const scopes = labelled(between('审核范围|认证范围', '对于MMS|对于EnMS|MMS认证级别|EnMS边界|专业代码|风险级别'));
  const types = labelled(project.audit_type_detail);
  const contracts = labelled(between('合同编号', '注册地址'));
  const systems = Object.keys(NOTICE_SYSTEMS).filter(s => criteria[s] || scopes[s] || types[s]);
  project.audit_systems = systems.join(',');
  for (const system of systems) {
    const suffix = NOTICE_SYSTEMS[system];
    project[`contract_${suffix}`] = contracts[system] || '';
    project[`criteria_${suffix}`] = criteria[system] || '';
    project[`scope_text_${suffix}`] = scopes[system] || '';
    project[`scope_${suffix}`] = (project.industry_code.match(/\b\d{2}(?:\.\d{2}){1,2}\b/g) || []).join(';');
  }
  if (!systems.length) warnings.push('未可靠识别体系，请按通知书勾选。不会按审核员资质推断体系。');
  const ems = criteria.EMS || '';
  project.ems_version = /2015|24001-2016/.test(ems) ? '2015' : /2026/.test(ems) ? '2026' : '';
  if (systems.includes('EMS') && !project.ems_version) warnings.push('环境标准版本需确认。');
  const contact = (start, end, name, phone, email) => {
    const block = between(start, end);
    const parts = block.split(/电话\s*[:：]?/);
    project[name] = parts[0]?.replace(/^[\/／]职务/, '').trim() || '';
    project[phone] = parts[1]?.split(/邮箱/)[0].trim().replace(/\s+/g, '') || '';
    if (email) project[email] = block.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]+/)?.[0] || '';
  };
  contact('管理者代表(?:[/／]职务)?', '联系人', 'management_representative', 'representative_phone');
  contact('联系人(?:[/／]职务)?', '认证领域|审核类型|认证标准', 'contact_name', 'contact_phone', 'contact_email');
  project.stage2_audit_type = /监审|监督/.test(project.audit_type_detail) ? '监督审核' : /再认证/.test(project.audit_type_detail) ? '再认证审核' : /第一阶段|一阶段/.test(project.audit_type_detail) ? '初次认证第一阶段' : /第二阶段|二阶段/.test(project.audit_type_detail) ? '初次认证第二阶段' : '';
  const datesText = between(/审核日期\s*[:：]/, '申请评审补充说明|审核策划补充说明|2[.、．]审核组');
  const dates = [...datesText.matchAll(/(20\d{2})\s*[年/.-]\s*(\d{1,2})\s*[月/.-]\s*(\d{1,2})\s*日?\s*(上午|下午)?\s*(\d{1,2}:\d{2})?/g)];
  const iso = m => `${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`;
  project.stage2_start_date = dates[0] ? iso(dates[0]) : '';
  project.stage2_end_date = dates[1] ? iso(dates[1]) : project.stage2_start_date;
  project.stage2_start_time = dates[0]?.[5] || (dates[0]?.[4] === '下午' ? '13:00' : '08:30');
  project.stage2_end_time = dates[1]?.[5] || (dates[1]?.[4] === '上午' ? '12:00' : '17:00');
  if (!dates[0]?.[5] || !dates[1]?.[5]) warnings.push('通知书未列出完整起止时刻；当前时刻为建议值，请确认。');
  project.stage2_person_days = text.match(/总现场审核(?:时间|人日)\s*[:：]\s*([\d.]+)\s*人日/)?.[1] || '';
  const previous = text.match(/上一次审核结束日期\s*[:：]\s*(20\d{2})[年/.-](\d{1,2})[月/.-](\d{1,2})/);
  project.coverage_start_date = previous ? iso(previous) : '';
  if (previous) warnings.push('审核覆盖起点暂带入上次审核结束日，请按本项目要求复核。');
  project.audit_method = /审核方式\s*[:：]\s*[■☑✓√]\s*现场审核/.test(text) ? '现场审核' : '';
  project.shift_required = /[■☑✓√]\s*针对倒班/.test(text);
  project.outsource_visit = /[■☑✓√]\s*针对外包/.test(text) ? '是' : '否';
  if (project.shift_required) warnings.push('通知书要求倒班审核，请补充日期、开始时间和时长。');
  const otherRegistered = project.application_notes.match(/注册地址是\s*[:：]?\s*([^，,。\n]+)/)?.[1]?.trim();
  const otherAddress = project.application_notes.match(/实际经营地址是\s*[:：]?\s*([^，,。\n]+)/)?.[1]?.trim();
  const addressConflict = Boolean((otherRegistered && otherRegistered!==project.registered_address) || (otherAddress && otherAddress!==project.address));
  if (addressConflict) warnings.push('地址冲突：基本信息/变更事项与补充说明中另列地址，请核实最终注册地址及经营地址。');
  if (/■|☑/.test(between('多场所抽样', '审核时间'))) warnings.push('涉及多场所抽样，请在场所安排中补充实际场所和人员路线，正式输出前仍需核对。');
  const groupText = between(/2[.、．]\s*审核组[^\n]*/, /组内见证安排|3[.、．]\s*其他说明/);
  const auditors = [];
  const groupLines = groupText.includes('\t') ? groupText.split('\n') : [...groupText.matchAll(/(?:^|\n)\s*[A-Z]\s+\S+\s+(?:[QES]+\s*[:：]\s*)?(?:组长|组员|技术专家|实习审核员|实习)/g)].map((m,i,all)=>groupText.slice(m.index,all[i+1]?.index ?? groupText.length).replace(/\s+/g,' ').trim());
  for (const line of groupLines) {
    let cells = line.split('\t').map(s => s.trim());
    if (cells.length < 5) {
      const m = line.trim().match(/^([A-Z])\s+(\S+)\s+((?:[QES]+\s*[:：]\s*)?(?:组长|组员|技术专家|实习审核员|实习))\s+(.+)$/);
      if (!m) continue;
      const rest = m[4].replace(/\s*-\s*/g,'-').replace(/\(\s*([QES]+)\s*\)/g,'($1)');
      const professional = rest.match(/\d{2}(?:\.\d{2}){1,2}\s*[(（][QES]+[)）]/g)?.join(';') || '';
      cells = [m[1],m[2],m[3],rest.split(/\d{2}\.\d{2}/)[0].trim(),professional,'','',rest.match(/1\d{10}/)?.[0] || ''];
    }
    if (!/^[A-Z]$/.test(cells[0]) || !cells[1] || !/组长|组员|专家|实习/.test(cells[2])) continue;
    const role = /实习/.test(cells[2]) ? '实习' : /专家/.test(cells[2]) ? '技术专家' : /组长/.test(cells[2]) ? '组长' : '组员';
    const professionalCodes = {QMS:'',EMS:'',OHSMS:''};
    const codes = [...cells[4].matchAll(/(\d{2}(?:\.\d{2}){1,2})\s*[(（]([QES]+)[)）]/g)];
    codes.forEach(m => [...m[2]].forEach(c => { const s = {Q:'QMS',E:'EMS',S:'OHSMS'}[c]; professionalCodes[s] = [professionalCodes[s],m[1]].filter(Boolean).join(';'); }));
    if (cells[4] && !codes.length) warnings.push(`${cells[1]}的专业代码未明确分体系，请人工填写对应能力，未自动授权。`);
    auditors.push({id:cells[0],code:cells[0],name:cells[1],role,registration:cells[3],professionalCodes,professional:codes.length>0,independent:!['技术专家','实习'].includes(role),employer:cells[5] || '',fullTime:cells[6] || '',phone:cells[7] || ''});
  }
  if (!auditors.length) warnings.push('未可靠读取审核组表格，请补充人员；未沿用演示审核员。');
  project.lunch_start = '12:00'; project.lunch_hours = 1;
  project.travel_intervals = [];
  return {project,auditors,departments:[],mappings:[],sourceType:'task_notice',fileName,rawText:text,warnings,addressConflict};
}
