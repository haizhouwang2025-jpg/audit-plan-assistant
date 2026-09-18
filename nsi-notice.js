function parseNsiNotice(rawText,fileName) {
  const text=rawText.replace(/\r\n?/g,'\n').replace(/\u0007/g,'\t').replace(/文件编号\s*[:：]\s*NSI\s*\/\s*CX-01-02/gi,'');
  let flat=text.replace(/\s+/g,' ').trim();
  for(const label of ['受审核方名称','项目编号','工商注册地址','实际地理地址','客户代表','联系人','职务','邮编','多场所情况','有显著差异的倒班作业情况','已获知的重大变更事宜','认证领域和审核类型','审核总人日','现场审核人日','认证标准','专业小类代码','审核范围','审核时间安排','审核组成员','审核提示','上一次审核时间']) flat=flat.replace(new RegExp([...label].join('\\s*'),'g'),label);
  const field=(start,end)=>{
    const match=new RegExp(start).exec(flat);
    if(!match) return '';
    const tail=flat.slice(match.index+match[0].length), stop=new RegExp(end).exec(tail);
    return tail.slice(0,stop?.index ?? tail.length).replace(/^[ :：]+/,'').replace(/\s+\d+\.\d+\s*$/,'').trim();
  };
  const project={
    company_name:field('受审核方名称','1\\.2|项目编号'),
    project_number:field('项目编号','1\\.3|工商注册地址').replace(/\s/g,''),
    registered_address:field('工商注册地址\\s*[/／]\\s*邮编','1\\.4|实际地理地址'),
    address:field('实际地理地址\\s*[/／]\\s*邮编','1\\.5|客户代表'),
    site_arrangements:field('多场所情况','1\\.9|有显著差异'),
    shift_details:field('有显著差异的倒班作业情况','1\\.10|已获知'),
    audit_type_detail:field('认证领域和审核类型','特殊|2\\.2|认证证书'),
    special_types:field('特殊','2\\.2|认证证书'),
    industry_code:field('专业小类代码','2\\.6|审核总人日').replace(/\s/g,''),
    travel_intervals:[],audit_method:'现场审核'
  };
  const warnings=['审核方式暂按现场审核，部门名称及实际职责请复核。'];
  if(/^(无|不适用|[-/])$/.test(project.site_arrangements)) project.site_arrangements='';
  const changes=field('已获知的重大变更事宜','2\\.审核|2\\.1|审核策划');
  const checked=[...changes.matchAll(/[■☑✓√]\s*([^；;□■☑✓√]+)/g)].map(m=>m[1].trim());
  project.changes=checked.length ? checked.join('；') : '';
  if(!checked.length) warnings.push('通知书未勾选变更事项，请确认无变更后填写“无”。');
  const contact=(label,end,prefix)=>{
    const part=field(label+'\\s*[/／]\\s*职务',end);
    project[prefix==='contact'?'contact_name':'management_representative']=part.split(/电话/)[0].trim();
    const phones=part.match(/电话\s*[:：]?\s*([^]*?)(?:邮箱|$)/)?.[1]?.trim() || '';
    project[prefix==='contact'?'contact_phone':'representative_phone']=[...new Set(phones.split(/\s+/))].join(' ');
    project[prefix==='contact'?'contact_email':'representative_email']=part.match(/邮箱\s*[:：]?\s*(.*)/)?.[1]?.trim() || '';
  };
  contact('客户代表','1\\.6|联系人','representative');
  contact('联系人','1\\.7|体系覆盖范围','contact');
  const criteria=field('认证标准','2\\.4|审核范围').replace(/\s*([/:-])\s*/g,'$1').replace(/(\d)\s+(?=\d)/g,'$1');
  if(/27001|20000|50001|22000|13485|22301/.test(criteria)) throw new Error('这份中标联合通知书包含当前未接入的体系，不能按质量单体系排程。');
  const systems=[];
  if(/9001|19001|质量管理体系/.test(criteria+project.audit_type_detail)) systems.push('QMS');
  if(/14001|24001|环境管理体系/.test(criteria+project.audit_type_detail)) systems.push('EMS');
  if(/45001|职业健康安全/.test(criteria+project.audit_type_detail)) systems.push('OHSMS');
  project.audit_systems=systems.join(',');
  if(systems.length===1 && systems[0]==='QMS') {
    project.criteria_q=criteria;
    project.scope_text_q=field('审核范围','2\\.5|专业小类代码');
    project.scope_q=project.industry_code;
  } else warnings.push('中标联合目前仅接入质量单体系，请勿忽略其他体系；补齐适配后方可输出。');
  project.stage2_audit_type=/再认证/.test(project.audit_type_detail) ? '再认证审核' : /监督|监审/.test(project.audit_type_detail) ? '监督审核' : /第一阶段|一阶段/.test(project.audit_type_detail) ? '初次认证第一阶段' : /第二阶段|二阶段/.test(project.audit_type_detail) ? '初次认证第二阶段' : '';
  const days=field('审核总人日\\s*[/／]\\s*现场审核人日','证书是否带标|2\\.7|审核时间安排').match(/^([\d.]+)\s*[/／]\s*([\d.]+)/);
  project.total_person_days=days?.[1] || '';
  project.stage2_person_days=days?.[2] || '';
  readNoticeTimeRange(project,field('审核时间安排','2\\.8|审核组成员'),flat);
  project.shift_required=Boolean(project.shift_details && !/^(无|不适用|[-/])$/.test(project.shift_details));
  const previous=flat.match(/上一次审核时间\s*[:：]\s*(20\d{2})\s*[年/.\-]\s*(\d{1,2})\s*[月/.\-]\s*(\d{1,2})/);
  project.coverage_start_date=previous ? `${previous[1]}-${previous[2].padStart(2,'0')}-${previous[3].padStart(2,'0')}` : '';
  if(previous) warnings.push('审核取证起点暂带入上次审核日期，请按项目要求复核。');
  project.planning_notes=field('审核提示','上一次审核时间|3\\.认证公正性');
  const auditors=parseNsiAuditors(field('审核组成员','2\\.9|审核提示'),systems,warnings);
  suggestNoticeTimes(project,auditors);
  return {project,auditors,departments:[],mappings:[],sourceType:'task_notice',fileName,rawText,warnings};
}

