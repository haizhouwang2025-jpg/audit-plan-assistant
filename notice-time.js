function readNoticeTimeRange(project, rangeText, fullText) {
  const text = rangeText.split(/午休|倒班/)[0].replace(/：/g, ':');
  const dates = [...text.matchAll(/(20\d{2})\s*[年/.-]\s*(\d{1,2})\s*[月/.-]\s*(\d{1,2})\s*日?/g)];
  const iso = m => m[1] + '-' + m[2].padStart(2,'0') + '-' + m[3].padStart(2,'0');
  const info = {sources:{},notes:[]};
  const parts = dates.map((m,i)=>text.slice(m.index+m[0].length,dates[i+1]?.index ?? text.length).split('共')[0]);
  const clocks = part => [...(part || '').matchAll(/\b([01]?\d|2[0-3]):([0-5]\d)\b/g)].map(m=>m[1].padStart(2,'0')+':'+m[2]);
  const firstClocks = clocks(parts[0]), lastClocks = clocks(parts.at(-1));
  project.stage2_start_date = dates[0] ? iso(dates[0]) : '';
  project.stage2_end_date = dates[1] ? iso(dates[1]) : project.stage2_start_date;
  const duration = Number(text.match(/共\s*(\d+(?:\.\d+)?)\s*天/)?.[1] || 0);
  if (dates.length===1 && duration>1 && duration<=60) {
    project.stage2_end_date = addDays(project.stage2_start_date,Math.ceil(duration)-1);
    info.sources.stage2_end_date = 'suggested';
    info.notes.push('结束日期按通知书天数推算，待确认。');
  }
  const days = (Date.parse(project.stage2_end_date)-Date.parse(project.stage2_start_date))/86400000+1;
  info.startPeriod = parts[0]?.match(/上午|下午/)?.[0] || '';
  info.endPeriod = dates.length>1 ? parts[1]?.match(/上午|下午/)?.[0] || '' : days===1 ? [...(parts[0] || '').matchAll(/上午|下午/g)].at(-1)?.[0] || '' : '';
  if (duration%1===0.5 && Math.ceil(duration)===days) {
    if (!info.startPeriod && !info.endPeriod && !firstClocks.length) info.startPeriod='下午';
    else if (info.startPeriod==='上午' && !info.endPeriod && !lastClocks.length) info.endPeriod='上午';
  }
  const start = firstClocks[0];
  const end = dates.length>1 ? lastClocks[0] : days===1 && firstClocks.length>1 ? firstClocks.at(-1) : '';
  project.stage2_start_time = start || (info.startPeriod==='下午' ? '13:00' : '08:30');
  project.stage2_end_time = end || (info.endPeriod==='上午' ? '12:00' : '17:00');
  info.sources.stage2_start_time = start ? 'notice' : 'suggested';
  info.sources.stage2_end_time = end ? 'notice' : 'suggested';
  const lunch = fullText.replace(/：/g,':').match(/午休(?:时间)?\s*:?\s*(\d{1,2}:\d{2})\s*[-~～—–至]\s*(\d{1,2}:\d{2})/);
  const lunchMinutes = lunch ? parseTime(lunch[2])-parseTime(lunch[1]) : 0;
  const knownLunch = lunchMinutes>0 && lunchMinutes<=180;
  project.lunch_start = knownLunch ? formatTime(parseTime(lunch[1])) : '12:00';
  project.lunch_hours = knownLunch ? lunchMinutes/60 : 1;
  info.sources.lunch_start = info.sources.lunch_hours = knownLunch ? 'notice' : 'suggested';
  project.notice_time = info;
}

