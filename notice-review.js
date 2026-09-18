let noticeDraft = null;
const noticeProcesses = {management:'体系管理',admin:'行政管理',sales:'销售客服',purchase:'采购管理',operation:'生产/服务实现',quality:'质检/技术',finance:'财务管理'};
const noticeDepartmentDefaults = {sales:'市场部',operation:'生产部',purchase:'市场部',quality:'技术部',admin:'综合部',finance:'财务部',management:'管理层'};

function reviewInput(key, label, value = '', type = 'text', required = false) {
  return `<label>${escapeHtml(label)}${required ? '<span class="required-mark">*</span>' : ''}<input name="${key}" type="${type}" value="${escapeHtml(value ?? '')}" ${required?'required':''} ${type==='number'?`min="0" step="${key.endsWith('person_days')?'0.01':key==='lunch_hours'?'any':'0.25'}"`:''}></label>`;
}

function reviewText(key, label, value = '', required = false) {
  return `<label class="review-wide">${escapeHtml(label)}${required?'<span class="required-mark">*</span>':''}<textarea name="${key}" rows="2" ${required?'required':''}>${escapeHtml(value ?? '')}</textarea></label>`;
}

function reviewTimeInput(key, label, value, type, required = false) {
  const info=noticeDraft.project.notice_time;
  const source=info?.sources?.[key] || (/^shift_/.test(key) ? 'suggested' : value!=='' && value!=null ? 'notice' : '');
  const suffix=info?.confirmed ? '已确认' : {notice:'通知书',suggested:'建议',manual:'已调整'}[source];
  return reviewInput(key,label+(suffix ? '（'+suffix+'）' : ''),value,type,required).replace('<label>','<label data-time-field="'+key+'" data-time-label="'+label+'">');
}

function noticeReviewTimeValues(form) {
  const p={...noticeDraft.project};
  for (const key of ['stage2_start_date','stage2_end_date','stage2_start_time','stage2_end_time','lunch_start','lunch_hours','shift_date','shift_start','shift_audit_hours']) p[key]=form.elements.namedItem(key).value;
  p.travel_intervals=noticeTravelValues(form);
  return p;
}

function updateNoticeShift(form, suggest = false) {
  const enabled=form.elements.namedItem('review_shift_enabled').checked;
  const fields=form.querySelector('#review-shift-fields');
  fields.hidden=!enabled;
  fields.querySelectorAll('input').forEach(el=>{el.disabled=!enabled;el.required=enabled;});
  if (enabled && suggest) {
    const p=noticeReviewTimeValues(form), suggestion=noticeShiftSuggestion(p);
    for (const key of ['shift_date','shift_start','shift_audit_hours']) {
      const input=form.elements.namedItem(key);
      if (!input.value || Number(input.value)===0) input.value=suggestion[key] || (key==='shift_audit_hours' ? 1 : '');
    }
  }
  form.querySelector('#review-shift-status').textContent=enabled ? (form.elements.namedItem('shift_start').value ? '待确认企业实际班次' : '当前时段无法自动安排倒班，请确认企业班次及审核窗口') : '';
}

function reviewSelect(key, label, options, value) {
  return `<label>${label}<select name="${key}" required>${!value?'<option value="">待确认</option>':''}${options.map(([v,t])=>`<option value="${v}" ${v===value?'selected':''}>${t}</option>`).join('')}</select></label>`;
}

function noticeDepartmentRow(dept = {}) {
  const process = dept.process || 'management';
  const name = dept.name ?? noticeDepartmentDefaults[process] ?? '';
  return `<div class="review-department" data-review-department data-previous-process="${escapeHtml(process)}"><input type="checkbox" name="dept_enabled" ${dept.enabled===false?'':'checked'} aria-label="启用部门过程" title="启用部门过程">${reviewSelect('dept_process','承担过程',Object.entries(noticeProcesses),process)}${reviewInput('dept_name','部门名称',name,'text',true)}<button type="button" class="icon-button" data-remove-review-row title="移除部门过程" aria-label="移除部门过程"><i data-lucide="trash-2"></i></button></div>`;
}

function updateNoticeDepartmentRow(row) {
  const enabled = row.querySelector('[name="dept_enabled"]').checked;
  row.querySelector('[name="dept_name"]').disabled = !enabled;
  row.querySelector('[name="dept_process"]').disabled = !enabled;
  row.classList.toggle('is-disabled',!enabled);
}

