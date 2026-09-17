let noticeDraft = null;
const noticeProcesses = {management:'体系管理',admin:'行政管理',sales:'销售客服',purchase:'采购管理',operation:'生产/服务实现',quality:'质检/技术',finance:'财务管理'};

function reviewInput(key, label, value = '', type = 'text', required = false) {
  return `<label>${escapeHtml(label)}${required ? '<span class="required-mark">*</span>' : ''}<input name="${key}" type="${type}" value="${escapeHtml(value ?? '')}" ${required?'required':''} ${type==='number'?`min="0" step="${key.endsWith('person_days')?'0.01':'0.25'}"`:''}></label>`;
}

function reviewText(key, label, value = '', required = false) {
  return `<label class="review-wide">${escapeHtml(label)}${required?'<span class="required-mark">*</span>':''}<textarea name="${key}" rows="2" ${required?'required':''}>${escapeHtml(value ?? '')}</textarea></label>`;
}

function reviewSelect(key, label, options, value) {
  return `<label>${label}<select name="${key}" required>${!value?'<option value="">待确认</option>':''}${options.map(([v,t])=>`<option value="${v}" ${v===value?'selected':''}>${t}</option>`).join('')}</select></label>`;
}

function noticeDepartmentRow(dept = {}) {
  return `<div class="review-department" data-review-department>${reviewInput('dept_name','实际部门名称',dept.name,'text',true)}${reviewSelect('dept_process','承担过程',Object.entries(noticeProcesses),dept.process || 'management')}<button type="button" class="icon-button" data-remove-review-row title="移除部门过程" aria-label="移除部门过程"><i data-lucide="trash-2"></i></button></div>`;
}

function noticeAuditorRow(a = {}) {
  const codes = a.professionalCodes || {};
  return `<div class="review-auditor" data-review-auditor>
    <div class="review-grid auditor-basic">${reviewInput('auditor_code','人员代码',a.code,'text',true)}${reviewInput('auditor_name','姓名',a.name,'text',true)}${reviewSelect('auditor_role','组内身份',['组长','组员','技术专家','实习'].map(v=>[v,v]),a.role || '组员')}<button type="button" class="icon-button" data-remove-review-row title="移除人员" aria-label="移除人员"><i data-lucide="trash-2"></i></button></div>
    <div class="review-grid">${reviewInput('auditor_registration','注册证书号',a.registration)}${reviewInput('auditor_phone','联系电话',a.phone,'text',true)}${Object.entries(NOTICE_SYSTEMS).map(([s,k])=>reviewInput(`auditor_${k}`,`${k.toUpperCase()} 专业代码（无则留空）`,codes[s])).join('')}${reviewInput('auditor_employer','工作单位',a.employer)}${reviewInput('auditor_fullTime','是否专职',a.fullTime)}</div>
  </div>`;
}

function noticeTravelRow(travel = {}) {
  return `<div class="review-travel" data-review-travel>${reviewInput('travel_date','日期',travel.date,'date',true)}${reviewInput('travel_start','开始',travel.start,'time',true)}${reviewInput('travel_end','结束',travel.end,'time',true)}${reviewInput('travel_route','路线',travel.route,'text',true)}<button type="button" class="icon-button" data-remove-review-row title="移除转场" aria-label="移除转场"><i data-lucide="trash-2"></i></button></div>`;
}

