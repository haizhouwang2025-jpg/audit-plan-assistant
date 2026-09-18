function subtractScheduleIntervals(intervals, blocked) {
  for (const block of blocked) intervals=intervals.flatMap(part=>[
    {...part,absEnd:Math.min(part.absEnd,block.absStart)},
    {...part,absStart:Math.max(part.absStart,block.absEnd)}
  ].filter(part=>part.absEnd>part.absStart));
  return intervals;
}

function commonScheduleIntervals(calendars) {
  let common=calendars[0] || [];
  for (const calendar of calendars.slice(1)) common=common.flatMap(a=>calendar.filter(b=>b.date===a.date).map(b=>({date:a.date,absStart:Math.max(a.absStart,b.absStart),absEnd:Math.min(a.absEnd,b.absEnd)})).filter(part=>part.absEnd>part.absStart));
  return common;
}

function intervalMinutes(intervals) {
  return intervals.reduce((sum,part)=>sum+part.absEnd-part.absStart,0);
}

function weightedScheduleMinutes(items, total) {
  total=Math.max(0,Math.floor(total));
  const unit=total>=items.length*15 ? 15 : 1;
  const units=Math.floor(total/unit);
  const weight=items.reduce((sum,item)=>sum+item.workload,0);
  const minimum=Math.min(1,Math.floor(units/items.length));
  const distributable=units-minimum*items.length;
  const shares=items.map(item=>minimum+distributable*item.workload/weight);
  const result=shares.map(Math.floor);
  let remainder=units-result.reduce((sum,n)=>sum+n,0);
  shares.map((value,index)=>({index,fraction:value-Math.floor(value)})).sort((a,b)=>b.fraction-a.fraction).forEach(item=>{if(remainder>0){result[item.index]++;remainder--;}});
  const minutes=result.map(n=>n*unit);
  minutes[minutes.length-1]+=total-units*unit;
  return minutes;
}

function fillDepartmentSchedule(mode, segments, fixedRows) {
  const rows=[],warnings=[],groups=new Map();
  const allIds=state.auditors.map(a=>a.id);
  const free=Object.fromEntries(allIds.map(id=>[id,subtractScheduleIntervals(segments.map(part=>({...part})),fixedRows.filter(row=>row.auditorIds.includes(id)))]));
  for (const dept of state.departments) {
    if (siteAuditDepartments().has(dept.name)) continue;
    const {clauses,workload}=getDepartmentWorkload(dept);
    if (!clauses.length) continue;
    const assignedIds=normalizeAuditorGroupIds(mode==='together' ? allIds : dept.auditorIds);
    if (!hasIndependentClauseCoverage(assignedIds,clauses)) {warnings.push(dept.name+'缺少相应体系的可独立主审人员，尚未排入日程。');continue;}
    const key=assignedIds.join('+');
    if (!groups.has(key)) groups.set(key,{assignedIds,items:[],workload:0});
    const group=groups.get(key);
    group.items.push({dept,clauses,workload,minutes:0});group.workload+=workload;
  }
  const ordered=[...groups.values()].sort((a,b)=>b.assignedIds.length-a.assignedIds.length);
  function protectRemainingGroups(group, index, common, proposed) {
    const future=ordered.slice(index+1);
    if (!future.length) return proposed;
    const affected=new Set(group.assignedIds);
    const canReserve=minutes=>{
      const blocked=[];
      for (const part of common) {
        if (minutes<=0) break;
        const duration=Math.min(minutes,part.absEnd-part.absStart);
        blocked.push({...part,absEnd:part.absStart+duration});minutes-=duration;
      }
      const after=Object.fromEntries(allIds.map(id=>[id,affected.has(id) ? subtractScheduleIntervals(free[id],blocked) : free[id]]));
      for (const id of group.assignedIds) {
        const minimum=future.filter(other=>other.assignedIds.includes(id)).reduce((sum,other)=>sum+other.items.length*15,0);
        if (intervalMinutes(after[id])<minimum) return false;
      }
      return future.filter(other=>other.assignedIds.some(id=>affected.has(id))).every(other=>intervalMinutes(commonScheduleIntervals(other.assignedIds.map(id=>after[id])))>=other.items.length*15);
    };
    if (canReserve(proposed)) return proposed;
    let low=0,high=Math.floor(proposed/15);
    while (low<high) {
      const middle=Math.ceil((low+high)/2);
      if (canReserve(middle*15)) low=middle;else high=middle-1;
    }
    return Math.min(proposed,Math.max(group.items.length*15,low*15));
  }
  function allocate(group, total) {
    const shares=weightedScheduleMinutes(group.items,total);
    group.items.forEach((item,index)=>{
      let remaining=shares[index];
      const common=commonScheduleIntervals(group.assignedIds.map(id=>free[id]));
      for (const part of common) {
        if (remaining<=0) break;
        const minutes=Math.min(remaining,part.absEnd-part.absStart);
        const block={...part,absEnd:part.absStart+minutes};
        rows.push({kind:'department',departmentId:item.dept.id,date:part.date,absStart:block.absStart,absEnd:block.absEnd,time:formatTime(block.absStart)+'-'+formatTime(block.absEnd),process:processText(item.dept.name,item.clauses),clauses:clauseText(item.clauses),auditorIds:group.assignedIds,auditors:getAuditorDisplay(group.assignedIds)});
        group.assignedIds.forEach(id=>{free[id]=subtractScheduleIntervals(free[id],[block]);});
        item.minutes+=minutes;remaining-=minutes;
      }
    });
  }
  // Reserve shared personnel first, then fill each remaining independent lane.
  ordered.forEach((group,index)=>{
    const common=commonScheduleIntervals(group.assignedIds.map(id=>free[id]));
    const available=intervalMinutes(common);
    const shares=group.assignedIds.map(id=>{
      const remainingWeight=ordered.slice(index).filter(other=>other.assignedIds.includes(id)).reduce((sum,other)=>sum+other.workload,0);
      return intervalMinutes(free[id])*group.workload/remainingWeight;
    });
    const budget=Math.min(available,...shares);
    const proposed=budget>=available ? available : Math.min(available,Math.max(group.items.length*15,Math.floor(budget/15)*15));
    allocate(group,protectRemainingGroups(group,index,common,proposed));
  });
  for (const group of ordered) allocate(group,intervalMinutes(commonScheduleIntervals(group.assignedIds.map(id=>free[id]))));
  for (const group of ordered) for (const item of group.items) {
    if (!item.minutes) warnings.push(item.dept.name+'没有可用的共同审核时段，请调整人员或时间。');
    else if (item.minutes<15) warnings.push(item.dept.name+'审核时间不足15分钟，请确认安排。');
  }
  for (const auditor of state.auditors.filter(isIndependentAuditor)) {
    const gaps=free[auditor.id];
    if (gaps.length) warnings.push(auditor.name+'仍有未排定工作时段：'+gaps.map(part=>part.date+' '+formatTime(part.absStart)+'-'+formatTime(part.absEnd)).join('、')+'。请调整部门任务或共同审核人员。');
  }
  const merged=[],lastByTask=new Map();
  for (const row of rows.sort((a,b)=>a.absStart-b.absStart)) {
    const key=row.date+'|'+row.departmentId+'|'+row.auditorIds.join('+'),previous=lastByTask.get(key);
    if (previous && previous.absEnd===row.absStart) {previous.absEnd=row.absEnd;previous.time=previous.time.split('-')[0]+'-'+formatTime(row.absEnd);}
    else {merged.push(row);lastByTask.set(key,row);}
  }
  return {rows:merged,warnings};
}