function noticeAuditorRow(a = {}) {
  const codes = a.professionalCodes || {};
  const roles=['组长','组员','技术专家','实习'].map(v=>[v,v]);
  if (a.systemRoles) roles.unshift(['system_roles',noticeAuditorRoleLabel(a)]);
  return `<div class="review-auditor" data-review-auditor data-system-roles="${escapeHtml(JSON.stringify(a.systemRoles || {}))}">
    <div class="review-grid auditor-basic">${reviewInput('auditor_code','人员代码',a.code,'text',true)}${reviewInput('auditor_name','姓名',a.name,'text',true)}${reviewSelect('auditor_role','组内身份',roles,a.systemRoles ? 'system_roles' : a.role || '组员')}<button type="button" class="icon-button" data-remove-review-row title="移除人员" aria-label="移除人员"><i data-lucide="trash-2"></i></button></div>
    <div class="review-grid">${reviewInput('auditor_registration','注册证书号',a.registration)}${reviewInput('auditor_phone','联系电话',a.phone,'text',true)}${Object.entries(NOTICE_SYSTEMS).map(([s,k])=>reviewInput(`auditor_${k}`,`${k.toUpperCase()} 专业代码（无则留空）`,codes[s])).join('')}${reviewInput('auditor_employer','工作单位',a.employer)}${reviewInput('auditor_fullTime','是否专职',a.fullTime)}${noticeDraft?.project.agency_id==='nsi' ? reviewInput('auditor_registrationStatus','注册状态/专家职称',a.registrationStatus,'text',true)+reviewInput('auditor_additionalDuty','附加职责',a.additionalDuty) : ''}</div>
  </div>`;
}