function openNoticeReview(draft) {
  document.getElementById('notice-review').dataset.applied='false';
  noticeDraft = structuredClone(draft);
  const p = noticeDraft.project;
  const systems = normalizeSystemCodes(p.audit_systems).filter(s=>NOTICE_SYSTEMS[s]);
  const form = document.getElementById('notice-review-form');
  form.innerHTML = `<header class="notice-review-header"><div><h2 id="notice-review-title">通知书复核</h2><p>${escapeHtml(draft.fileName || '项目资料')}</p></div><button type="button" class="icon-button" id="notice-review-close" aria-label="关闭复核" title="关闭复核"><i data-lucide="x"></i></button></header>
    <div class="notice-review-body">
      ${draft.warnings?.length?`<aside class="notice-review-warnings"><h3>待确认事项</h3><ul>${draft.warnings.map(w=>`<li>${escapeHtml(w)}</li>`).join('')}</ul></aside>`:''}
      <section class="notice-review-section"><h3>项目资料</h3>
        <div class="review-system-options">${Object.entries(NOTICE_SYSTEMS).map(([s,k])=>`<label><input type="checkbox" name="review_system" value="${s}" ${systems.includes(s)?'checked':''}>${k.toUpperCase()} ${systemCatalog[s].name}</label>`).join('')}</div>
        <div class="review-grid">
          ${reviewInput('company_name','受审核方',p.company_name,'text',true)}
          ${reviewSelect('stage2_audit_type','审核类型',['监督审核','再认证审核','初次认证第一阶段','初次认证第二阶段','专项审核','短通审核','补充审核','转换前现场访问'].map(v=>[v,v]),p.stage2_audit_type)}
          ${reviewText('registered_address','注册地址',p.registered_address,true)}${reviewText('address','经营地址',p.address,true)}
          ${reviewInput('contact_name','联系人及职务',p.contact_name,'text',true)}${reviewInput('contact_phone','联系电话',p.contact_phone,'text',true)}
          ${reviewInput('coverage_start_date','审核覆盖起点',p.coverage_start_date,'date',true)}${reviewInput('coverage_end_date','审核覆盖截止日（空白为末日）',p.coverage_end_date,'date')}
          ${reviewInput('audit_method','审核方式',p.audit_method,'text',true)}${reviewInput('industry_code','项目专业代码',p.industry_code,'text',true)}
          ${reviewText('changes','变更事项',p.changes,true)}
        </div>
        <details class="review-details"><summary>其他项目资料</summary><div class="review-grid">${reviewInput('management_representative','管理者代表',p.management_representative)}${reviewInput('representative_phone','管理者代表电话',p.representative_phone)}${reviewInput('contact_email','联系人邮箱',p.contact_email)}${reviewInput('audit_type_detail','各体系审核类型',p.audit_type_detail)}${reviewText('site_arrangements','多场所安排',p.site_arrangements)}${reviewText('outsource_details','外包现场安排',p.outsource_details)}${reviewSelect('outsource_visit','赴外包方现场',[['否','否'],['是','是']],p.outsource_visit || '否')}${reviewText('schedule_notes','日程补充说明',p.schedule_notes)}</div></details>
        ${Object.entries(NOTICE_SYSTEMS).map(([s,k])=>`<div class="review-system-fields" data-review-system="${s}" ${systems.includes(s)?'':'hidden'}><h4>${k.toUpperCase()} 体系</h4><div class="review-grid">${reviewInput(`contract_${k}`,'合同编号',p[`contract_${k}`],'text',true)}${reviewInput(`criteria_${k}`,'标准及版本',p[`criteria_${k}`],'text',true)}${reviewInput(`scope_${k}`,'本体系专业代码',p[`scope_${k}`] || p.industry_code,'text',true)}${reviewText(`scope_text_${k}`,'正式认证范围',p[`scope_text_${k}`],true)}</div></div>`).join('')}
      </section>
      <section class="notice-review-section"><div class="review-section-heading"><h3>审核组</h3><button type="button" class="btn" id="review-add-auditor"><i data-lucide="user-plus"></i>添加人员</button></div><div id="review-auditors">${draft.auditors.map(noticeAuditorRow).join('')}</div></section>
      <section class="notice-review-section"><div class="review-section-heading"><h3>部门与承担过程</h3><button type="button" class="btn" id="review-add-department"><i data-lucide="plus"></i>添加部门过程</button></div><div id="review-departments">${draft.departments.map(noticeDepartmentRow).join('')}</div></section>
      <section class="notice-review-section"><h3>时间安排</h3><div class="review-grid">
        ${reviewInput('stage2_start_date','开始日期',p.stage2_start_date,'date',true)}${reviewInput('stage2_start_time','首日开始',p.stage2_start_time,'time',true)}
        ${reviewInput('stage2_end_date','结束日期',p.stage2_end_date,'date',true)}${reviewInput('stage2_end_time','末日结束',p.stage2_end_time,'time',true)}
        ${reviewInput('stage2_person_days','批准总审核人日',p.stage2_person_days,'number',true)}${reviewInput('lunch_start','午休开始',p.lunch_start || '12:00','time',true)}${reviewInput('lunch_hours','午休时长（小时）',p.lunch_hours ?? 1,'number',true)}
        ${reviewInput('shift_audit_hours','倒班审核时长（小时）',p.shift_audit_hours || 0,'number')}${reviewInput('shift_date','倒班审核日期',p.shift_date,'date')}${reviewInput('shift_start','倒班开始时间',p.shift_start,'time')}
      </div><div class="review-section-heading"><h4>全组场所间转场（不计审核人日）</h4><button type="button" class="btn" id="review-add-travel"><i data-lucide="plus"></i>添加转场</button></div><div id="review-travels">${(p.travel_intervals || []).map(noticeTravelRow).join('')}</div></section>
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
  form.querySelector('#review-add-department').onclick = () => { document.getElementById('review-departments').insertAdjacentHTML('beforeend',noticeDepartmentRow()); lucide.createIcons(); document.querySelector('#review-departments > :last-child input').focus(); };
  form.querySelector('#review-add-auditor').onclick = () => { document.getElementById('review-auditors').insertAdjacentHTML('beforeend',noticeAuditorRow()); lucide.createIcons(); };
  form.querySelector('#review-add-travel').onclick = () => { document.getElementById('review-travels').insertAdjacentHTML('beforeend',noticeTravelRow()); lucide.createIcons(); };
  form.querySelector('#notice-review-close').onclick = form.querySelector('#notice-review-cancel').onclick = () => document.getElementById('notice-review').close();
  form.onclick = event => event.target.closest('[data-remove-review-row]')?.parentElement.remove();
  form.onsubmit = confirmNoticeReview;
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
    if (systems.includes('EMS')) {
      if (!/14001\s*[:：-]?\s*(2015|2026)|24001-2016/.test(project.criteria_e)) throw new Error('请明确环境标准版本：ISO 14001:2015 或 ISO 14001:2026。');
      project.ems_version = /14001\s*[:：-]?\s*2026/.test(project.criteria_e) ? '2026' : '2015';
    }
    const departments = [...form.querySelectorAll('[data-review-department]')].map((row,i)=>({id:`notice_dept_${i+1}`,name:value(row,'dept_name'),process:value(row,'dept_process'),clauseIds:[],auditorIds:[]}));
    if (!departments.length) throw new Error('请补充实际部门及承担过程。通知书没有部门信息，不能沿用演示部门。');
    const auditors = [...form.querySelectorAll('[data-review-auditor]')].map(row=>{
      const code = value(row,'auditor_code').toUpperCase(), role = value(row,'auditor_role');
      const professionalCodes = Object.fromEntries(systems.map(s=>[s,value(row,`auditor_${NOTICE_SYSTEMS[s]}`)]));
      if (!/^[A-Z]$/.test(code)) throw new Error('人员代码请使用单个英文字母，如 A、B。');
      if (!['技术专家','实习'].includes(role) && !value(row,'auditor_registration')) throw new Error('请补充审核员注册证书号。');
      return {id:code,code,name:value(row,'auditor_name'),role,registration:value(row,'auditor_registration'),phone:value(row,'auditor_phone'),employer:value(row,'auditor_employer'),fullTime:value(row,'auditor_fullTime'),professionalCodes,independent:!['技术专家','实习'].includes(role)};
    });
    if (!auditors.length || !auditors.some(a=>a.role==='组长')) throw new Error('请填写审核组并指定组长。');
    if (new Set(auditors.map(a=>a.code)).size!==auditors.length) throw new Error('人员代码不能重复。');
    const days = (Date.parse(project.stage2_end_date)-Date.parse(project.stage2_start_date))/86400000+1;
    if (!Number.isInteger(days) || days<1 || days>60) throw new Error('审核起止日期无效，最多支持 60 个日历日。');
    if (days===1 && project.stage2_end_time<=project.stage2_start_time) throw new Error('审核结束时间必须晚于开始时间。');
    if (!(Number(project.stage2_person_days)>0)) throw new Error('批准审核人日必须大于零。');
    const lunch = Number(project.lunch_hours);
    if (lunch<0 || lunch>3 || parseTime(project.lunch_start)+lunch*60>1020) throw new Error('午休须在当日工作时段内，时长为 0–3 小时。');
    const shift = Number(project.shift_audit_hours || 0);
    if (project.shift_required && shift<1) throw new Error('通知书要求倒班审核，请补充至少 1 小时的安排。');
    if (shift && (shift<1 || shift>8 || !project.shift_date || !project.shift_start || project.shift_start<'17:00' || parseTime(project.shift_start)+shift*60>1440 || project.shift_date<project.stage2_start_date || project.shift_date>project.stage2_end_date)) throw new Error('请确认倒班日期及当日 17:00 后的时段，不少于 1 小时且不跨午夜。');
    project.travel_intervals = [...form.querySelectorAll('[data-review-travel]')].map(row=>({date:value(row,'travel_date'),start:value(row,'travel_start'),end:value(row,'travel_end'),route:value(row,'travel_route')}));
    for (const t of project.travel_intervals) {
      if (t.end<=t.start || t.date<project.stage2_start_date || t.date>project.stage2_end_date) throw new Error('转场必须有有效起止时刻，并位于审核日期范围内。');
      if ((t.date===project.stage2_start_date && t.start<project.stage2_start_time) || (t.date===project.stage2_end_date && t.end>project.stage2_end_time)) throw new Error('场所间转场须位于审核起止范围内；审核前后往返交通请记入补充说明。');
      if (lunch && parseTime(t.start)<parseTime(project.lunch_start)+lunch*60 && parseTime(t.end)>parseTime(project.lunch_start)) throw new Error('转场与午休重叠，请调整具体时段。');
    }
    const phase = project.stage2_audit_type==='初次认证第一阶段' ? 'stage1' : 'stage2';
    if (phase==='stage1') for (const key of ['start_date','end_date','start_time','end_time','person_days','audit_type']) project[`stage1_${key}`]=project[`stage2_${key}`];
    const plan = {project,departments,auditors,mappings:[],sourceType:'task_notice'};
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
