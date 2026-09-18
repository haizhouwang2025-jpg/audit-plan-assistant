function buildNsiPlanModel() {
  const model=buildHaidePlanModel({agency:'nsi'}), f=model.fields;
  const p=state.importedPlan?.project || {};
  const value=key=>valueToString(p[key]);
  const type=document.getElementById('audit-type').value;
  const start=document.getElementById('start-date').value;
  const end=start ? addDays(start,scheduleWindow().days-1) : '';
  f.project_number=value('project_number');
  f.representative_email=value('representative_email');
  const systems=state.systems.filter(s=>STANDARD_SYSTEMS[s]);
  const types=splitSystemValues(value('audit_type_detail'));
  f.audit_types=systems.map(s=>`${STANDARD_SYSTEMS[s].name}：${state.activePhase==='stage1' ? type : types[s] || type}`).join('\n');
  f.special_types=value('special_types') || '□暂停恢复；□认证范围扩大；□转换机构；□转换标准';
  f.scopes=systems.map(s=>`${systems.length>1 ? STANDARD_SYSTEMS[s].name+'：' : ''}${value('scope_text_'+STANDARD_SYSTEMS[s].suffix)}`).join('\n');
  f.coverage=`审核取证期限：自 ${value('coverage_start_date')} 至 ${value('coverage_end_date') || end} 止。需要时，可超期取证。`;
  f.criteria=`1）${systems.map(s=>`${systems.length>1 ? STANDARD_SYSTEMS[s].code+'：' : ''}${value('criteria_'+STANDARD_SYSTEMS[s].suffix)}`).join('；')}\n2）受审核方管理体系文件\n3）适用的国家、行业及地方有关的法律法规及其他要求${value('criteria_extra')?'\n4）'+value('criteria_extra'):''}`;
  f.total_person_days=value('total_person_days');
  f.onsite_person_days=value(state.activePhase==='stage1'?'stage1_person_days':'stage2_person_days');
  if (value('person_days_detail')) f.schedule_notes += '\n分体系人日（来源原文）：'+value('person_days_detail');
  f.dates=`${start} ${document.getElementById('audit-start-time').value} 至 ${end} ${document.getElementById('audit-end-time').value}，共 ${scheduleWindow().days} 天`;
  f.method=value('audit_method')==='现场审核' ? '■现场  □远程' : value('audit_method')==='远程审核' ? '□现场  ■远程' : value('audit_method');
  const selected=/第一阶段/.test(type)?0:/第二阶段/.test(type)?1:/监督|监审/.test(type)?2:/再认证/.test(type)?3:/转换前/.test(type)?4:5;
  f.other_purpose=value('other_purpose') || '能否推荐□扩大认证范围；□恢复被暂停的认证；□标准转换认证';
  for(let i=0;i<6;i++) f[`purpose_${i}`]=i===selected?'■':'□';
  if(selected===5 && !value('other_purpose')) model.warnings.push('请补充本次其他审核目的。');
  if(!f.project_number) model.warnings.push('请补充中标联合项目编号。');
  if(!(Number(f.total_person_days)>0) || Number(f.total_person_days)<Number(f.onsite_person_days)) model.warnings.push('审核总人日须大于零，且不能小于现场审核人日。');
  model.auditors=model.auditors.map((a,i)=>{
    const person=state.auditors[i];
    if(!person.registrationStatus) model.warnings.push(`${person.name} 注册状态/专家职称待补充。`);
    return {...a,name:person.name+(person.fullTime?`\n(${person.fullTime==='是'?'专职':person.fullTime==='否'?'兼职':person.fullTime})`:''),role:noticeAuditorRoleLabel(person)+(person.additionalDuty || ''),registration_status:person.registrationStatus || '',registration:[a.registration,a.employer].filter(Boolean).join('\n'),professional_codes:systems.map(s=>person.professionalCodes?.[s] ? `${systems.length>1 ? STANDARD_SYSTEMS[s].code+'：' : ''}${person.professionalCodes[s]}` : '').filter(Boolean).join('\n')};
  });
  // Combine only adjacent final-day meetings; user-adjusted gaps remain explicit.
  const rows=[];
  state.scheduleRows.forEach((source,i)=>{
    const previous=state.scheduleRows[i-1], last=rows.at(-1);
    if(source.kind==='management' && previous?.kind==='internal' && previous.date===source.date && previous.absEnd===source.absStart && previous.auditorIds.join()===source.auditorIds.join()) {
      last.time=previous.time.split('-')[0]+'-'+source.time.split('-')[1];
      last.content='审核组内部评定、与企业最高管理层沟通\n'+previous.clauses+'\n'+source.clauses;
    } else rows.push({...model.rows[i]});
  });
  model.rows=rows;
  return model;
}

