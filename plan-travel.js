function travelAuditorIds(travel, auditors = state.auditors) {
  return travel.auditorIds === undefined ? auditors.map(a=>a.id || a.code) : [...new Set(travel.auditorIds)];
}

function travelLegs(travel) {
  const legs=[{date:travel.date,start:travel.start,end:travel.end,label:travel.kind==='site_visit' ? '去程转场' : '场所间转场'}];
  if (travel.kind==='site_visit') legs.push({date:travel.returnDate || travel.date,start:travel.returnStart,end:travel.returnEnd,label:'返程转场'});
  return legs;
}

function travelMinute(date, time, startDate) {
  return (Date.parse(date)-Date.parse(startDate))/86400000*1440+parseTime(time || '');
}

function validateTravelIntervals(travels, context) {
  const warnings=[],visits=[];
  const {startDate,endDate,startTime,endTime,lunchStart,lunchHours,auditorIds,departmentNames}=context;
  const first=travelMinute(startDate,startTime,startDate),last=travelMinute(endDate,endTime,startDate);
  for (const [index,t] of travels.entries()) {
    const label=`第${index+1}项${t.kind==='site_visit' ? '场所审核' : '转场'}`;
    const ids=t.auditorIds === undefined ? auditorIds : [...new Set(t.auditorIds)];
    if (!ids.length || ids.some(id=>!auditorIds.includes(id))) warnings.push(label+'请指定有效的审核人员。');
    if (!t.route?.trim()) warnings.push(label+'请填写场所或路线。');
    for (const leg of travelLegs(t)) {
      const start=travelMinute(leg.date,leg.start,startDate),end=travelMinute(leg.date,leg.end,startDate);
      const validDate=Number.isFinite(Date.parse(leg.date)) && new Date(leg.date).toISOString().slice(0,10)===leg.date;
      if (!validDate || !/^([01]\d|2[0-3]):[0-5]\d$/.test(leg.start || '') || !/^([01]\d|2[0-3]):[0-5]\d$/.test(leg.end || '') || !Number.isFinite(start) || !Number.isFinite(end) || end<=start || start<first || end>last) {
        warnings.push(label+'的'+leg.label+'须有有效起止时间，并位于审核日期及起止范围内。');continue;
      }
      const lunch=travelMinute(leg.date,lunchStart,startDate);
      if (Number(lunchHours)>0 && start<lunch+Number(lunchHours)*60 && end>lunch) warnings.push(label+'的'+leg.label+'与午休重叠，请调整。');
    }
    if (t.kind==='site_visit') {
      const arrival=travelMinute(t.date,t.end,startDate),leave=travelMinute(t.returnDate || t.date,t.returnStart,startDate);
      if (!Number.isFinite(arrival) || !Number.isFinite(leave) || leave-arrival<15) warnings.push(label+'须在去程到达后、返程出发前留出至少15分钟。');
      if (!t.departments?.length || t.departments.some(name=>!departmentNames.includes(name))) warnings.push(label+'请指定当前有效的审核部门。');
    }
    const from=travelMinute(t.date,t.start,startDate),to=travelMinute(t.returnDate || t.date,t.kind==='site_visit' ? t.returnEnd : t.end,startDate);
    for (const previous of visits) if (from<previous.to && to>previous.from && ids.some(id=>previous.ids.includes(id))) warnings.push(label+'与其他转场或场所审核的人员时段重叠。');
    visits.push({from,to,ids});
  }
  return [...new Set(warnings)];
}

function buildTravelPlan() {
  const rows=[],visits=[],reservations=[];
  const date=document.getElementById('start-date').value;
  const window=scheduleWindow();
  const travels=state.travelIntervals || [];
  const warnings=validateTravelIntervals(travels,{startDate:date,endDate:addDays(date,window.days-1),startTime:formatTime(window.start),endTime:formatTime(window.end),lunchStart:document.getElementById('lunch-start').value,lunchHours:document.getElementById('lunch-hours').value,auditorIds:state.auditors.map(a=>a.id),departmentNames:state.departments.map(d=>d.name)});
  for (const [index,travel] of travels.entries()) {
    const auditorIds=travelAuditorIds(travel).filter(id=>getAuditor(id));
    const id=travel.id || 'travel_'+index;
    for (const leg of travelLegs(travel)) {
      const absStart=travelMinute(leg.date,leg.start,date),absEnd=travelMinute(leg.date,leg.end,date);
      if (!auditorIds.length || !Number.isFinite(absStart) || !Number.isFinite(absEnd) || absStart<window.start || absEnd>window.end || absEnd<=absStart) continue;
      rows.push({kind:'travel',siteVisitId:travel.kind==='site_visit' ? id : '',date:leg.date,time:leg.start+'-'+leg.end,absStart,absEnd,process:leg.label,clauses:travel.route,auditorIds,auditors:getAuditorDisplay(auditorIds),countsTowardAudit:false});
    }
    if (travel.kind!=='site_visit') continue;
    const absStart=travelMinute(travel.date,travel.end,date),absEnd=travelMinute(travel.returnDate || travel.date,travel.returnStart,date);
    const awayStart=travelMinute(travel.date,travel.start,date),awayEnd=travelMinute(travel.returnDate || travel.date,travel.returnEnd,date);
    if (!auditorIds.length || !Number.isFinite(absStart) || !Number.isFinite(absEnd) || absEnd<=absStart || awayStart<window.start || awayEnd>window.end) continue;
    visits.push({...travel,id,auditorIds,absStart,absEnd,awayStart,awayEnd});
    reservations.push({absStart:awayStart,absEnd:awayEnd,auditorIds});
  }
  return {rows,warnings,visits,reservations};
}

