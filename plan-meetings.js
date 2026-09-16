function buildMeetingPlan() {
  const startDate = document.getElementById("start-date").value || "2026-08-25";
  const window = scheduleWindow();
  const auditorIds = state.auditors.map(a => a.id);
  const meetings = [], warnings = [];
  function add(kind, day, start, title) {
    const date = addDays(startDate, day), key = `${kind}:${date}`;
    if (kind === "internal" && state.meetingOverrides[key]) start = day * 1440 + parseTime(state.meetingOverrides[key]);
    const end = start + 30;
    if (!Number.isFinite(start) || start < day * 1440 || end > (day + 1) * 1440 || start < window.start || end > window.end) warnings.push(`${date} ${title}不在本次审核起止时间内，请调整。`);
    meetings.push({
      kind, meetingKey: key, date, absStart: start, absEnd: end,
      time: `${formatTime(start)}-${end === (day + 1) * 1440 ? "24:00" : formatTime(end)}`,
      process: title, clauses: auditMeetingContent[kind], auditorIds, auditors: getAuditorDisplay(auditorIds),
      countsTowardAudit: true
    });
  }
  add("opening", 0, window.start, "首次会议");
  for (let day = 0; day < window.days; day++) {
    add("internal", day, day === window.days - 1 ? window.end - 90 : day * 1440 + 1110, "审核组内部沟通");
  }
  add("management", window.days - 1, window.end - 60, "与管理层沟通");
  add("closing", window.days - 1, window.end - 30, "末次会议");
  const lastInternal = meetings.find(m => m.kind === "internal" && m.date === addDays(startDate, window.days - 1));
  if (lastInternal.absEnd > window.end - 60) warnings.push("末日内部沟通须在与管理层沟通开始前结束，请调整沟通时间。");
  return { meetings, warnings };
}

function countedPersonHours(rows) {
  return rows.reduce((sum, row) => {
    if (row.countsTowardAudit === false) return sum;
    const [start, end] = row.time.split("-");
    const count = row.auditorIds.filter(id => isIndependentAuditor(getAuditor(id))).length;
    return sum + (parseTime(end) - parseTime(start)) / 60 * count;
  }, 0);
}

function scheduleConflictWarnings(rows) {
  const warnings = [];
  for (const auditor of state.auditors) {
    const work = rows.filter(r => r.auditorIds.includes(auditor.id));
    for (let i = 0; i < work.length; i++) {
      for (let j = i + 1; j < work.length && work[j].date === work[i].date; j++) {
        if (parseTime(work[j].time.split("-")[0]) < parseTime(work[i].time.split("-")[1])) warnings.push(`${work[i].date} ${auditor.name}的${work[i].process.split("\n")[0]}与${work[j].process.split("\n")[0]}时间冲突。`);
      }
    }
  }
  for (const meeting of rows.filter(r => r.kind === "internal")) {
    if (rows.some(r => r.date === meeting.date && ["department", "shift"].includes(r.kind) && parseTime(r.time.split("-")[1]) > parseTime(meeting.time.split("-")[0]))) warnings.push(`${meeting.date} 内部沟通应安排在当天部门及倒班审核结束后，请调整沟通时间。`);
  }
  return [...new Set(warnings)];
}

function renderMeetingTime(row) {
  if (row.kind !== "internal") return escapeHtml(row.time);
  const changed = Boolean(state.meetingOverrides[row.meetingKey]);
  const [start, end] = row.time.split("-");
  return `<span class="meeting-time-control"><input type="time" min="00:00" max="23:30" step="900" value="${escapeHtml(start)}" data-meeting-key="${escapeHtml(row.meetingKey)}" aria-label="${escapeHtml(row.date)} 内部沟通开始时间"><span>–${escapeHtml(end)}</span><button type="button" class="meeting-time-reset" data-reset-meeting="${escapeHtml(row.meetingKey)}" title="恢复默认沟通时间" aria-label="恢复默认沟通时间" ${changed ? "" : 'disabled style="visibility:hidden"'}><i data-lucide="rotate-ccw" aria-hidden="true"></i></button></span>`;
}