function openNoticeReview(draft) {
  document.getElementById('notice-review').dataset.applied='false';
  noticeDraft = structuredClone(draft);
  const p = noticeDraft.project;
  const nsi=p.agency_id==='nsi';
  const systems = normalizeSystemCodes(p.audit_systems).filter(s=>NOTICE_SYSTEMS[s]);
  const existingDepartments = draft.departmentSettings || draft.departments || [];
  const useDefaultDepartments = existingDepartments.length===0;
  const departments = useDefaultDepartments ? Object.entries(noticeDepartmentDefaults).map(([process,name])=>({process,name})) : existingDepartments;
  const form = document.getElementById('notice-review-form');
  form.innerHTML = `<header class="notice-review-header"><div><h2 id="notice-review-title">通知书复核</h2><p>${escapeHtml(draft.fileName || '项目资料')}</p></div><button type="button" class="icon-button" id="notice-review-close" aria-label="关闭复核" title="关闭复核"><i data-lucide="x"></i></button></header>
    <div class="notice-review-body">
      ${noticeAgencySection(p)}
      ${draft.warnings?.length?`<aside class="notice-review-warnings"><h3>待确认事项</h3><ul>${draft.warnings.map(w=>`<li>${escapeHtml(w)}</li>`).join('')}</ul></aside>`:''}
      <section class="notice-review-section"><h3>项目资料</h3>
        <div class="review-system-options">${Object.entries(NOTICE_SYSTEMS).map(([s,k])=>`<label><input type="checkbox" name="review_system" value="${s}" ${systems.includes(s)?'checked':''}>${k.toUpperCase()} ${systemCatalog[s].name}</label>`).join('')}</div>
        <div class="review-grid">
          ${reviewInput('company_name','受审核方',p.company_name,'text',true)}
          ${nsi ? reviewInput('project_number','项目编号',p.project_number,'text',true) : ''}
          ${reviewSelect('stage2_audit_type','审核类型',['监督审核','再认证审核','初次认证第一阶段','初次认证第二阶段','专项审核','短通审核','补充审核','转换前现场访问'].map(v=>[v,v]),p.stage2_audit_type)}
          ${reviewText('registered_address','注册地址',p.registered_address,true)}${reviewText('address','经营地址',p.address,true)}
          ${reviewInput('contact_name','联系人及职务',p.contact_name,'text',true)}${reviewInput('contact_phone','联系电话',p.contact_phone,'text',true)}
          ${reviewInput('coverage_start_date','审核覆盖起点',p.coverage_start_date,'date',true)}${reviewInput('coverage_end_date','审核覆盖截止日（空白为末日）',p.coverage_end_date,'date')}
          ${reviewInput('audit_method','审核方式',p.audit_method,'text',true)}${reviewInput('industry_code','项目专业代码',p.industry_code,'text',true)}
          ${reviewText('changes','变更事项',p.changes,!nsi)}
          ${nsi ? reviewInput('representative_email','客户代表邮箱',p.representative_email)+reviewText('special_types','特殊审核类型',p.special_types || '□暂停恢复；□认证范围扩大；□转换机构；□转换标准')+reviewText('other_purpose','其他审核目的（适用时）',p.other_purpose)+reviewText('planning_notes','通知书项目提示',p.planning_notes) : ''}
        </div>
        <details class="review-details"><summary>其他项目资料</summary><div class="review-grid">${reviewInput('management_representative','管理者代表',p.management_representative)}${reviewInput('representative_phone','管理者代表电话',p.representative_phone)}${reviewInput('contact_email','联系人邮箱',p.contact_email)}${reviewInput('audit_type_detail','各体系审核类型',p.audit_type_detail)}${reviewText('site_arrangements','多场所安排',p.site_arrangements)}${reviewText('outsource_details','外包现场安排',p.outsource_details)}${reviewSelect('outsource_visit','赴外包方现场',[['否','否'],['是','是']],p.outsource_visit || '否')}${reviewText('schedule_notes','日程补充说明',p.schedule_notes)}</div></details>
        ${Object.entries(NOTICE_SYSTEMS).map(([s,k])=>`<div class="review-system-fields" data-review-system="${s}" ${systems.includes(s)?'':'hidden'}><h4>${k.toUpperCase()} 体系</h4><div class="review-grid">${nsi ? '' : reviewInput(`contract_${k}`,'合同编号',p[`contract_${k}`],'text',true)}${reviewInput(`criteria_${k}`,'标准及版本',p[`criteria_${k}`],'text',true)}${reviewInput(`scope_${k}`,'本体系专业代码',p[`scope_${k}`] || p.industry_code,'text',true)}${reviewText(`scope_text_${k}`,'正式认证范围',p[`scope_text_${k}`],true)}</div></div>`).join('')}
      </section>
      <section class="notice-review-section"><div class="review-section-heading"><h3>审核组</h3><button type="button" class="btn" id="review-add-auditor"><i data-lucide="user-plus"></i>添加人员</button></div><div id="review-auditors">${draft.auditors.map(noticeAuditorRow).join('')}</div></section>
      <section class="notice-review-section" id="notice-department-settings"><div class="review-section-heading"><h3>部门名称${useDefaultDepartments?'<span class="department-default-status">默认建议 · 待确认</span>':''}</h3><button type="button" class="btn" id="review-add-department"><i data-lucide="plus"></i>添加部门过程</button></div><div id="review-departments">${departments.map(noticeDepartmentRow).join('')}</div></section>
      <section class="notice-review-section" id="notice-time-settings"><h3>时间安排</h3><div class="review-grid">
        ${reviewTimeInput('stage2_start_date','开始日期',p.stage2_start_date,'date',true)}${reviewTimeInput('stage2_start_time','首日开始',p.stage2_start_time,'time',true)}
        ${reviewTimeInput('stage2_end_date','结束日期',p.stage2_end_date,'date',true)}${reviewTimeInput('stage2_end_time','末日结束',p.stage2_end_time,'time',true)}
        ${nsi ? reviewInput('total_person_days','批准审核总人日',p.total_person_days,'number',true) : ''}${reviewTimeInput('stage2_person_days',nsi?'批准现场审核人日':'批准总审核人日',p.stage2_person_days,'number',true)}${reviewTimeInput('lunch_start','午休开始',p.lunch_start || '12:00','time',true)}${reviewTimeInput('lunch_hours','午休时长（小时）',p.lunch_hours ?? 1,'number',true)}
      </div>${p.notice_time?.notes?.length && !p.notice_time.confirmed ? `<ul class="review-time-notes">${p.notice_time.notes.map(note=>`<li>${escapeHtml(note)}</li>`).join('')}</ul>` : ''}
      <div class="review-shift-heading"><label><input type="checkbox" name="review_shift_enabled" ${p.shift_required || Number(p.shift_audit_hours)>0 ? 'checked' : ''} ${p.shift_required ? 'disabled' : ''}>倒班审核${p.shift_required ? '（通知书要求）' : ''}</label><span id="review-shift-status"></span></div>
      <div class="review-grid" id="review-shift-fields">${reviewTimeInput('shift_audit_hours','倒班时长（小时）',p.shift_audit_hours || 1,'number',true)}${reviewTimeInput('shift_date','倒班日期',p.shift_date,'date',true)}${reviewTimeInput('shift_start','倒班开始',p.shift_start,'time',true)}</div>
      <div class="review-section-heading"><h4>多场所及转场安排</h4><div class="review-travel-actions"><button type="button" class="btn" id="review-add-visit"><i data-lucide="map-pin"></i>添加场所审核</button><button type="button" class="btn" id="review-add-travel"><i data-lucide="route"></i>添加转场</button></div></div><p id="review-travel-status" class="review-time-status" hidden></p><div id="review-travels">${(p.travel_intervals || []).map(noticeTravelRow).join('')}</div></section>
      ${draft.rawText?`<details class="review-details"><summary>通知书原文</summary><pre class="notice-source-text">${escapeHtml(draft.rawText)}</pre></details>`:''}
      <label class="review-confirmation"><input type="checkbox" id="notice-reviewed" required>已核对资料、部门职责、专业能力、建议时间及待确认事项</label>
      <p id="notice-review-error" class="notice-review-error" role="alert"></p>
    </div><footer class="notice-review-footer"><button type="button" class="btn" id="notice-review-cancel">取消</button><button type="submit" class="btn btn-primary"><i data-lucide="calendar-check"></i>确认并重排</button></footer>`;
  const toggleSystems = () => form.querySelectorAll('[data-review-system]').forEach(section => {
    const selected = form.querySelector(`[name="review_system"][value="${section.dataset.reviewSystem}"]`).checked;
    section.hidden = !selected;
    section.querySelectorAll('input,textarea').forEach(el=>{el.disabled=!selected;});
  });
  form.querySelectorAll('[name="review_system"]').forEach(el=>el.addEventListener('change',toggleSystems));
  toggleSystems();
  form.querySelector('#review-add-department').onclick = () => { document.getElementById('review-departments').insertAdjacentHTML('beforeend',noticeDepartmentRow()); refreshTravelChoices(form);lucide.createIcons(); document.querySelector('#review-departments > :last-child [name="dept_name"]').focus(); };
  form.querySelector('#review-add-auditor').onclick = () => { document.getElementById('review-auditors').insertAdjacentHTML('beforeend',noticeAuditorRow()); refreshTravelChoices(form);lucide.createIcons(); };
  form.querySelector('#review-add-travel').onclick = () => addNoticeTravel(form,'transfer');
  form.querySelector('#review-add-visit').onclick = () => addNoticeTravel(form,'site_visit');
  refreshTravelChoices(form);
  form.querySelector('#notice-review-close').onclick = form.querySelector('#notice-review-cancel').onclick = () => document.getElementById('notice-review').close();
  form.onclick = event => {
    const button=event.target.closest('[data-remove-review-row]');
    if (!button) return;
    button.closest('[data-review-travel],[data-review-auditor],[data-review-department]')?.remove();
    refreshTravelChoices(form);
  };
  form.querySelectorAll('[data-review-department]').forEach(updateNoticeDepartmentRow);
  updateNoticeShift(form);
  form.onchange = event => {
    if (/^(auditor_|dept_)/.test(event.target.name)) refreshTravelChoices(form);
    if (event.target.name==='review_shift_enabled') updateNoticeShift(form,true);
    const timeLabel=event.target.closest('[data-time-field]');
    if (timeLabel) {
      noticeDraft.project.notice_time ||= {sources:{},notes:[]};
      noticeDraft.project.notice_time.sources[timeLabel.dataset.timeField]='manual';
      timeLabel.firstChild.textContent=timeLabel.dataset.timeLabel+'（已调整）';
    }
    const row = event.target.closest('[data-review-department]');
    if (!row) return;
    if (event.target.name==='dept_enabled') updateNoticeDepartmentRow(row);
    if (event.target.name==='dept_process') {
      const name = row.querySelector('[name="dept_name"]');
      if (!name.value.trim() || name.value===noticeDepartmentDefaults[row.dataset.previousProcess]) name.value=noticeDepartmentDefaults[event.target.value] || '';
      row.dataset.previousProcess=event.target.value;
      refreshTravelChoices(form);
    }
  };
  form.onsubmit = confirmNoticeReview;
  setupNoticeAgency(form);
  lucide.createIcons();
  document.getElementById('notice-review').showModal();
}