function siteAuditDepartments() {
  return new Set((state.travelIntervals || []).filter(t=>t.kind==='site_visit').flatMap(t=>t.departments || []));
}

function buildSiteAuditPlan(segments, fixedRows, visits) {
  const rows=[],warnings=[];
  for (const visit of visits) {
    const departments=(visit.departments || []).map(name=>state.departments.find(d=>d.name===name)).filter(Boolean);
    const items=departments.map(dept=>({dept,...getDepartmentWorkload(dept)}));
    if (!items.length) continue;
    const unavailable=items.filter(item=>!item.clauses.length || !hasIndependentClauseCoverage(visit.auditorIds,item.clauses));
    if (unavailable.length) {warnings.push(visit.route+'：'+unavailable.map(item=>item.dept.name).join('、')+'缺少条款或相应体系的独立主审人员。');continue;}
    for (const item of items) {
      const required=[...new Set(item.clauses.filter(c=>requiresProfessional(c,item.dept)).map(c=>c.system))];
      if (required.some(system=>!visit.auditorIds.some(id=>professionalFor(getAuditor(id),system)))) warnings.push(visit.route+'：'+item.dept.name+'的专业能力覆盖需确认。');
    }
    const window=segments.map(part=>({...part,absStart:Math.max(part.absStart,visit.absStart),absEnd:Math.min(part.absEnd,visit.absEnd)})).filter(part=>part.absEnd>part.absStart);
    let free=subtractScheduleIntervals(window,[...fixedRows,...rows].filter(row=>row.auditorIds.some(id=>visit.auditorIds.includes(id))));
    const minutes=intervalMinutes(free);
    if (minutes<items.length*15) {warnings.push(visit.route+'的有效现场审核时段不足，请调整往返时间、部门或人员。');continue;}
    const shares=weightedScheduleMinutes(items,minutes);
    items.forEach((item,index)=>{
      let remaining=shares[index];
      for (const part of [...free]) {
        if (!remaining) break;
        const duration=Math.min(remaining,part.absEnd-part.absStart);
        const block={...part,absEnd:part.absStart+duration};
        rows.push({kind:'department',departmentId:item.dept.id,siteVisitId:visit.id,site:visit.route,date:part.date,absStart:block.absStart,absEnd:block.absEnd,time:formatTime(block.absStart)+'-'+formatTime(block.absEnd),process:buildPlanProcessText({...item.dept,name:item.dept.name+'（'+visit.route+'）'},item.clauses,state.activePhase,state.emsVersion),clauses:clauseText(item.clauses),auditorIds:visit.auditorIds,auditors:getAuditorDisplay(visit.auditorIds)});
        free=subtractScheduleIntervals(free,[block]);remaining-=duration;
      }
    });
  }
  return {rows,warnings};
}

function siteLocationWarnings(rows, visits) {
  const warnings=[];
  for (const visit of visits) for (const row of rows) {
    if (row.siteVisitId===visit.id || row.kind==='travel' || row.absStart>=visit.awayEnd || row.absEnd<=visit.awayStart) continue;
    const people=row.auditorIds.filter(id=>visit.auditorIds.includes(id));
    if (people.length) warnings.push(getAuditorDisplay(people)+'外出审核期间与“'+row.process.split('\n')[0]+'”的场所安排冲突，请调整往返或会议、倒班时间。');
  }
  return [...new Set(warnings)];
}

function travelPlanNote(t) {
  const people=getAuditorDisplay(travelAuditorIds(t));
  const legs=travelLegs(t).map(leg=>leg.date+' '+leg.start+'-'+leg.end+' '+leg.label).join('；');
  return `${people}：${t.route}；${legs}（路途不计审核人日）${t.kind==='site_visit' ? '；审核部门：'+(t.departments || []).join('、') : ''}`;
}
