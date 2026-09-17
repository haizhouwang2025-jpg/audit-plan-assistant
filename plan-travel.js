function buildTravelPlan() {
  const rows = [], warnings = [];
  const date = document.getElementById('start-date').value;
  const window = scheduleWindow();
  for (const travel of state.travelIntervals || []) {
    const offset = (Date.parse(travel.date)-Date.parse(date))/86400000;
    const start = offset*1440+parseTime(travel.start), end = offset*1440+parseTime(travel.end);
    if (!Number.isInteger(offset) || !Number.isFinite(start) || !Number.isFinite(end) || start<window.start || end>window.end || end<=start) {
      warnings.push('转场时段不在当前审核起止范围内，请在复核信息中调整。');continue;
    }
    const lunchStart = offset*1440+parseTime(document.getElementById('lunch-start').value || '12:00');
    const lunchHours = Number(document.getElementById('lunch-hours').value || 0);
    if (lunchHours>0 && start<lunchStart+lunchHours*60 && end>lunchStart) warnings.push(`${travel.date} 转场与午休重叠，请调整。`);
    const auditorIds = state.auditors.map(a=>a.id);
    rows.push({kind:'travel',date:travel.date,time:`${travel.start}-${travel.end}`,absStart:start,absEnd:end,process:'场所间转场',clauses:travel.route,auditorIds,auditors:getAuditorDisplay(auditorIds),countsTowardAudit:false});
  }
  return {rows,warnings};
}

function excludeTravelTime(segments) {
  for (const travel of buildTravelPlan().rows) {
    segments = segments.flatMap(segment => {
      if (segment.date!==travel.date || travel.absEnd<=segment.absStart || travel.absStart>=segment.absEnd) return [segment];
      return [
        {...segment,absEnd:Math.min(segment.absEnd,travel.absStart)},
        {...segment,absStart:Math.max(segment.absStart,travel.absEnd)}
      ].filter(s=>s.absEnd>s.absStart);
    });
  }
  return segments;
}