function renderNsiPlan(model) {
  const {fields:f,auditors,rows,warnings}=model, e=escapeHtml, v=key=>e(f[key] || '');
  const p=(label,key)=>`<p>${label}${v(key)}</p>`;
  const purpose=NSI_TEMPLATE.purposes.map(line=>`<p>${e(line.replace(/\{\{(\w+)\}\}/g,(_,key)=>f[key] || ''))}</p>`).join('');
  const mergedCell=(i,key)=>{
    const row=rows[i],same=r=>r && r.date===row.date && r.time===row.time;
    if(same(rows[i-1])) return '';
    let count=1;while(same(rows[i+count])) count++;
    return `<td rowspan="${count}">${e(row[key])}</td>`;
  };
  return `<article class="haide-document nsi-document">
    <header class="haide-letterhead"><span class="nsi-logo">${NSI_TEMPLATE.logos.map(src=>`<img src="${src}" alt="中标联合">`).join('')}</span><span>文件编号：NSI/CX-01-04</span></header>
    <h1>审核计划</h1>
    ${warnings.length?`<aside class="haide-check"><h2>待确认事项</h2><ul>${warnings.map(w=>`<li>${e(w)}</li>`).join('')}</ul></aside>`:''}
    <h2>1.受审核方基本信息</h2>
    ${p('1.1受审核方名称：','company')}${p('1.2项目编号：','project_number')}${p('1.3工商注册地址/邮编：','registered_address')}${p('1.4实际地理地址/邮编：','address')}
    <p>1.5客户代表/职务：${v('management_representative')}　电话：${v('representative_phone')}　邮箱：${v('representative_email')}</p>
    <p>1.6联系人/职务：${v('contact_name')}　电话：${v('contact_phone')}　邮箱：${v('contact_email')}</p>
    <h2>2.审核策划</h2><h3>2.1审核目的：</h3>${purpose}
    <h3>2.2认证领域和审核类型：</h3>${p('','audit_types')}${p('特殊：','special_types')}
    <h3>2.3审核范围：</h3>${p('','scopes')}${p('','coverage')}
    <h3>2.4审核准则：</h3>${p('','criteria')}
    <p><b>2.5审核总人日/现场审核人日：</b>${v('total_person_days')}/${v('onsite_person_days')}</p>
    ${p('<b>2.6现场审核时间：</b>','dates')}${p('<b>2.7审核方式：</b>','method')}
    <h3>2.8审核组成员：</h3><table class="haide-table nsi-team"><thead><tr>${['代码','姓名（专/兼职）','组内身份','注册状态/专家职称','注册证书号/工作单位（专家/兼职审核员）','相关专业','联系电话'].map(t=>`<th>${t}</th>`).join('')}</tr></thead><tbody>${auditors.map(a=>`<tr>${['code','name','role','registration_status','registration','professional_codes','phone'].map(k=>`<td>${e(a[k])}</td>`).join('')}</tr>`).join('')}</tbody></table>
    <h3>2.9审核日程安排：</h3><p>审核日程安排由审核组长与受审核方负责人商定，具体附后。</p>
    <h2>3.其他说明</h2><p>1）首/末次会议由审核组长主持，要求受审核方管理层和相关职能过程负责人参加；</p><p>2）审核过程中请为每个审核小组配备一至两名向导，其职责主要是审核的见证、联络、向导；</p><p>3）本公司及审核组承诺保守受审核方的技术、商业、管理方面的秘密；</p><p>4）计划内容选项方法以“■”表示。</p>
    <section class="nsi-confirmation"><p>审核组长（签名）：________________　年　月　日</p><h2>4.审核管理意见：</h2><p>________________________________________________</p><p>审核方案管理（签名）：____________　年　月　日</p><h2>5.受审核方确认意见：</h2><p>同意本计划的安排，我单位可以按此计划安排工作，配合实施审核。</p><p>授权代表（签字/盖章）：____________　年　月　日</p></section>
    <h2 class="haide-schedule-title">审 核 日 程 安 排</h2><table class="haide-table haide-schedule"><thead><tr><th>日期</th><th>时间</th><th>审核内容（包括主要过程及管理活动、应用标准要求、涉及部门）</th><th>审核人员</th></tr></thead><tbody>${rows.map((r,i)=>`<tr>${mergedCell(i,'date')}${mergedCell(i,'time')}<td>${e(r.content)}</td><td>${e(r.auditors)}</td></tr>`).join('')}</tbody></table><p>${v('schedule_notes')}</p>
  </article>`;
}
