function noticeTravelRow(travel = {}) {
  const visit=travel.kind==='site_visit';
  const selected=travel.auditorIds ?? noticeDraft.auditors.map(a=>a.id || a.code);
  return `<div class="review-travel" data-review-travel data-travel-kind="${visit ? 'site_visit' : 'transfer'}" data-travel-id="${escapeHtml(travel.id || crypto.randomUUID())}">
    <div class="review-section-heading"><h4>${visit ? '场所审核' : '单程转场'}</h4><button type="button" class="icon-button" data-remove-review-row title="移除安排" aria-label="移除安排"><i data-lucide="trash-2"></i></button></div>
    <div class="review-grid">${reviewInput('travel_date',visit ? '去程日期' : '日期',travel.date,'date',true)}${reviewInput('travel_route',visit ? '审核场所名称 / 地址' : '路线',travel.route,'text',true)}${reviewInput('travel_start',visit ? '去程出发' : '开始',travel.start,'time',true)}${reviewInput('travel_end',visit ? '去程到达' : '结束',travel.end,'time',true)}${visit ? reviewInput('travel_returnDate','返程日期',travel.returnDate || travel.date,'date',true)+reviewInput('travel_returnStart','返程出发',travel.returnStart,'time',true)+reviewInput('travel_returnEnd','返程到达',travel.returnEnd,'time',true) : ''}</div>
    <fieldset class="travel-options"><legend>审核人员<span class="required-mark">*</span></legend><div data-travel-auditors data-selected="${escapeHtml(JSON.stringify(selected))}"></div></fieldset>
    ${visit ? `<fieldset class="travel-options"><legend>该场所审核部门<span class="required-mark">*</span></legend><div data-travel-departments data-selected="${escapeHtml(JSON.stringify(travel.departments || []))}"></div></fieldset>` : ''}
  </div>`;
}

function refreshTravelChoices(form) {
  const people=[...form.querySelectorAll('[data-review-auditor]')].map(row=>({value:row.querySelector('[name=auditor_code]').value.trim().toUpperCase(),label:row.querySelector('[name=auditor_name]').value.trim()})).filter(a=>a.value);
  const names=[...new Set([...form.querySelectorAll('[data-review-department]')].filter(row=>row.querySelector('[name=dept_enabled]').checked).map(row=>row.querySelector('[name=dept_name]').value.trim()).filter(Boolean))];
  function update(selector,options,name) {
    form.querySelectorAll(selector).forEach(box=>{
      const selected=box.dataset.ready ? [...box.querySelectorAll('input:checked')].map(input=>input.value) : JSON.parse(box.dataset.selected || '[]');
      const choices=[...options,...selected.filter(value=>!options.some(option=>option.value===value)).map(value=>({value,label:'已移除：'+value}))];
      box.innerHTML=choices.map(option=>`<label><input type="checkbox" name="${name}" value="${escapeHtml(option.value)}" ${selected.includes(option.value) ? 'checked' : ''}>${escapeHtml(option.label)}</label>`).join('');
      box.dataset.ready='true';
    });
  }
  update('[data-travel-auditors]',people.map(a=>({...a,label:a.value+' '+a.label})),'travel_auditor');
  update('[data-travel-departments]',names.map(value=>({value,label:value})),'travel_department');
}

function noticeTravelValues(form) {
  return [...form.querySelectorAll('[data-review-travel]')].map(row=>{
    const fields=Object.fromEntries(['date','start','end','route','returnDate','returnStart','returnEnd'].map(key=>[key,row.querySelector('[name="travel_'+key+'"]')?.value.trim() || '']));
    return {...fields,id:row.dataset.travelId,kind:row.dataset.travelKind,auditorIds:[...row.querySelectorAll('[name=travel_auditor]:checked')].map(el=>el.value),departments:[...row.querySelectorAll('[name=travel_department]:checked')].map(el=>el.value)};
  });
}

function readNoticeTravels(form, project, auditors, departments) {
  const travels=noticeTravelValues(form);
  const warnings=validateTravelIntervals(travels,{startDate:project.stage2_start_date,endDate:project.stage2_end_date,startTime:project.stage2_start_time,endTime:project.stage2_end_time,lunchStart:project.lunch_start,lunchHours:project.lunch_hours,auditorIds:auditors.map(a=>a.id),departmentNames:departments.map(d=>d.name)});
  if (warnings.length) throw new Error(warnings.join('\n'));
  return travels;
}

function addNoticeTravel(form, kind) {
  const p=noticeReviewTimeValues(form),suggestion=noticeTravelSuggestion(p);
  suggestion.kind=kind;suggestion.auditorIds=[];
  if (kind==='site_visit') {
    const end=suggestion.date===p.stage2_end_date ? parseTime(p.stage2_end_time)-90 : 1020;
    suggestion.returnDate=suggestion.date;
    if (end-30>=parseTime(suggestion.end || '')+15) {
      suggestion.returnStart=formatTime(end-30);suggestion.returnEnd=formatTime(end);
    }
  }
  form.querySelector('#review-travels').insertAdjacentHTML('beforeend',noticeTravelRow(suggestion));
  refreshTravelChoices(form);
  const status=form.querySelector('#review-travel-status');
  status.hidden=false;status.textContent='路途时长为建议值，往返时间及审核人员待确认。';
  lucide.createIcons();
}