function parseNsiAuditors(group,systems,warnings) {
  const starts=[...group.matchAll(/(?:^|\s)([A-Z])\s+(?=[\u3400-\u9fff])/g)];
  const people=[];
  starts.forEach((m,i)=>{
    const row=group.slice(m.index+m[0].length-1,starts[i+1]?.index ?? group.length).trim();
    const roleMatch=/(组长(?:\s*文审)?|组员|技术专家|专家|实习审核员)/.exec(row);
    if(!roleMatch) {warnings.push(`${m[1]} 人员行未完整识别，请复核。`);return;}
    const head=row.slice(0,roleMatch.index).replace(/\s/g,'');
    const fullTime=head.match(/[（(](专职|兼职)[）)]/)?.[1] || '';
    const name=head.replace(/[（(](?:专职|兼职)[）)]/,'');
    const rest=row.slice(roleMatch.index+roleMatch[0].length).trim();
    const registration=rest.match(/\d{4}\s*-\s*[A-Z0-9]+\s*-\s*\d+/)?.[0]?.replace(/\s/g,'') || '';
    const professional=rest.match(/\d{2}(?:\s*\.\s*\d{2}){2}(?:\s*新)?/g)?.map(s=>s.replace(/\s/g,'')).join(';') || '';
    const phone=rest.match(/\b1\d{10}\b|\b0\d{2,3}-\d{7,8}\b/)?.[0] || '';
    const role=noticeAuditorRoles(roleMatch[1].replace(/\s/g,'')).role;
    const professionalCodes=systems.length===1 ? {[systems[0]]:professional} : {};
    const registrationStatus=rest.split(registration ? /\d{4}\s*-/ : /\d{2}\./)[0].trim();
    if(!registration && !['技术专家','实习'].includes(role)) warnings.push(`${name}的注册证书号未可靠读取，请复核。`);
    people.push({id:m[1],code:m[1],name,role,additionalDuty:/文审/.test(roleMatch[1])?'文审':'',registrationStatus,registration,professionalCodes,phone,fullTime,employer:'',independent:!['技术专家','实习'].includes(role)});
  });
  if(!people.length) warnings.push('未完整读取审核组，请按原通知书补充。');
  return people;
}