function noticeShiftSuggestion(project) {
  const days = (Date.parse(project.stage2_end_date)-Date.parse(project.stage2_start_date))/86400000+1;
  const hours = Math.max(1,Number(project.shift_audit_hours || 1));
  if (!(days>=1 && days<=60 && hours<=8)) return {};
  for (let day=0;day<days;day++) {
    const date = addDays(project.stage2_start_date,day);
    if (project.shift_date && project.shift_date!==date) continue;
    const earliest = Math.max(1020,day===0 ? parseTime(project.stage2_start_time)+30 : 0);
    const latest = day===days-1 ? parseTime(project.stage2_end_time)-90 : 1110;
    const starts = project.shift_start ? [parseTime(project.shift_start)] : [1050,1020];
    for (const start of starts) {
      const end = start+hours*60;
      const overlap = (project.travel_intervals || []).some(t=>t.date===date && start<parseTime(t.end) && end>parseTime(t.start));
      if (start>=earliest && end<=latest && !overlap) return {shift_date:date,shift_start:formatTime(start),shift_audit_hours:hours};
    }
  }
  return {};
}

function suggestNoticeTimes(project, auditors) {
  const info = project.notice_time;
  const days = (Date.parse(project.stage2_end_date)-Date.parse(project.stage2_start_date))/86400000+1;
  const count = auditors.filter(a=>a.independent!==false && !['技术专家','实习'].includes(a.role)).length;
  const required = Number(project.stage2_person_days)*480;
  // Only suggest missing clock values; approved dates and person-days are never expanded.
  const capacity = p => {
    let minutes=0;
    const lunchStart=parseTime(p.lunch_start), lunchEnd=lunchStart+Number(p.lunch_hours)*60;
    for (let day=0;day<days;day++) {
      const start=day===0 ? parseTime(p.stage2_start_time) : 510;
      const end=day===days-1 ? parseTime(p.stage2_end_time) : 1020;
      minutes+=Math.max(0,end-start)-Math.max(0,Math.min(end,lunchEnd)-Math.max(start,lunchStart));
      if (day<days-1) minutes+=30;
    }
    return minutes*count;
  };
  if (days>=1 && days<=60 && count && required>0 && capacity(project)<required) {
    const changes=[];
    if (info.sources.stage2_start_time==='suggested' && info.startPeriod!=='下午') changes.push({stage2_start_time:'08:00'});
    if (info.sources.stage2_end_time==='suggested' && info.endPeriod!=='上午') changes.push({stage2_end_time:'17:30'});
    const candidates=[...changes];
    if (changes.length===2) candidates.push({...changes[0],...changes[1]});
    const fit=candidates.find(change=>capacity({...project,...change})>=required);
    if (fit) {
      Object.assign(project,fit);
      info.notes.push('已结合批准人日微调建议时刻，最终以排程校验为准。');
    } else info.notes.push('当前时段可能不足以安排批准人日，请确认实际工作时间和人员安排。');
  }
  if (project.shift_required) {
    Object.assign(project,noticeShiftSuggestion(project));
    project.shift_audit_hours ||= 1;
    for (const key of ['shift_date','shift_start','shift_audit_hours']) info.sources[key]='suggested';
    info.notes.push(project.shift_start ? '倒班时段为建议值，需确认企业实际班次。' : '当前审核窗口没有合适的倒班时段，请确认企业班次及审核安排。');
  }
}

function noticeTravelSuggestion(project) {
  const days = (Date.parse(project.stage2_end_date)-Date.parse(project.stage2_start_date))/86400000+1;
  if (!(days>=1 && days<=60)) return {};
  const lunchEnd = parseTime(project.lunch_start)+Number(project.lunch_hours)*60;
  for (let day=0;day<days;day++) {
    const date=addDays(project.stage2_start_date,day);
    const start=Math.ceil(Math.max(lunchEnd,day===0 ? parseTime(project.stage2_start_time)+60 : 0)/15)*15;
    const end=day===days-1 ? parseTime(project.stage2_end_time)-90 : 1020;
    for (let minute=start;minute+30<=end;minute+=15) {
      const busy=[...(project.travel_intervals || [])];
      if (Number(project.shift_audit_hours)>0 && project.shift_date && project.shift_start) busy.push({date:project.shift_date,start:project.shift_start,end:formatTime(parseTime(project.shift_start)+Number(project.shift_audit_hours)*60)});
      if (!busy.some(t=>t.date===date && minute<parseTime(t.end) && minute+30>parseTime(t.start))) return {date,start:formatTime(minute),end:formatTime(minute+30),route:''};
    }
  }
  return {};
}