function confirmNoticeReview(event) {
  event.preventDefault();
  const form = event.currentTarget, project = {...noticeDraft.project};
  const error = document.getElementById('notice-review-error');
  const value = (row,key) => row.querySelector(`[name="${key}"]`)?.value.trim() || '';
  try {
    const systems = [...form.querySelectorAll('[name="review_system"]:checked')].map(el=>el.value);
    if (!systems.length) throw new Error('请至少选择一个审核体系。');
    const data = new FormData(form);
    for (const [key,v] of data) if (!/^(auditor_|dept_|travel_|review_)/.test(key)) project[key]=String(v).trim();
    project.audit_systems = systems.join(',');
    const agency=AGENCY_PROFILES[project.agency_id];
    if(!agency) throw new Error('请选择已配置的认证机构。');
    if(systems.some(s=>!agency.systems.includes(s))) throw new Error(`${agency.shortName}当前仅接入 ${agency.systems.join('/')} 模板，其他体系暂不能输出。`);
    project.template_version=agency.version;
    if (systems.includes('EMS')) {
      if (!/14001\s*[:：-]?\s*(2015|2026)|24001-2016/.test(project.criteria_e)) throw new Error('请明确环境标准版本：ISO 14001:2015 或 ISO 14001:2026。');
      project.ems_version = /14001\s*[:：-]?\s*2026/.test(project.criteria_e) ? '2026' : '2015';
    }
    const departmentSettings = [...form.querySelectorAll('[data-review-department]')].map(row=>({name:value(row,'dept_name'),process:value(row,'dept_process'),enabled:row.querySelector('[name="dept_enabled"]').checked}));
    const departments = departmentSettings.filter(dept=>dept.enabled).map((dept,i)=>({id:`notice_dept_${i+1}`,name:dept.name,process:dept.process,clauseIds:[],auditorIds:[]}));
    if (!departments.length) throw new Error('请补充实际部门及承担过程。通知书没有部门信息，不能沿用演示部门。');
    if (departments.some(dept=>!dept.name)) throw new Error('请填写已启用过程的实际部门名称。');
    const auditors = [...form.querySelectorAll('[data-review-auditor]')].map(row=>{
      const code = value(row,'auditor_code').toUpperCase();
      const selectedRole=value(row,'auditor_role');
      const systemRoles=selectedRole==='system_roles' ? JSON.parse(row.dataset.systemRoles) : null;
      const role=systemRoles ? noticeAuditorRoles(noticeAuditorRoleLabel({systemRoles})).role : selectedRole;
      const professionalCodes = Object.fromEntries(systems.map(s=>[s,value(row,`auditor_${NOTICE_SYSTEMS[s]}`)]));
      if (!/^[A-Z]$/.test(code)) throw new Error('人员代码请使用单个英文字母，如 A、B。');
      if (!['技术专家','实习'].includes(role) && !value(row,'auditor_registration')) throw new Error('请补充审核员注册证书号。');
      return {id:code,code,name:value(row,'auditor_name'),role,...(systemRoles ? {systemRoles} : {}),registration:value(row,'auditor_registration'),phone:value(row,'auditor_phone'),employer:value(row,'auditor_employer'),fullTime:value(row,'auditor_fullTime'),professionalCodes,independent:!['技术专家','实习'].includes(role),...(project.agency_id==='nsi' ? {registrationStatus:value(row,'auditor_registrationStatus'),additionalDuty:value(row,'auditor_additionalDuty')} : {})};
    });
    if (!auditors.length || !auditors.some(a=>a.role==='组长')) throw new Error('请填写审核组并指定组长。');
    if (new Set(auditors.map(a=>a.code)).size!==auditors.length) throw new Error('人员代码不能重复。');
    const days = (Date.parse(project.stage2_end_date)-Date.parse(project.stage2_start_date))/86400000+1;
    if (!Number.isInteger(days) || days<1 || days>60) throw new Error('审核起止日期无效，最多支持 60 个日历日。');
    if (days===1 && project.stage2_end_time<=project.stage2_start_time) throw new Error('审核结束时间必须晚于开始时间。');
    if (!(Number(project.stage2_person_days)>0)) throw new Error('批准审核人日必须大于零。');
    if(project.agency_id==='nsi' && !(Number(project.total_person_days)>=Number(project.stage2_person_days))) throw new Error('审核总人日不能小于现场审核人日。');
    const lunch = Number(project.lunch_hours);
    if (lunch<0 || lunch>3 || parseTime(project.lunch_start)+lunch*60>1020) throw new Error('午休须在当日工作时段内，时长为 0–3 小时。');
    if (!form.elements.namedItem('review_shift_enabled').checked) {
      project.shift_audit_hours=0;project.shift_date='';project.shift_start='';
    }
    const shift = Number(project.shift_audit_hours || 0);
    if (project.shift_required && shift<1) throw new Error('通知书要求倒班审核，请补充至少 1 小时的安排。');
    if (shift && (shift<1 || shift>8 || !project.shift_date || !project.shift_start || project.shift_start<'17:00' || parseTime(project.shift_start)+shift*60>1440 || project.shift_date<project.stage2_start_date || project.shift_date>project.stage2_end_date)) throw new Error('请确认倒班日期及当日 17:00 后的时段，不少于 1 小时且不跨午夜。');
    project.travel_intervals = readNoticeTravels(form,project,auditors,departments);
    const phase = project.stage2_audit_type==='初次认证第一阶段' ? 'stage1' : 'stage2';
    if (phase==='stage1') for (const key of ['start_date','end_date','start_time','end_time','person_days','audit_type']) project[`stage1_${key}`]=project[`stage2_${key}`];
    if (project.notice_time) project.notice_time={...project.notice_time,confirmed:true};
    const plan = {project,departments,departmentSettings,auditors,mappings:[],sourceType:'task_notice'};
    const backup = {state:structuredClone(state),presets:structuredClone(phasePresets),fields:Object.fromEntries(['company','scope','ems-version',...phaseFieldIds].map(id=>[id,document.getElementById(id).value]))};
    try {
      state.activePhase=phase;
      applyImportedPlan(plan);
      state.importedFileName=noticeDraft.fileName;
      state.noticeSource={fileName:noticeDraft.fileName,rawText:noticeDraft.rawText,warnings:noticeDraft.warnings,addressConflict:noticeDraft.addressConflict};
      state.importFindings=[`已复核通知书：${state.systems.map(s=>systemCatalog[s].code).join('/')} 体系，${state.auditors.length} 人，${state.departments.length} 个部门。`,...(state.importedPlan.notes || [])];
      if (phase==='stage2' && !project.stage1_start_date) state.importFindings.push('通知书未安排一阶段；一阶段为待确认草案，不得作为正式计划。');
      document.getElementById('notice-review').dataset.applied='true';
      document.getElementById('notice-review').close();
      setImportStatus('已复核通知书','success');
      render(); generateSchedule();
    } catch(e) {
      Object.assign(state,backup.state); Object.assign(phasePresets,backup.presets);
      clauseLibrary=buildQesLibrary(qmsClauseLibrary,state.emsVersion);
      Object.entries(backup.fields).forEach(([id,v])=>{document.getElementById(id).value=v;});
      render();generateSchedule();throw e;
    }
  } catch(e) { error.textContent=e.message; error.scrollIntoView({block:'nearest'}); }
}

function reopenNoticeReview() {
  if (!state.noticeSource || !state.rawImportedPlan) return;
  const draft = {...structuredClone(state.rawImportedPlan),...structuredClone(state.noticeSource)};
  const fields = {'company':'company_name','start-date':'stage2_start_date','audit-start-time':'stage2_start_time','audit-end-time':'stage2_end_time','person-days':'stage2_person_days','lunch-start':'lunch_start','lunch-hours':'lunch_hours','shift-hours':'shift_audit_hours','shift-date':'shift_date','shift-start':'shift_start'};
  if (state.activePhase==='stage2') {
    for (const [id,key] of Object.entries(fields)) draft.project[key]=document.getElementById(id).value;
    draft.project.stage2_end_date=addDays(draft.project.stage2_start_date,scheduleWindow().days-1);
    draft.project.travel_intervals=structuredClone(state.travelIntervals || []);
  }
  draft.auditors=structuredClone(state.auditors);
  openNoticeReview(draft);
}
