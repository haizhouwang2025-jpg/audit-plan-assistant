const qmsClauseLibrary = [
  { id: "4.1", title: "组织环境", category: "common", weight: 1.1, required: true, defaultDept: "management" },
  { id: "4.2", title: "相关方需求", category: "common", weight: 1.0, required: true, defaultDept: "management" },
  { id: "4.3", title: "体系范围", category: "common", weight: 0.8, required: true, defaultDept: "management" },
  { id: "4.4", title: "质量管理体系及过程", category: "common", weight: 1.4, required: true, defaultDept: "management" },
  { id: "5.1", title: "领导作用与承诺", category: "common", weight: 1.3, required: true, defaultDept: "management" },
  { id: "5.2", title: "质量方针", category: "common", weight: 0.7, required: true, defaultDept: "management" },
  { id: "5.3", title: "职责权限", category: "common", weight: 0.9, required: true, defaultDept: "management" },
  { id: "6.1", title: "风险和机遇", category: "common", weight: 1.3, required: true, defaultDept: "management" },
  { id: "6.2", title: "质量目标", category: "common", weight: 1.0, required: true, defaultDept: "management" },
  { id: "6.3", title: "变更策划", category: "common", weight: 0.7, required: true, defaultDept: "management" },
  { id: "7.1.1", title: "资源总则", category: "common", weight: 0.7, required: true, defaultDept: "management" },
  { id: "7.1.2", title: "人员", category: "common", weight: 0.8, required: true, defaultDept: "admin" },
  { id: "7.1.3", title: "基础设施", category: "common", weight: 1.0, required: true, defaultDept: "operation" },
  { id: "7.1.4", title: "过程运行环境", category: "common", weight: 0.9, required: true, defaultDept: "operation" },
  { id: "7.1.5", title: "监视测量资源", category: "professional", weight: 1.0, required: true, strictProfessional: true, defaultDept: "quality" },
  { id: "7.1.6", title: "组织知识", category: "common", weight: 0.6, required: true, defaultDept: "admin" },
  { id: "7.2", title: "能力", category: "common", weight: 0.8, required: true, defaultDept: "admin" },
  { id: "7.3", title: "意识", category: "common", weight: 0.6, required: true, defaultDept: "admin" },
  { id: "7.4", title: "沟通", category: "common", weight: 0.6, required: true, defaultDept: "admin" },
  { id: "7.5.1", title: "成文信息总则", category: "common", weight: 0.5, required: true, defaultDept: "admin" },
  { id: "7.5.2", title: "创建和更新", category: "common", weight: 0.5, required: true, defaultDept: "admin" },
  { id: "7.5.3", title: "成文信息控制", category: "common", weight: 0.8, required: true, defaultDept: "admin" },
  { id: "8.1", title: "运行策划和控制", category: "professional", weight: 1.4, required: true, defaultDept: "operation" },
  { id: "8.2.1", title: "顾客沟通", category: "common", weight: 0.7, required: true, defaultDept: "sales" },
  { id: "8.2.2", title: "产品服务要求确定", category: "professional", weight: 0.9, required: true, defaultDept: "sales" },
  { id: "8.2.3", title: "产品服务要求评审", category: "professional", weight: 0.9, required: true, defaultDept: "sales" },
  { id: "8.2.4", title: "要求更改", category: "common", weight: 0.5, required: true, defaultDept: "sales" },
  { id: "8.3", title: "设计开发", category: "conditional", weight: 1.2, required: false, strictProfessional: true, defaultDept: "quality" },
  { id: "8.4", title: "外部提供过程控制", category: "professional", weight: 1.2, required: true, defaultDept: "purchase" },
  { id: "8.5.1", title: "生产服务提供控制", category: "professional", weight: 1.6, required: true, strictProfessional: true, defaultDept: "operation" },
  { id: "8.5.2", title: "标识和可追溯", category: "professional", weight: 0.8, required: true, defaultDept: "operation" },
  { id: "8.5.3", title: "顾客或外部供方财产", category: "professional", weight: 0.6, required: true, defaultDept: "operation" },
  { id: "8.5.4", title: "防护", category: "professional", weight: 0.7, required: true, defaultDept: "operation" },
  { id: "8.5.5", title: "交付后活动", category: "professional", weight: 0.7, required: true, defaultDept: "sales" },
  { id: "8.5.6", title: "更改控制", category: "professional", weight: 0.7, required: true, defaultDept: "operation" },
  { id: "8.6", title: "产品服务放行", category: "professional", weight: 1.0, required: true, strictProfessional: true, defaultDept: "quality" },
  { id: "8.7", title: "不合格输出控制", category: "professional", weight: 1.0, required: true, strictProfessional: true, defaultDept: "quality" },
  { id: "9.1.1", title: "监视测量分析评价", category: "common", weight: 0.8, required: true, defaultDept: "quality" },
  { id: "9.1.2", title: "顾客满意", category: "common", weight: 0.8, required: true, defaultDept: "sales" },
  { id: "9.1.3", title: "分析评价", category: "common", weight: 0.8, required: true, defaultDept: "quality" },
  { id: "9.2", title: "内部审核", category: "common", weight: 1.0, required: true, defaultDept: "management" },
  { id: "9.3", title: "管理评审", category: "common", weight: 1.0, required: true, defaultDept: "management" },
  { id: "10.1", title: "改进总则", category: "common", weight: 0.5, required: true, defaultDept: "management" },
  { id: "10.2", title: "不合格和纠正措施", category: "common", weight: 1.0, required: true, defaultDept: "quality" },
  { id: "10.3", title: "持续改进", category: "common", weight: 0.7, required: true, defaultDept: "management" }
];

let clauseLibrary = buildQesLibrary(qmsClauseLibrary);

const systemCatalog = {
  QMS: { code: "Q", name: "质量", color: "q" },
  EMS: { code: "E", name: "环境", color: "e" },
  OHSMS: { code: "S", name: "职业健康安全", color: "s" },
  ENMS: { code: "En", name: "能源", color: "en" },
  ISMS: { code: "I", name: "信息安全", color: "i" },
  FSMS: { code: "F", name: "食品安全", color: "f" },
  SMS: { code: "IT", name: "服务管理", color: "i" }
};

const professionalStrategyLibrary = {
  COMMON: {
    title: "整合通用条款",
    badge: "Q/E/S",
    note: "优先合并审核，通常安排给组长或综合能力强的审核员。",
    clauses: "4、5、7.5、9.2、9.3、10.1/10.3"
  },
  QMS: {
    title: "Q 质量专业条款",
    badge: "Q",
    note: "按宽口径派组：硬专业必须匹配专业能力；专业关联条款可由非专业审核员主审，必要时由专业审核员抽样确认。",
    clauses: "硬专业：7.1.5、8.3、8.5.1、8.6、8.7；专业关联：8.1、8.2.2-8.2.3、8.4、8.5.2-8.5.6"
  },
  EMS: {
    title: "E 环境专业条款",
    badge: "E",
    note: "按过程判定：行政、销售、采购的日常管理可由通用审核员承担；核心现场、合规和技术判断匹配 E 专业能力。",
    clauses: "专业重点：6.1.2-6.1.5、8.1、8.2、9.1.1、9.1.2、10.2"
  },
  OHSMS: {
    title: "S 职安专业条款",
    badge: "S",
    note: "5.4按通用管理审核；核心危险源、现场控制、合规和事件技术判断匹配 S 专业能力。",
    clauses: "专业重点：6.1.2-6.1.4、8.1、8.2、9.1.1、9.1.2、10.2"
  },
  ENMS: {
    title: "En 能源专业条款",
    badge: "En",
    note: "围绕能源评审、能源基准、能源绩效参数、运行控制和能源绩效改进，匹配能源专业能力。",
    clauses: "6.3、6.4、6.5、6.6、8.1、8.2、9.1"
  },
  ISMS: {
    title: "I 信息安全专业条款",
    badge: "I",
    note: "围绕信息资产、风险评估、控制措施、运行监视和事件管理，匹配信息安全专业能力。",
    clauses: "6.1、8.1、8.2、8.3、9.1、10.1"
  },
  FSMS: {
    title: "F 食品安全专业条款",
    badge: "F",
    note: "围绕危害分析、前提方案、HACCP/OPRP、追溯和应急处置，匹配食品安全专业能力。",
    clauses: "6、7、8.2-8.9、9.1、10.2"
  }
};

const phasePresets = {
  stage1: {
    label: "一阶段审核计划",
    shortLabel: "一阶段",
    auditType: "初次认证第一阶段",
    auditDays: 1,
    personDays: "2.0",
    departments: [
      { id: "stage1-docs", name: "文件与申请资料评审", auditorIds: ["A"] },
      { id: "stage1-management", name: "管理层/体系策划", auditorIds: ["A"] },
      { id: "stage1-tour", name: "现场巡视/过程确认", auditorIds: ["B"] },
      { id: "stage1-support", name: "支持过程访谈", auditorIds: ["C"] }
    ],
    assignmentGroups: {
      "stage1-docs": ["4.3", "4.4", "7.5.1", "7.5.2", "7.5.3"],
      "stage1-management": ["4.1", "4.2", "5.1", "5.2", "5.3", "6.1", "6.2", "6.3", "7.1.1", "9.2", "9.3", "10.1", "10.3"],
      "stage1-tour": ["7.1.3", "7.1.4", "7.1.5", "8.1", "8.5.1", "8.5.2", "8.5.3", "8.5.4", "8.5.6", "8.6", "8.7"],
      "stage1-support": ["7.1.2", "7.1.6", "7.2", "7.3", "7.4", "8.2.1", "8.2.2", "8.2.3", "8.2.4", "8.3", "8.4", "8.5.5", "9.1.1", "9.1.2", "9.1.3", "10.2"]
    }
  },
  stage2: {
    label: "二阶段审核计划",
    shortLabel: "二阶段",
    auditType: "初次认证第二阶段",
    auditDays: 2,
    personDays: "4.0",
    departments: [
      { id: "management", name: "管理层/管代", auditorIds: ["A"] },
      { id: "admin", name: "综合部/行政人资", auditorIds: ["C"] },
      { id: "sales", name: "销售/客服", auditorIds: ["C"] },
      { id: "purchase", name: "采购/供应商", auditorIds: ["A"] },
      { id: "operation", name: "生产/服务实现", auditorIds: ["B"] },
      { id: "quality", name: "质检/技术", auditorIds: ["B"] }
    ],
    assignmentGroups: null
  }
};
const initialPhasePresets = structuredClone(phasePresets);

const state = {
  activePhase: "stage2",
  importedFileName: "",
  importFindings: [],
  importedPlan: null,
  rawImportedPlan: null,
  systems: ["QMS"],
  emsVersion: "2026",
  phaseDrafts: {},
  meetingOverrides: {},
  assignmentFindings: [],
  departments: [
    { id: "management", name: "管理层/管代", auditorIds: ["A"] },
    { id: "admin", name: "综合部/行政人资", auditorIds: ["C"] },
    { id: "sales", name: "销售/客服", auditorIds: ["C"] },
    { id: "purchase", name: "采购/供应商", auditorIds: ["A"] },
    { id: "operation", name: "生产/服务实现", auditorIds: ["B"] },
    { id: "quality", name: "质检/技术", auditorIds: ["B"] }
  ],
  auditors: [
    { id: "A", code: "A", name: "示例组长", role: "组长", professional: false },
    { id: "B", code: "B", name: "示例专业审核员", role: "组员", professional: true },
    { id: "C", code: "C", name: "示例组员", role: "组员", professional: false }
  ],
  assignments: {},
  professionalAssignments: {},
  scheduleRows: [],
  draggedClauseId: null
};

const categoryText = {
  common: "通用",
  professional: "专业",
  conditional: "适用性"
};

function normalizeSystemCodes(value) {
  const source = Array.isArray(value) ? value.join(",") : valueToString(value);
  const compact = source.toUpperCase().replace(/\s+/g, "");
  const tokens = source.toUpperCase().split(/[\s、,，;；/+＋&＆()（）]+/).filter(Boolean);
  const shortCodes = tokens.flatMap((token) => /^[QES]{1,3}$/.test(token) ? token.split("") : []);
  const singleCode = compact.match(/(?:单一?|单体系)([QES])(?:版|体系)?/);
  if (singleCode) shortCodes.push(singleCode[1]);
  const systems = [];
  if (shortCodes.includes("Q") || tokens.includes("QMS") || /ISO9001|19001|质量/i.test(compact)) systems.push("QMS");
  if (shortCodes.includes("E") || tokens.includes("EMS") || /ISO14001|24001|环境/i.test(compact)) systems.push("EMS");
  if (shortCodes.includes("S") || /OHSMS|OHSAS|ISO45001|45001|职业健康/i.test(compact)) systems.push("OHSMS");
  if (/ENMS|ISO50001|50001|能源/i.test(compact)) systems.push("ENMS");
  if (/ISMS|ISO27001|27001|信息安全/i.test(compact)) systems.push("ISMS");
  if (/FSMS|ISO22000|22000|食品安全/i.test(compact)) systems.push("FSMS");
  if (/(^|[,，;；/])SMS(?=$|[,，;；/])|20000|服务管理/i.test(compact)) systems.push("SMS");
  return systems.length ? [...new Set(systems)] : compact ? [compact] : [];
}

function getSystemProfileLabel() {
  const count = state.systems.length;
  if (!count) return "待识别体系";
  if (count === 1) return `${systemCatalog[state.systems[0]]?.name || state.systems[0]}单体系`;
  if (count === 2) return "二体系整合";
  if (count === 3) return "三体系整合";
  return `${count}体系整合`;
}

function getSystemBadgesHtml() {
  return state.systems
    .map((system) => {
      const item = systemCatalog[system] || { code: system, name: system, color: "q" };
      return `<span class="system-chip ${item.color}">${escapeHtml(item.code)}<em>${escapeHtml(item.name)}</em></span>`;
    })
    .join("");
}

function renderSystemProfile() {
  const profile = document.getElementById("system-profile");
  if (!profile) return;
  profile.hidden = !state.importedPlan && !state.importedFileName;
  profile.innerHTML = `
    <span class="system-context">${state.importedPlan || state.importedFileName ? "当前项目" : "示例项目"}</span>
    <span class="system-mode">${escapeHtml(getSystemProfileLabel())}</span>
    ${getSystemBadgesHtml()}
  `;
  document.getElementById("ems-version").closest("label").hidden = !state.systems.includes("EMS");
}

function hasSystemInput(value) {
  const text = valueToString(value);
  return Boolean(text) && !/^(无|否|不适用|不涉及|未申请|未认证|不申请|无此体系|N\/?A|NONE|NULL|[-—–/]+|0)$/i.test(text);
}

function systemEvidenceFromSheet(rows = []) {
  const aliases = { Q: "QMS", QMS: "QMS", E: "EMS", EMS: "EMS", S: "OHSMS", OHSMS: "OHSMS", OHSAS: "OHSMS" };
  const seen = new Set(), active = new Set();
  for (const row of rows) {
    if (!row) continue;
    const index = row.findIndex(value => /^审核范围\s*(QMS|Q|EMS|E|OHSMS|OHSAS|S)$/i.test(valueToString(value)));
    if (index < 0) continue;
    const code = valueToString(row[index]).match(/(QMS|Q|EMS|E|OHSMS|OHSAS|S)$/i)[1].toUpperCase();
    const system = aliases[code];
    seen.add(system);
    if (row.slice(index + 1).some(hasSystemInput)) active.add(system);
  }
  return { seen: [...seen], active: ["QMS", "EMS", "OHSMS"].filter(system => active.has(system)) };
}

function resolvePlanSystems(plan) {
  const project = plan.project;
  const declared = normalizeSystemCodes(project.audit_systems);
  const recognized = declared.filter(system => systemCatalog[system]);
  const scopeSystems = ["QMS", "EMS", "OHSMS"].filter(system => {
    const suffix = { QMS: "q", EMS: "e", OHSMS: "s" }[system];
    return hasSystemInput(project[`scope_${suffix}`]) || hasSystemInput(project[`scope_text_${suffix}`]);
  });
  let systems, source;
  // The original form's scope rows outrank a legacy hidden sheet's fixed QES value.
  if (plan.systemEvidence?.seen.length === 3) {
    systems = [...plan.systemEvidence.active, ...recognized.filter(system => !["QMS", "EMS", "OHSMS"].includes(system))];
    source = "原表实际填写的审核范围";
  } else if (recognized.length) {
    systems = declared;
    source = "体系组合字段";
  } else if (scopeSystems.length) {
    systems = scopeSystems;
    source = "各体系认证范围";
  } else {
    const standards = [project.criteria_q, project.criteria_e, project.criteria_s, project.standard_q, project.standard_e, project.standard_s, project.audit_criteria].filter(hasSystemInput);
    systems = normalizeSystemCodes(standards).filter(system => systemCatalog[system]);
    source = "审核标准";
  }
  if (!systems.length) throw new Error("未能识别本项目体系。请填写实际审核范围或明确的体系组合（如Q、E、S、Q+E），保存后重新导入。");
  project.audit_systems = uniqueList(systems).join(",");
  plan.notes.push(`已根据${source}识别 ${systems.map(system => systemCatalog[system]?.code || system).join("/")} 体系。`);
  if (plan.systemEvidence?.seen.length === 3 && declared.length && declared.join(",") !== systems.join(",")) {
    plan.notes.push("隐藏页的体系组合与原表范围不一致，已按原表实际填写内容更新；请核对识别结果。");
  }
  return systems;
}

function getClauseSystemMark(clause) {
  return (clause.members || [clause]).map((item) => systemCatalog[item.system]?.code || item.system).join("/");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function activeClauses() {
  return clauseLibrary.filter((clause) => state.systems.includes(clause.system) &&
    (state.activePhase !== "stage1" || /^[4-7]\./.test(clause.number) || /^9\.[23](\.|$)/.test(clause.number) ||
      clause.number === "8.1" || (clause.system !== "QMS" && (/^8\./.test(clause.number) || clause.number === "9.1.2"))));
}

function clauseDepartments(id) {
  return state.assignments[id] || [];
}

function clausesForDepartment(dept) {
  return activeClauses().filter((clause) => clauseDepartments(clause.id).includes(dept.id));
}

function isIndependentAuditor(auditor) {
  return auditor && !["技术专家", "实习"].includes(auditor.role) && auditor.status !== "实习" && auditor.independent !== false;
}

function professionalFor(auditor, system) {
  return auditor && auditor.status !== "实习" && auditor.role !== "实习" &&
    (auditor.professionalSystems ? auditor.professionalSystems.includes(system) : auditor.professional);
}

function requiresProfessional(clause, dept) {
  if (clause.strictProfessional) return true;
  if (state.professionalAssignments[clause.id]?.includes(dept.id)) return true;
  if (!clause.contextualProfessional) return false;
  return !dept.processes?.length || dept.processes.some((process) => ["operation", "quality", "sales29"].includes(process));
}

function groupedTiles(clauses, dept) {
  const groups = new Map();
  clauses.forEach((clause) => {
    const strictProfessional = requiresProfessional(clause, dept);
    const category = clause.contextualProfessional && !strictProfessional ? "common" : clause.category;
    const key = category === "common" && auditRules.commonNumbers.has(clause.number) ? clause.number : clause.id;
    if (!groups.has(key)) groups.set(key, { ...clause, category, strictProfessional, members: [] });
    groups.get(key).members.push(clause);
  });
  return [...groups.values()];
}

const phaseFieldIds = ["audit-type", "start-date", "audit-days", "person-days", "team-mode", "audit-start-time", "audit-end-time", "lunch-hours", "shift-hours", "shift-date", "shift-start"];

function savePhaseDraft() {
  state.phaseDrafts[state.activePhase] = {
    meetingOverrides: { ...state.meetingOverrides },
    departments: cloneDepartments(state.departments),
    assignments: structuredClone(state.assignments),
    professionalAssignments: structuredClone(state.professionalAssignments),
    fields: Object.fromEntries(phaseFieldIds.map((id) => [id, document.getElementById(id).value]))
  };
}

function renderProfessionalStrategy() {
  const summary = document.getElementById("specialty-summary");
  const list = document.getElementById("professional-strategy");
  if (!summary || !list) return;
  summary.textContent = getSystemProfileLabel();

  const commonBadge = state.systems.map((system) => systemCatalog[system]?.code || system).join("/");
  const commonItem = {
    ...professionalStrategyLibrary.COMMON,
    badge: commonBadge,
    clauses: ["4", "5", "7.5", "9.2", "9.3", "10.1", "10.3"].filter(number => activeClauses().some(clause => clause.number === number || clause.number.startsWith(`${number}.`))).join("、"),
    title: state.systems.length > 1 ? "整合通用条款" : "通用条款",
    note: state.systems.length > 1
      ? "同号通用条款合并展示，各体系证据分别核对。"
      : "按单体系审核，通常安排给组长或综合能力强的审核员。"
  };
  const strategyItems = [
    { ...commonItem, color: "common" },
    ...state.systems
      .map((system) => {
        const strategy = professionalStrategyLibrary[system];
        if (!strategy) return null;
        return { ...strategy, clauses: system === "EMS" && state.emsVersion === "2015" ? strategy.clauses.replace("6.1.2-6.1.5", "6.1.2-6.1.4") : strategy.clauses, color: systemCatalog[system]?.color || "q" };
      })
      .filter(Boolean)
  ];
  list.innerHTML = "";
  strategyItems.forEach((item) => {
    const card = document.createElement("div");
    const strategyClass = item.title.includes("通用") ? "common" : item.color;
    card.className = `strategy-card ${strategyClass}`;
    card.innerHTML = `
      <div class="strategy-title">
        <span>${escapeHtml(item.badge)}</span>
        <strong>${escapeHtml(item.title)}</strong>
      </div>
      <p>${item.clauses}</p>
      <small>${item.note}</small>
    `;
    list.appendChild(card);
  });
}

function resetSuggestedAssignments() {
  delete state.phaseDrafts[state.activePhase];
  applyPhasePreset(state.activePhase);
  if (state.importedPlan) {
    setStageFieldsFromImportedPlan(state.importedPlan, state.activePhase);
    suggestAuditors();
  }
  render();
  generateSchedule();
}

function cloneDepartments(departments) {
  return departments.map((dept) => ({
    ...dept,
    auditorIds: [...dept.auditorIds]
  }));
}

function buildAssignmentsForPreset(preset) {
  const assignments = {};
  if (preset.assignmentGroups) {
    Object.entries(preset.assignmentGroups).forEach(([deptId, clauseIds]) => {
      clauseIds.forEach((clauseId) => {
        const id = getClause(clauseId)?.id;
        if (id) assignments[id] = uniqueList([...(assignments[id] || []), deptId]);
      });
    });
  } else {
    activeClauses().forEach((clause) => {
      assignments[clause.id] = [clause.defaultDept];
    });
  }
  return assignments;
}

function applyPhasePreset(phaseId) {
  const preset = phasePresets[phaseId] || phasePresets.stage2;
  state.activePhase = phaseId;
  state.meetingOverrides = {};
  state.departments = cloneDepartments(preset.departments);
  state.assignments = {};
  state.assignments = buildAssignmentsForPreset(preset);
  state.professionalAssignments = {};
  document.getElementById("audit-type").value = preset.auditType;
  document.getElementById("audit-days").value = preset.auditDays;
  document.getElementById("person-days").value = preset.personDays;
}

function setActivePhase(phaseId) {
  savePhaseDraft();
  const draft = state.phaseDrafts[phaseId];
  if (draft) {
    state.activePhase = phaseId;
    state.meetingOverrides = { ...(draft.meetingOverrides || {}) };
    state.departments = cloneDepartments(draft.departments);
    state.assignments = structuredClone(draft.assignments);
    state.professionalAssignments = structuredClone(draft.professionalAssignments);
    Object.entries(draft.fields).forEach(([id, value]) => { document.getElementById(id).value = value; });
  } else {
    applyPhasePreset(phaseId);
    if (state.importedPlan) {
      setStageFieldsFromImportedPlan(state.importedPlan, phaseId);
      suggestAuditors();
    }
  }
  render();
  generateSchedule();
}

function getClause(id) {
  return clauseLibrary.find((clause) => clause.id === (id.includes(":") ? id : `QMS:${id}`));
}

function getDepartment(id) {
  return state.departments.find((dept) => dept.id === id);
}

function getAuditor(id) {
  return state.auditors.find((auditor) => auditor.id === id);
}

function getAuditorRoleText(auditor) {
  if (!auditor) return "";
  if (auditor.status === "实习" || auditor.role === "实习") return "实习";
  const systems = state.systems.filter((system) => professionalFor(auditor, system));
  return systems.length ? `${auditor.role}/${systems.map((system) => systemCatalog[system]?.code).join("/")}专业` : auditor.role;
}

function getAuditorDisplay(ids) {
  return ids
    .map((id) => getAuditor(id))
    .filter(Boolean)
    .map((auditor) => `${auditor.name}（${getAuditorRoleText(auditor)}）`)
    .join("、");
}

function getClauseCapabilityText(clause) {
  if (clause.strictProfessional) return "核心专业";
  if (clause.category === "professional") return "专业关联";
  return categoryText[clause.category];
}

function createClauseTile(clause, deptId) {
  const tile = document.createElement("div");
  tile.className = `clause-tile ${clause.category}`;
  tile.draggable = true;
  tile.dataset.clauseId = clause.id;
  const systemMark = getClauseSystemMark(clause);
  tile.title = `${systemMark} ${clause.number} ${clause.title} / ${getClauseCapabilityText(clause)}${clause.members?.length > 1 ? " / 分体系核对证据" : ""}${clause.required ? " / 必审" : " / 按适用性"}`;
  tile.setAttribute("aria-label", tile.title);
  tile.innerHTML = `
    <div class="tile-title">
      <span class="clause-system">${systemMark}</span>
      <span>${clause.number}</span>
      <span class="clause-name">${clause.title}</span>
    </div>
    <div class="tile-meta">
      <span>${getClauseCapabilityText(clause)}</span>
      <span>权重 ${clause.weight.toFixed(1)}</span>
      ${clause.required ? "<span>必审</span>" : "<span>按适用性</span>"}
    </div>
  `;
  tile.addEventListener("dragstart", (event) => {
    state.draggedClauseId = clause.id;
    event.dataTransfer.setData("text/plain", JSON.stringify({ ids: (clause.members || [clause]).map((item) => item.id), from: deptId }));
    event.dataTransfer.effectAllowed = "move";
  });
  tile.addEventListener("dragend", () => {
    state.draggedClauseId = null;
    document.querySelectorAll(".drop-area").forEach((area) => area.classList.remove("is-over"));
  });
  return tile;
}

function updateNoticeSummary() {
  if (!state.importedPlan && !state.importedFileName) {
    document.getElementById("notice-summary").textContent = "Excel · .xlsx";
    return;
  }
  const company = document.getElementById("company").value.trim() || "未填写企业";
  const auditType = document.getElementById("audit-type").value;
  const days = document.getElementById("audit-days").value || "0";
  const personDays = document.getElementById("person-days").value || "0";
  const importSuffix = state.importedFileName ? ` / 已导入：${state.importedFileName}` : "";
  document.getElementById("notice-summary").textContent = `${company} / ${auditType} / ${days} 天 / ${personDays} 人日${importSuffix}`;
}

function makeDropArea(area) {
  area.addEventListener("dragover", (event) => {
    event.preventDefault();
    area.classList.add("is-over");
  });
  area.addEventListener("dragleave", () => {
    area.classList.remove("is-over");
  });
  area.addEventListener("drop", (event) => {
    event.preventDefault();
    area.classList.remove("is-over");
    const deptId = area.dataset.deptId;
    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); } catch { return; }
    if (!Array.isArray(payload.ids) || !deptId || (!getDepartment(deptId) && deptId !== "unassigned")) return;
    payload.ids.filter((id) => getClause(id)).forEach((id) => {
      const strict = requiresProfessional(getClause(id), getDepartment(payload.from) || { id: "unassigned" });
      const professionalTargets = (state.professionalAssignments[id] || []).filter((target) => target !== payload.from);
      state.professionalAssignments[id] = uniqueList(strict ? [...professionalTargets, deptId] : professionalTargets);
      const remaining = clauseDepartments(id).filter((target) => target !== payload.from);
      state.assignments[id] = uniqueList(deptId === "unassigned" ? remaining : [...remaining, deptId]);
    });
    render();
    generateSchedule();
  });
}

function renderPhaseSelector() {
  const preset = phasePresets[state.activePhase] || phasePresets.stage2;
  document.querySelectorAll(".phase-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.phaseId === state.activePhase);
    const phase = phasePresets[card.dataset.phaseId];
    const draft = state.phaseDrafts[card.dataset.phaseId]?.fields;
    const active = card.dataset.phaseId === state.activePhase;
    const days = active ? document.getElementById("audit-days").value : draft?.["audit-days"] || phase.auditDays;
    const personDays = active ? document.getElementById("person-days").value : draft?.["person-days"] || phase.personDays;
    card.querySelector(".phase-card-foot").textContent = state.importedPlan && card.dataset.phaseId === "stage1" && !state.importedPlan.project.stage1_start_date && !draft ? "日期及人日待确认" : `${days} 天 / ${personDays} 人日`;
  });
  document.getElementById("phase-summary").textContent = preset.shortLabel;
  document.getElementById("active-phase-label").textContent = preset.label;
}

function getDepartmentWorkload(dept) {
  const clauses = clausesForDepartment(dept);
  return {
    clauses,
    workload: groupedTiles(clauses, dept).reduce((sum, tile) => sum + Math.max(...tile.members.map((clause) => clause.weight)) + (tile.members.length - 1) * 0.2, 0)
  };
}

function createDepartmentBox(dept) {
  const { clauses: deptClauses, workload } = getDepartmentWorkload(dept);
  const box = document.createElement("article");
  box.className = "dept-box";
  box.innerHTML = `
    <div class="dept-head">
      <input class="dept-title-field" value="${escapeHtml(dept.name)}" aria-label="部门名称">
      <span class="dept-stats">${deptClauses.length} 项 / ${workload.toFixed(1)}</span>
    </div>
    <div class="dept-processes">${escapeHtml((dept.processLabels || []).join(" / "))}</div>
    <div class="dept-auditors" aria-label="审核人员"></div>
    <div class="drop-area clause-list" data-dept-id="${escapeHtml(dept.id)}"></div>
  `;
  box.querySelector(".dept-title-field").addEventListener("change", (event) => {
    dept.name = event.target.value.trim() || dept.name;
    render();
    generateSchedule();
  });

  const auditorWrap = box.querySelector(".dept-auditors");
  state.auditors.forEach((auditor) => {
    const id = `dept-${dept.id}-${auditor.id}`;
    const chip = document.createElement("label");
    chip.className = `auditor-chip ${auditor.professional ? "is-professional" : ""}`;
    chip.innerHTML = `
      <input id="${escapeHtml(id)}" type="checkbox" ${dept.auditorIds.includes(auditor.id) ? "checked" : ""}>
      <span class="auditor-avatar-mini">${escapeHtml(auditor.code)}</span>
      <span class="chip-name">${escapeHtml(auditor.name)}</span>
      <span class="chip-role">${escapeHtml(getAuditorRoleText(auditor))}</span>
    `;
    chip.querySelector("input").addEventListener("change", (event) => {
      if (event.target.checked) {
        if (!dept.auditorIds.includes(auditor.id)) dept.auditorIds.push(auditor.id);
      } else {
        dept.auditorIds = dept.auditorIds.filter((idValue) => idValue !== auditor.id);
      }
      render();
      generateSchedule();
    });
    auditorWrap.appendChild(chip);
  });

  const drop = box.querySelector(".drop-area");
  makeDropArea(drop);
  if (!deptClauses.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "空部门";
    drop.appendChild(empty);
  } else {
    groupedTiles(deptClauses, dept).forEach((clause) => drop.appendChild(createClauseTile(clause, dept.id)));
  }
  return box;
}

function getAuditorSortIndex(id) {
  const index = state.auditors.findIndex((auditor) => auditor.id === id);
  return index === -1 ? 999 : index;
}

function normalizeAuditorGroupIds(ids) {
  return [...new Set(ids)]
    .filter((id) => getAuditor(id))
    .sort((left, right) => getAuditorSortIndex(left) - getAuditorSortIndex(right));
}

function createAuditorGroup(key, ids = []) {
  if (key === "no-auditor") {
    return {
      id: key,
      title: "未指定",
      subtitle: "待分配主审",
      departments: [],
      order: 999
    };
  }

  const auditors = ids.map((id) => getAuditor(id)).filter(Boolean);
  const isJoint = auditors.length > 1;
  return {
    id: key,
    title: isJoint ? auditors.map((auditor) => auditor.name).join(" + ") : auditors[0]?.name || "未指定",
    subtitle: isJoint ? `${auditors.map((auditor) => auditor.code).join("+")} 共同审核` : getAuditorRoleText(auditors[0]),
    departments: [],
    joint: isJoint,
    order: isJoint ? 100 + Math.min(...ids.map(getAuditorSortIndex)) : getAuditorSortIndex(ids[0])
  };
}

function renderDepartments() {
  const board = document.getElementById("department-board");
  board.innerHTML = "";
  const groups = new Map();
  state.auditors.forEach((auditor) => {
    groups.set(auditor.id, createAuditorGroup(auditor.id, [auditor.id]));
  });

  state.departments.forEach((dept) => {
    const auditorIds = normalizeAuditorGroupIds(dept.auditorIds);
    const key = auditorIds.length ? auditorIds.join("+") : "no-auditor";
    if (!groups.has(key)) {
      groups.set(key, createAuditorGroup(key, auditorIds));
    }
    const group = groups.get(key);
    group.departments.push(dept);
  });

  [...groups.values()]
    .filter((group) => group.departments.length)
    .sort((left, right) => left.order - right.order || left.id.localeCompare(right.id))
    .forEach((group) => {
      const lane = document.createElement("section");
      lane.className = `auditor-lane ${group.joint ? "is-joint" : ""}`;
      const totalWorkload = group.departments.reduce((sum, dept) => sum + getDepartmentWorkload(dept).workload, 0);
      lane.innerHTML = `
        <div class="auditor-lane-head">
          <div>
            <h3>${escapeHtml(group.title)}</h3>
            <p>${escapeHtml(group.subtitle)}</p>
          </div>
          <span>${group.departments.length} 部门 / ${totalWorkload.toFixed(1)}</span>
        </div>
        <div class="auditor-lane-body"></div>
      `;
      const body = lane.querySelector(".auditor-lane-body");
      group.departments.forEach((dept) => body.appendChild(createDepartmentBox(dept)));
      board.appendChild(lane);
    });
}

function renderAuditors() {
  const list = document.getElementById("auditor-list");
  list.innerHTML = "";
  state.auditors.forEach((auditor) => {
    const row = document.createElement("div");
    row.className = "auditor-row";
    row.innerHTML = `
      <input value="${escapeHtml(auditor.code)}" aria-label="审核员代码" maxlength="2">
      <input value="${escapeHtml(auditor.name)}" aria-label="审核员姓名">
      <select aria-label="组内身份">
        <option ${auditor.role === "组长" ? "selected" : ""}>组长</option>
        <option ${auditor.role === "组员" ? "selected" : ""}>组员</option>
        <option ${auditor.role === "技术专家" ? "selected" : ""}>技术专家</option>
        <option ${auditor.role === "实习" ? "selected" : ""}>实习</option>
      </select>
      <div class="checkline system-capabilities"></div>
    `;
    const [codeInput, nameInput, roleSelect] = row.querySelectorAll("input, select");
    state.systems.forEach((system) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" ${professionalFor(auditor, system) ? "checked" : ""}>${escapeHtml(systemCatalog[system]?.code || system)} 专业`;
      label.querySelector("input").addEventListener("change", (event) => {
        const systems = state.systems.filter((item) => professionalFor(auditor, item));
        auditor.professionalSystems = event.target.checked ? uniqueList([...systems, system]) : systems.filter((item) => item !== system);
        auditor.professional = auditor.professionalSystems.length > 0;
        render();
        generateSchedule();
      });
      row.querySelector(".system-capabilities").appendChild(label);
    });
    codeInput.addEventListener("change", (event) => {
      auditor.code = event.target.value.trim().toUpperCase() || auditor.code;
      render();
      generateSchedule();
    });
    nameInput.addEventListener("change", (event) => {
      auditor.name = event.target.value.trim() || auditor.name;
      render();
      generateSchedule();
    });
    roleSelect.addEventListener("change", (event) => {
      auditor.role = event.target.value;
      auditor.status = auditor.role === "实习" ? "实习" : "";
      auditor.independent = !["实习", "技术专家"].includes(auditor.role);
      render();
      generateSchedule();
    });
    list.appendChild(row);
  });
}

function renderDiagnostics() {
  const issues = [];
  const assignedRequired = activeClauses().filter((clause) => clause.required && clauseDepartments(clause.id).length);
  const missing = activeClauses().filter((clause) => clause.required && !clauseDepartments(clause.id).length);
  const professionalIssues = [];
  const professionalAdvisories = [];
  const emptyAuditorDepartments = [];

  state.departments.forEach((dept) => {
    const deptClauses = clausesForDepartment(dept);
    if (deptClauses.length && !dept.auditorIds.some((id) => isIndependentAuditor(getAuditor(id)))) {
      emptyAuditorDepartments.push(dept.name);
    }
    const missingSystems = uniqueList(deptClauses.filter((clause) => requiresProfessional(clause, dept) &&
      !dept.auditorIds.some((id) => professionalFor(getAuditor(id), clause.system))).map((clause) => clause.system));
    const needsProfessional = deptClauses.some((clause) => requiresProfessional(clause, dept));
    const hasProfessionalAssociated = deptClauses.some((clause) => clause.category === "professional" && !clause.strictProfessional);
    const hasProfessional = dept.auditorIds.some((id) => getAuditor(id)?.professional);
    if (missingSystems.length) {
      professionalIssues.push(`${dept.name}（${missingSystems.map((system) => systemCatalog[system].code).join("/")}）`);
    }
    if (!needsProfessional && hasProfessionalAssociated && !hasProfessional) {
      professionalAdvisories.push(dept.name);
    }
  });

  if (missing.length) {
    issues.push({ type: "bad", text: `未分配必审条款：${missing.map((clause) => `${getClauseSystemMark(clause)} ${clause.number}`).join("、")}` });
  }
  if (professionalIssues.length) {
    issues.push({ type: "bad", text: `核心专业条款未匹配专业审核员：${professionalIssues.join("、")}` });
  }
  for (const clause of activeClauses().filter((item) => item.contextualProfessional)) {
    const targets = clauseDepartments(clause.id);
    if (targets.length && !targets.some((id) => getDepartment(id)?.auditorIds.some((auditorId) => professionalFor(getAuditor(auditorId), clause.system)))) {
      issues.push({ type: "bad", text: `${getClauseSystemMark(clause)} ${clause.number} 缺少专业取证覆盖。` });
      professionalIssues.push(clause.id);
    }
  }
  if (emptyAuditorDepartments.length) {
    issues.push({ type: "bad", text: `未安排可独立主审的审核员：${emptyAuditorDepartments.join("、")}` });
  }
  if (!state.auditors.some((auditor) => auditor.role === "组长")) {
    issues.push({ type: "warn", text: "审核组缺少组长身份" });
  }
  const unsupported = state.systems.filter((system) => !["QMS", "EMS", "OHSMS"].includes(system));
  if (unsupported.length) issues.push({ type: "bad", text: `${unsupported.join("/")} 条款库尚未接入，不能确认其覆盖。` });
  if (!issues.length) {
    issues.push({ type: "good", text: "核心专业条款已由具备专业能力的人员覆盖" });
  }
  if (professionalAdvisories.length && !professionalIssues.length) {
    issues.push({
      type: "note",
      text: `${professionalAdvisories.join("、")}按通用业务安排主审；涉及具体技术判断时，由对应体系专业人员参与确认。`
    });
  }
  state.importFindings.forEach((finding) => {
    issues.push({ type: "note", text: `导入提示：${finding}` });
  });
  state.assignmentFindings.forEach((finding) => issues.push({ type: "warn", text: finding }));
  const coverage = document.getElementById("system-coverage");
  coverage.textContent = state.systems.map((system) => {
    const required = activeClauses().filter((clause) => clause.system === system && clause.required);
    return `${systemCatalog[system]?.code || system} ${required.filter((clause) => clauseDepartments(clause.id).length).length}/${required.length}`;
  }).join(" · ");
  const unassigned = document.getElementById("unassigned-clauses");
  unassigned.replaceChildren();
  activeClauses().filter((clause) => !clauseDepartments(clause.id).length).forEach((clause) => unassigned.appendChild(createClauseTile(clause, "unassigned")));
  document.getElementById("unassigned-section").hidden = !unassigned.children.length;

  document.getElementById("covered-count").textContent = assignedRequired.length;
  document.getElementById("missing-count").textContent = missing.length;
  document.getElementById("professional-count").textContent = professionalIssues.length;

  const summary = document.getElementById("check-summary");
  summary.textContent = issues.some((item) => item.type === "bad") ? "需调整" : issues.some((item) => item.type === "warn") ? "有提醒" : "通过";
  summary.className = `tag ${issues.some((item) => item.type === "bad") ? "bad" : issues.some((item) => item.type === "warn") ? "warn" : "good"}`;

  const issueList = document.getElementById("issues-list");
  issueList.innerHTML = "";
  issues.forEach((issue) => {
    const li = document.createElement("li");
    li.className = issue.type;
    li.textContent = issue.text;
    issueList.appendChild(li);
  });
}

function addDepartment() {
  const input = document.getElementById("new-dept-name");
  const name = input.value.trim();
  if (!name) return;
  const id = `dept-${Date.now()}`;
  state.departments.push({ id, name, auditorIds: [] });
  input.value = "";
  render();
}

function addAuditor() {
  const nextCode = String.fromCharCode(65 + state.auditors.length);
  state.auditors.push({
    id: `auditor-${Date.now()}`,
    code: nextCode,
    name: `审核员${nextCode}`,
    role: "组员",
    professional: false
  });
  render();
}

function parseTime(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function importedTime(value) {
  if (typeof value === "number" && value >= 0 && value < 1) return formatTime(Math.round(value * 1440));
  const match = valueToString(value).match(/^(\d{1,2})[:：](\d{2})/);
  return match ? `${match[1].padStart(2, "0")}:${match[2]}` : "";
}

function scheduleWindow() {
  const days = Math.max(1, Math.min(60, Number(document.getElementById("audit-days").value || 1)));
  const start = parseTime(document.getElementById("audit-start-time").value || "08:30");
  const end = (days - 1) * 1440 + parseTime(document.getElementById("audit-end-time").value || "17:00");
  return { days, start, end };
}

function formatTime(totalMinutes) {
  const minutesInDay = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(minutesInDay / 60);
  const minutes = minutesInDay % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function addDays(dateString, offset) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + offset);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function buildSegments(meetings = buildMeetingPlan().meetings) {
  const startDate = document.getElementById("start-date").value || "2026-08-25";
  const { days, start, end } = scheduleWindow();
  const lunch = Math.max(0, Number(document.getElementById("lunch-hours").value || 0)) * 60;
  const segments = [];
  for (let day = 0; day < days; day += 1) {
    const date = addDays(startDate, day);
    const internal = meetings.find(m => m.kind === "internal" && m.date === date);
    const workEnd = Math.min(end - 60, internal?.absStart ?? end - 90);
    for (const [left, right] of [[510, 720], [720 + lunch, 1020]]) {
      segments.push({ date, absStart: Math.max(day * 1440 + left, start + 30), absEnd: Math.min(day * 1440 + right, workEnd) });
    }
  }
  return segments.filter((segment) => segment.absEnd > segment.absStart);
}

function findSegmentAtOrAfter(segments, cursor) {
  return segments.find((segment) => cursor < segment.absEnd) || null;
}

function normalizeCursorToSegment(segment, cursor) {
  return Math.max(cursor, segment.absStart);
}

function roundToQuarter(hours) {
  return Math.max(0.5, Math.floor(hours * 4) / 4);
}

function buildDepartmentDurations(mode, meetings = buildMeetingPlan().meetings) {
  const selectedDepartments = state.departments
    .map((dept) => {
      const { clauses, workload } = getDepartmentWorkload(dept);
      return { dept, clauses, workload };
    })
    .filter((item) => item.clauses.length);

  const personDays = Math.max(0.5, Number(document.getElementById("person-days").value || 1));
  const meetingPersonHours = countedPersonHours(meetings);
  const shift = getShiftAssignment();
  const shiftPersonHours = shift ? shift.minutes / 60 * shift.auditorIds.filter((id) => isIndependentAuditor(getAuditor(id))).length : 0;
  const availablePersonHours = Math.max(0, personDays * 8 - meetingPersonHours - shiftPersonHours);

  const tasks = selectedDepartments.map((item) => {
    const assignedIds = mode === "together" ? state.auditors.map((auditor) => auditor.id) : item.dept.auditorIds;
    return { ...item, assignedIds };
  });
  const loads = {};
  tasks.forEach((item) => item.assignedIds.filter((id) => isIndependentAuditor(getAuditor(id))).forEach((id) => { loads[id] = (loads[id] || 0) + item.workload; }));
  const budget = availablePersonHours / Math.max(1, Object.keys(loads).length);
  const durations = tasks.map((item) => {
    const shares = item.assignedIds.filter((id) => loads[id]).map((id) => budget * item.workload / loads[id]);
    const hours = shares.length ? Math.min(...shares) : 0;
    return { ...item, rawMinutes: hours * 60, clockMinutes: hours > 0 ? Math.round(roundToQuarter(hours) * 60) : 0 };
  });
  const assignedMinutes = Object.fromEntries(Object.keys(loads).map((id) => [id, durations.filter((item) => item.assignedIds.includes(id)).reduce((sum, item) => sum + item.clockMinutes, 0)]));
  const ranked = [...durations].sort((a, b) => (b.rawMinutes - b.clockMinutes) - (a.rawMinutes - a.clockMinutes));
  ranked.forEach((item) => {
    const counted = item.assignedIds.filter((id) => loads[id]);
    if (counted.length && counted.every((id) => assignedMinutes[id] + 15 <= budget * 60 + 0.01)) {
      item.clockMinutes += 15;
      counted.forEach((id) => { assignedMinutes[id] += 15; });
    }
  });
  return durations;
}

function clauseText(clauses) {
  return state.systems.map((system) => {
    const numbers = uniqueList(clauses.filter((clause) => clause.system === system).map((clause) => clause.number)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    return numbers.length ? `${systemCatalog[system]?.code || system}：${numbers.join("、")}` : "";
  }).filter(Boolean).join("；\n");
}

function processText(deptName, clauses) {
  const dept = state.departments.find((item) => item.name === deptName) || { name: deptName };
  return buildPlanProcessText(dept, clauses, state.activePhase, state.emsVersion);
}

function getShiftAssignment() {
  const hours = Number(document.getElementById("shift-hours").value || 0);
  const date = document.getElementById("shift-date").value;
  const time = document.getElementById("shift-start").value;
  const firstDate = document.getElementById("start-date").value;
  const { days, start: windowStart, end: windowEnd } = scheduleWindow();
  if (hours < 1 || !date || !time || !firstDate || date < firstDate || date > addDays(firstDate, days - 1)) return null;
  const start = parseTime(time);
  const absoluteStart = Math.round((Date.parse(date) - Date.parse(firstDate)) / 86400000) * 1440 + start;
  if (start < 1020 || start + hours * 60 > 1440 || absoluteStart < windowStart || absoluteStart + hours * 60 > windowEnd) return null;
  const dept = state.departments.find((item) => item.processes?.some((process) => ["operation", "sales29"].includes(process))) || state.departments.find((item) => item.id === "operation");
  if (!dept || !dept.auditorIds.some((id) => isIndependentAuditor(getAuditor(id)))) return null;
  return { dept, date, start, minutes: hours * 60, auditorIds: document.getElementById("team-mode").value === "together" ? state.auditors.map((auditor) => auditor.id) : dept.auditorIds };
}

function generateSchedule() {
  updateNoticeSummary();
  renderPhaseSelector();
  if (!document.getElementById("start-date").value) {
    state.scheduleRows = [];
    renderSchedule(["审核开始日期待确认。"]);
    return;
  }
  const mode = document.getElementById("team-mode").value;
  const meetingPlan = buildMeetingPlan();
  const segments = buildSegments(meetingPlan.meetings);
  const allAuditorIds = state.auditors.map((auditor) => auditor.id);
  const cursors = Object.fromEntries(allAuditorIds.map((id) => [id, segments[0]?.absStart || 0]));
  const rows = [...meetingPlan.meetings];
  const warnings = [...meetingPlan.warnings];
  const workItems = buildDepartmentDurations(mode, meetingPlan.meetings);
  workItems.forEach((item) => {
    let remaining = item.clockMinutes;
    const assignedIds = item.assignedIds;
    if (!remaining) { warnings.push(`${item.dept.name} 尚未排定，批准审核人日不足以分配部门审核时间。`); return; }
    if (!assignedIds.some((id) => isIndependentAuditor(getAuditor(id)))) {
      warnings.push(`${item.dept.name} 缺少可独立主审人员，尚未排入日程。`);
      return;
    }
    while (remaining > 0) {
      const currentCursor = Math.max(...assignedIds.map((id) => cursors[id] ?? segments[0]?.absStart ?? 0));
      const segment = findSegmentAtOrAfter(segments, currentCursor);
      if (!segment) {
        warnings.push(`${item.dept.name} 未能全部排入审核日期`);
        break;
      }
      const start = normalizeCursorToSegment(segment, currentCursor);
      const remainingInSegment = segment.absEnd - start;
      const chunk = Math.min(remaining, remainingInSegment);
      const end = start + chunk;
      rows.push({
        kind: "department", departmentId: item.dept.id,
        date: segment.date,
        time: `${formatTime(start)}-${formatTime(end)}`,
        process: processText(item.dept.name, item.clauses),
        clauses: clauseText(item.clauses),
        auditorIds: assignedIds,
        auditors: getAuditorDisplay(assignedIds)
      });
      assignedIds.forEach((id) => {
        cursors[id] = end;
      });
      remaining -= chunk;
    }
  });

  const shiftHours = Number(document.getElementById("shift-hours").value || 0);
  const shift = getShiftAssignment();
  if (shift) rows.push({ kind: "shift", date: shift.date, time: `${formatTime(shift.start)}-${shift.start + shift.minutes === 1440 ? "24:00" : formatTime(shift.start + shift.minutes)}`, process: `${shift.dept.name}：非正常办公班次审核`, clauses: clauseText(clausesForDepartment(shift.dept)), auditorIds: shift.auditorIds, auditors: getAuditorDisplay(shift.auditorIds) });
  else if (shiftHours) warnings.push(`倒班审核 ${shiftHours}h 尚未排定，请确认日期及非办公班次开始时间（不少于1h，当前支持当日17:00后且在审核起止范围内）。`);
  if (!document.getElementById("start-date").value) warnings.push("审核开始日期待确认。");

  rows.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return parseTime(a.time.slice(0, 5)) - parseTime(b.time.slice(0, 5));
  });
  state.scheduleRows = rows;
  renderSchedule([...warnings, ...scheduleConflictWarnings(rows)]);
}

function renderSchedule(warnings = []) {
  document.querySelectorAll(".schedule-warning").forEach((item) => item.remove());
  const tbody = document.getElementById("schedule-body");
  tbody.innerHTML = "";
  state.scheduleRows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(row.date)}</td>
      <td>${renderMeetingTime(row)}</td>
      <td>${escapeHtml(row.process)}</td>
      <td>${escapeHtml(row.clauses)}</td>
      <td>${escapeHtml(row.auditors)}</td>
    `;
    tbody.appendChild(tr);
  });
  if (!state.scheduleRows.length) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="5" class="empty-state">暂无日程</td>`;
    tbody.appendChild(tr);
  }

  lucide.createIcons();
  const personHours = countedPersonHours(state.scheduleRows);
  const targetHours = Math.max(0.5, Number(document.getElementById("person-days").value || 1)) * 8;
  const summary = document.getElementById("hours-summary");
  if (Math.abs(personHours - targetHours) > 0.25) warnings.push(`已排 ${(personHours / 8).toFixed(2)} 人日，与目标 ${(targetHours / 8).toFixed(2)} 人日不一致，请调整人员或时间。`);
  summary.textContent = `${(personHours / 8).toFixed(2)} / ${(targetHours / 8).toFixed(2)} 人日`;
  summary.className = `tag ${warnings.length ? "warn" : "good"}`;

  if (warnings.length) {
    const issueList = document.getElementById("issues-list");
    warnings.forEach((warning) => {
      const li = document.createElement("li");
      li.className = "warn schedule-warning";
      li.textContent = warning;
      issueList.appendChild(li);
    });
    const check = document.getElementById("check-summary");
    if (!document.querySelector("#issues-list .bad")) { check.textContent = "日程待确认"; check.className = "tag warn"; }
  }
  updateWordDownloadState();
}

function preparePlanPreview() {
  renderDiagnostics();
  generateSchedule();
  const model = buildHaidePlanModel();
  window.currentHaidePlan = model;
  document.getElementById("preview-content").innerHTML = renderHaidePlan(model);
  updateWordDownloadState(model);
  syncPrintContent();
}

function syncPrintContent() {
  document.getElementById("print-content").innerHTML = document.getElementById("preview-content").innerHTML;
}

function openPlanPreview() {
  preparePlanPreview();
  const dialog = document.getElementById("plan-preview");
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("preview-open");
  document.getElementById("preview-scroll").scrollTop = 0;
  document.getElementById("preview-scroll").scrollLeft = 0;
}

function preparePlanPrint() {
  // Keep an open preview and its printed document identical, including warnings.
  if (document.getElementById("plan-preview").open) syncPrintContent();
  else preparePlanPreview();
}

function printPlan() {
  preparePlanPrint();
  window.print();
}

function normalizeNoticeText(text) {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/[：﹕]/g, ":")
    .replace(/\r/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

let pdfJsModulePromise = null;

async function loadPdfJs() {
  if (!pdfJsModulePromise) {
    const pdfJsUrl = new URL("vendor/pdfjs/pdf.min.mjs", window.location.href).href;
    const workerUrl = new URL("vendor/pdfjs/pdf.worker.min.mjs", window.location.href).href;
    pdfJsModulePromise = import(pdfJsUrl).then((module) => {
      module.GlobalWorkerOptions.workerSrc = workerUrl;
      return module;
    });
  }
  return pdfJsModulePromise;
}

async function extractPdfText(file) {
  const pdfjsLib = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  const assetBase = new URL("vendor/pdfjs/", window.location.href).href;
  const pdf = await pdfjsLib.getDocument({
    data,
    cMapUrl: `${assetBase}cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `${assetBase}standard_fonts/`
  }).promise;
  const pages = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const lines = [];
    let lastY = null;
    let currentLine = [];
    textContent.items.forEach((item) => {
      const y = Math.round(item.transform[5]);
      if (lastY !== null && Math.abs(y - lastY) > 4) {
        lines.push(currentLine.join(" "));
        currentLine = [];
      }
      currentLine.push(item.str);
      lastY = y;
    });
    if (currentLine.length) lines.push(currentLine.join(" "));
    pages.push(lines.join("\n"));
  }
  return normalizeNoticeText(pages.join("\n\n"));
}

async function extractNoticeText(file) {
  const lowerName = file.name.toLowerCase();
  if (lowerName.endsWith(".pdf") || file.type === "application/pdf") {
    return extractPdfText(file);
  }
  if (lowerName.endsWith(".txt")) {
    return normalizeNoticeText(await file.text());
  }
  return "";
}

function readUint16(view, offset) {
  return view.getUint16(offset, true);
}

function readUint32(view, offset) {
  return view.getUint32(offset, true);
}

async function inflateZipBytes(bytes) {
  if (typeof DecompressionStream === "undefined") {
    throw new Error("当前浏览器不支持直接解析 Excel 压缩包，请先使用最新版 Chrome/Edge。");
  }
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function findEndOfCentralDirectory(view) {
  const minOffset = Math.max(0, view.byteLength - 22 - 65535);
  for (let offset = view.byteLength - 22; offset >= minOffset; offset -= 1) {
    if (readUint32(view, offset) === 0x06054b50) {
      return {
        entryCount: readUint16(view, offset + 10),
        centralDirectoryOffset: readUint32(view, offset + 16)
      };
    }
  }
  throw new Error("未找到 Excel 文件目录，文件可能损坏或不是 .xlsx 格式。");
}

async function unzipXlsx(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  const decoder = new TextDecoder("utf-8");
  const { entryCount, centralDirectoryOffset } = findEndOfCentralDirectory(view);
  const entries = new Map();
  let offset = centralDirectoryOffset;

  for (let index = 0; index < entryCount; index += 1) {
    if (readUint32(view, offset) !== 0x02014b50) {
      throw new Error("Excel 文件目录结构异常。");
    }
    const compressionMethod = readUint16(view, offset + 10);
    const compressedSize = readUint32(view, offset + 20);
    const fileNameLength = readUint16(view, offset + 28);
    const extraLength = readUint16(view, offset + 30);
    const commentLength = readUint16(view, offset + 32);
    const localHeaderOffset = readUint32(view, offset + 42);
    const fileNameBytes = new Uint8Array(arrayBuffer, offset + 46, fileNameLength);
    const fileName = decoder.decode(fileNameBytes).replace(/\\/g, "/");

    if (readUint32(view, localHeaderOffset) !== 0x04034b50) {
      throw new Error(`Excel 文件 ${fileName} 的本地头结构异常。`);
    }
    const localFileNameLength = readUint16(view, localHeaderOffset + 26);
    const localExtraLength = readUint16(view, localHeaderOffset + 28);
    const dataOffset = localHeaderOffset + 30 + localFileNameLength + localExtraLength;
    const compressedBytes = new Uint8Array(arrayBuffer.slice(dataOffset, dataOffset + compressedSize));
    let dataBytes;
    if (compressionMethod === 0) {
      dataBytes = compressedBytes;
    } else if (compressionMethod === 8) {
      dataBytes = await inflateZipBytes(compressedBytes);
    } else {
      throw new Error(`暂不支持 Excel 压缩方式 ${compressionMethod}。`);
    }
    entries.set(fileName, decoder.decode(dataBytes));
    offset += 46 + fileNameLength + extraLength + commentLength;
  }
  return entries;
}

function parseXml(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, "application/xml");
  const parserError = doc.getElementsByTagName("parsererror")[0];
  if (parserError) throw new Error("Excel XML 解析失败。");
  return doc;
}

function elementsByLocalName(root, localName) {
  return [...root.getElementsByTagName("*")].filter((element) => element.localName === localName);
}

function parseSharedStrings(xmlText) {
  if (!xmlText) return [];
  return elementsByLocalName(parseXml(xmlText), "si").map((item) =>
    elementsByLocalName(item, "t").map((textNode) => textNode.textContent || "").join("")
  );
}

function columnNameToIndex(cellRef) {
  const letters = (cellRef.match(/[A-Z]+/) || [""])[0];
  return [...letters].reduce((sum, letter) => sum * 26 + letter.charCodeAt(0) - 64, 0) - 1;
}

function rowNumberFromCellRef(cellRef) {
  return Number((cellRef.match(/\d+/) || ["0"])[0]) - 1;
}

function parseSheetRows(xmlText, sharedStrings, validateFormulas = false) {
  const rows = [];
  const doc = parseXml(xmlText);
  elementsByLocalName(doc, "c").forEach((cell) => {
    const ref = cell.getAttribute("r") || "";
    const rowIndex = rowNumberFromCellRef(ref);
    const colIndex = columnNameToIndex(ref);
    if (rowIndex < 0 || colIndex < 0) return;
    const type = cell.getAttribute("t");
    if (validateFormulas && (type === "e" || (type !== "str" && elementsByLocalName(cell, "f").length && !elementsByLocalName(cell, "v").length))) {
      throw new Error(`隐藏读取页 ${ref} 的公式结果缺失或出错，请在 Excel 中重新计算并保存后导入`);
    }
    const inlineText = elementsByLocalName(cell, "is")[0]?.textContent || "";
    const rawValue = elementsByLocalName(cell, "v")[0]?.textContent ?? inlineText;
    let value = rawValue;
    if (type === "s") {
      value = sharedStrings[Number(rawValue)] || "";
    } else if (type === "b") {
      value = rawValue === "1";
    } else if (!type && rawValue !== "") {
      const number = Number(rawValue);
      value = Number.isNaN(number) ? rawValue : number;
    }
    rows[rowIndex] ||= [];
    rows[rowIndex][colIndex] = value;
  });
  return rows.map((row) => row.map((value) => value ?? ""));
}

function normalizeTargetPath(target) {
  if (target.startsWith("/")) return target.replace(/^\/+/, "");
  return `xl/${target}`.replace(/\/[^/]+\/\.\.\//g, "/");
}

function getWorkbookSheets(entries) {
  const workbookXml = entries.get("xl/workbook.xml");
  const relsXml = entries.get("xl/_rels/workbook.xml.rels");
  if (!workbookXml || !relsXml) throw new Error("未找到 Excel 工作簿结构。");

  const rels = new Map();
  elementsByLocalName(parseXml(relsXml), "Relationship").forEach((rel) => {
    rels.set(rel.getAttribute("Id"), normalizeTargetPath(rel.getAttribute("Target") || ""));
  });

  return elementsByLocalName(parseXml(workbookXml), "sheet").map((sheet) => {
    const relId = sheet.getAttribute("r:id") || sheet.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id");
    return {
      name: sheet.getAttribute("name"),
      path: rels.get(relId)
    };
  });
}

function excelSerialToIso(value) {
  if (typeof value === "string") {
    const parsedNumber = Number(value);
    if (!Number.isNaN(parsedNumber)) return excelSerialToIso(parsedNumber);
    return extractDateValue(value) || value;
  }
  if (typeof value !== "number" || value < 30000 || value > 60000) return "";
  const epoch = Date.UTC(1899, 11, 30);
  const date = new Date(epoch + Math.round(value) * 86400000);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function valueToString(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function yesNoToBoolean(value) {
  return /^(是|true|yes|y|1)$/i.test(valueToString(value));
}

function splitList(value) {
  return valueToString(value)
    .split(/[、,，;；]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function rowsToObjects(rows) {
  const headers = rows[0]?.map(valueToString) || [];
  return rows.slice(1)
    .filter((row) => row.some((value) => valueToString(value)))
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
}

function parseProjectRows(rows) {
  const project = {};
  rowsToObjects(rows).forEach((row) => {
    const key = valueToString(row["字段代码"]);
    if (!key) return;
    const value = row["字段值"] ?? row["值"];
    project[key] = /_date$/.test(key) ? excelSerialToIso(value) : value;
  });
  return project;
}

function findSectionRows(rows, sectionName) {
  const sectionIndex = rows.findIndex((row) => valueToString(row?.[0]) === sectionName);
  if (sectionIndex < 0) return [];
  const sectionNames = new Set(["PROJECT", "DEPARTMENTS", "AUDITORS", "PROCESS_RULES", "IMPORT_NOTES", "PLAN_DETAILS", "AUDITOR_DETAILS", "PROCESS_DETAILS"]);
  let endIndex = rows.length;
  for (let index = sectionIndex + 2; index < rows.length; index += 1) {
    if (sectionNames.has(valueToString(rows[index]?.[0]))) {
      endIndex = index;
      break;
    }
  }
  return rows.slice(sectionIndex + 1, endIndex).filter((row) => row.some((value) => valueToString(value)));
}

function expandClauseId(clauseId, system = "QMS") {
  const normalized = valueToString(clauseId);
  if (!normalized) return [];
  const qualified = normalized.includes(":") ? normalized : `${system}:${normalized}`;
  if (getClause(qualified)) return [qualified];
  const prefix = `${qualified}.`;
  const children = clauseLibrary
    .map((clause) => clause.id)
    .filter((id) => id.startsWith(prefix));
  if (children.length) return children;
  const parent = clauseLibrary.filter((clause) => qualified.startsWith(`${clause.id}.`)).sort((a, b) => b.id.length - a.id.length)[0];
  return parent ? [parent.id] : [];
}

function splitClauseList(value, system = "QMS") {
  return splitList(value)
    .flatMap((id) => expandClauseId(id, system))
    .filter(Boolean);
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean))];
}

function parseMachineReadSheet(rows) {
  const project = parseProjectRows(findSectionRows(rows, "PROJECT"));
  const details = parseProjectRows(findSectionRows(rows, "PLAN_DETAILS"));
  Object.assign(project, Object.fromEntries(Object.entries(details).filter(([, value]) => valueToString(value))));
  if (details.criteria_e) project.ems_version = /2015/.test(details.criteria_e) ? "2015" : /2026/.test(details.criteria_e) ? "2026" : project.ems_version;
  const auditorDetails = new Map(rowsToObjects(findSectionRows(rows, "AUDITOR_DETAILS")).map((row) => [valueToString(row["审核员ID"]), row]));
  const processDetails = new Map(rowsToObjects(findSectionRows(rows, "PROCESS_DETAILS")).map((row) => [valueToString(row["部门ID"]), row]));
  if (project.audit_type && !project.stage2_audit_type) {
    project.stage2_audit_type = project.audit_type;
  }

  const processRules = new Map(rowsToObjects(findSectionRows(rows, "PROCESS_RULES")).map((row) => {
    const processId = valueToString(row["过程ID"]);
    return [processId, row];
  }));
  const departments = rowsToObjects(findSectionRows(rows, "DEPARTMENTS"))
    .filter((row) => !/^否$/i.test(valueToString(row["是否纳入计划"])))
    .map((row) => {
    const id = valueToString(row["部门ID"]);
    const rule = processRules.get(id) || {};
    const actualName = valueToString(row["实际部门名称"]);
    return {
      id,
      name: actualName || valueToString(row["显示部门名称"]),
      actualName,
      category: valueToString(row["专业触发规则"]),
      manager: valueToString(processDetails.get(id)?.["负责人"]),
      site: valueToString(processDetails.get(id)?.["审核场所"]),
      processNotes: valueToString(processDetails.get(id)?.["过程补充说明"]),
      process: valueToString(row["过程类型"]),
      auditorIds: splitList(row["建议审核员ID"]),
      clauseIds: [],
      rule
    };
  }).filter((dept) => dept.id && dept.name);

  const auditors = rowsToObjects(findSectionRows(rows, "AUDITORS")).map((row) => ({
    id: valueToString(row["审核员ID"]),
    code: valueToString(row["审核员ID"]),
    name: valueToString(row["姓名"]),
    role: /专家/.test(valueToString(row["级别"])) ? "技术专家" : yesNoToBoolean(row["是否实习"]) ? "实习" : valueToString(row["组内身份"]) || "组员",
    professional: yesNoToBoolean(row["是否具备本项目专业能力"]),
    status: yesNoToBoolean(row["是否实习"]) ? "实习" : valueToString(row["级别"]),
    independent: yesNoToBoolean(row["默认可独立主审"]),
    registration: valueToString(auditorDetails.get(valueToString(row["审核员ID"]))?.["注册证书号"]),
    employer: valueToString(auditorDetails.get(valueToString(row["审核员ID"]))?.["工作单位"]),
    fullTime: valueToString(auditorDetails.get(valueToString(row["审核员ID"]))?.["是否专职"]),
    phone: valueToString(auditorDetails.get(valueToString(row["审核员ID"]))?.["联系电话"]),
    professionalCodes: Object.fromEntries(["QMS", "EMS", "OHSMS"].map((system) => [system, valueToString(row[`${system}专业小类`])]))
  })).filter((auditor) => auditor.id && auditor.name);

  return { project, departments, auditors, mappings: [], sourceType: "machine_read_sheet" };
}

async function parseAuditPlanWorkbook(file) {
  if (!file.name.toLowerCase().endsWith(".xlsx")) {
    throw new Error("当前导入表解析器暂支持 .xlsx 格式。");
  }

  const entries = await unzipXlsx(await file.arrayBuffer());
  const sharedStrings = parseSharedStrings(entries.get("xl/sharedStrings.xml"));
  const sheetRows = {};
  getWorkbookSheets(entries).forEach((sheet) => {
    const xml = entries.get(sheet.path);
    if (xml) sheetRows[sheet.name] = parseSheetRows(xml, sharedStrings, sheet.name === "Sheet2_小程序读取");
  });

  if (sheetRows["Sheet2_小程序读取"]) {
    const plan = parseMachineReadSheet(sheetRows["Sheet2_小程序读取"]);
    plan.systemEvidence = systemEvidenceFromSheet(sheetRows.Sheet1);
    return plan;
  }

  const project = parseProjectRows(sheetRows["01_项目信息"] || []);
  const departments = rowsToObjects(sheetRows["02_部门过程"] || []).map((row) => ({
    id: valueToString(row["部门ID"]),
    name: valueToString(row["部门/过程名称"]),
    category: valueToString(row["部门类别"]),
    manager: valueToString(row["负责人"]),
    process: valueToString(row["主责过程"]),
    auditorIds: splitList(row["建议主审"]),
    clauseIds: splitList(row["建议条款"])
  })).filter((dept) => dept.id && dept.name);

  const auditors = rowsToObjects(sheetRows["03_审核组"] || []).map((row) => ({
    id: valueToString(row["审核员ID"]),
    code: valueToString(row["审核员ID"]),
    name: valueToString(row["姓名"]),
    role: valueToString(row["组内身份"]) || "组员",
    professional: yesNoToBoolean(row["是否具备本项目专业能力"]),
    status: valueToString(row["状态"])
  })).filter((auditor) => auditor.id && auditor.name);

  const mappings = rowsToObjects(sheetRows["04_条款映射"] || []).map((row) => ({
    clauseId: valueToString(row["条款号"]),
    deptId: valueToString(row["建议部门ID"])
  })).filter((item) => item.clauseId && item.deptId);

  return { project, departments, auditors, mappings };
}

function detectPhaseFromText(text, fileName) {
  const source = `${fileName}\n${text}`;
  if (/一阶段|第一阶段|1阶段|stage[\s_-]*1/i.test(source)) return "stage1";
  if (/二阶段|第二阶段|2阶段|stage[\s_-]*2/i.test(source)) return "stage2";
  return "";
}

function extractCompanyName(text, fileName) {
  const labeledPatterns = [
    /(?:受审核方|受审核组织|客户名称|组织名称|企业名称|申请组织|认证客户)\s*[:：]?\s*([^\n]{2,80})/,
    /(?:单位名称)\s*[:：]?\s*([^\n]{2,80})/
  ];
  for (const pattern of labeledPatterns) {
    const match = text.match(pattern);
    if (match) {
      const candidate = cleanupField(match[1]);
      const company = candidate.match(/([\u4e00-\u9fa5A-Za-z0-9（）()·-]{2,}(?:有限公司|股份公司|集团|公司|工厂|厂))/)?.[1];
      if (company) return company;
      if (candidate.length >= 4 && candidate.length <= 60) return candidate;
    }
  }

  const textCompany = text.match(/([\u4e00-\u9fa5A-Za-z0-9（）()·-]{2,}(?:有限公司|股份公司|集团|公司|工厂|厂))/)?.[1];
  if (textCompany) return textCompany;

  const baseName = fileName.replace(/\.[^.]+$/, "");
  return baseName
    .split(/[\s_-]+/)
    .reverse()
    .find((part) => /(有限公司|股份公司|集团|公司|工厂|厂)$/.test(part)) || "";
}

function cleanupField(value) {
  return value
    .replace(/[|｜].*$/, "")
    .replace(/\s{2,}.*/, "")
    .replace(/(合同编号|认证领域|审核类型|注册地址|实际地址).*$/, "")
    .replace(/[，,；;。]+$/, "")
    .trim();
}

function extractDateValue(value) {
  const normalized = value.replace(/[./]/g, "-");
  const iso = normalized.match(/(20\d{2})-(\d{1,2})-(\d{1,2})/);
  if (iso) {
    return `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
  }
  const zh = value.match(/(20\d{2})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (zh) {
    return `${zh[1]}-${zh[2].padStart(2, "0")}-${zh[3].padStart(2, "0")}`;
  }
  return "";
}

function parseNoticeText(text, fileName) {
  const normalized = normalizeNoticeText(text);
  const parsed = {
    phaseId: detectPhaseFromText(normalized, fileName),
    company: extractCompanyName(normalized, fileName),
    systems: [],
    startDate: "",
    auditDays: "",
    personDays: "",
    scope: "",
    auditors: [],
    rawTextLength: normalized.length
  };

  if (/(?:\bQ\b|QMS|质量管理体系|ISO\s*9001|GB\/T\s*19001)/i.test(normalized)) parsed.systems.push("Q");
  if (/(?:\bE\b|EMS|环境管理体系|ISO\s*14001|GB\/T\s*24001)/i.test(normalized)) parsed.systems.push("E");
  if (/(?:\bS\b|OHSMS|职业健康安全管理体系|ISO\s*45001|GB\/T\s*45001)/i.test(normalized)) parsed.systems.push("S");
  if (!parsed.systems.length) parsed.systems.push("Q");

  const dateContext = normalized.match(/(?:审核日期|审核时间|现场审核日期|审核安排|审核实施时间)\s*[:：]?\s*([^\n]{0,120})/);
  parsed.startDate = extractDateValue(dateContext?.[1] || normalized);

  const daysMatch = normalized.match(/(?:共|合计)\s*([0-9]+(?:\.[0-9]+)?)\s*天/) ||
    normalized.match(/审核天数\s*[:：]?\s*([0-9]+(?:\.[0-9]+)?)/);
  if (daysMatch) parsed.auditDays = String(Math.max(1, Math.round(Number(daysMatch[1]))));

  const personDaysMatch = normalized.match(/(?:总现场审核人日|审核人日|人日数|总人日)\s*[:：]?\s*([0-9]+(?:\.[0-9]+)?)/) ||
    normalized.match(/([0-9]+(?:\.[0-9]+)?)\s*人日/);
  if (personDaysMatch) parsed.personDays = Number(personDaysMatch[1]).toFixed(1);

  const scopeMatch = normalized.match(/(?:认证范围|审核范围)\s*[:：]?\s*([^\n]{6,160})/);
  if (scopeMatch) {
    parsed.scope = cleanupField(scopeMatch[1])
      .replace(/^Q\s*[:：]/i, "")
      .trim();
  }

  const auditorLines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /(组长|组员|审核员|技术专家|专家)/.test(line));
  parsed.auditors = auditorLines
    .map((line) => {
      const name = line.match(/[\u4e00-\u9fa5]{2,4}/)?.[0] || "";
      if (!name) return null;
      return {
        name,
        role: /组长/.test(line) ? "组长" : /专家|技术/.test(line) ? "技术专家" : "组员",
        professional: /专业|专家|技术/.test(line)
      };
    })
    .filter(Boolean)
    .slice(0, 5);

  return parsed;
}

function applyParsedNotice(parsed) {
  if (parsed.systems.length) state.systems = normalizeSystemCodes(parsed.systems);
  if (parsed.company) document.getElementById("company").value = parsed.company;
  if (parsed.startDate) document.getElementById("start-date").value = parsed.startDate;
  if (parsed.auditDays) document.getElementById("audit-days").value = parsed.auditDays;
  if (parsed.personDays) document.getElementById("person-days").value = parsed.personDays;
  if (parsed.scope) document.getElementById("scope").value = parsed.scope;

  if (parsed.auditors.length >= 2) {
    state.auditors = parsed.auditors.map((auditor, index) => ({
      id: String.fromCharCode(65 + index),
      code: String.fromCharCode(65 + index),
      name: auditor.name,
      role: auditor.role,
      professional: auditor.professional
    }));
  }
}

function buildAssignmentGroupsFromImport(plan) {
  const groups = Object.fromEntries(plan.departments.map((dept) => [dept.id, []]));
  plan.departments.forEach((dept) => { groups[dept.id] = dept.clauseIds.filter((id) => getClause(id)); });
  return groups;
}

function buildDepartmentsFromImport(plan) {
  const auditorIds = new Set(plan.auditors.map((auditor) => auditor.id));
  return plan.departments.map((dept) => ({
    ...dept,
    id: dept.id,
    name: dept.name,
    auditorIds: dept.auditorIds.filter((id) => auditorIds.has(id))
  }));
}

function inferProcess(dept) {
  const knownId = dept.id === "quality_tech" ? "quality" : dept.id;
  if (auditRules.processClauses[knownId]) return knownId;
  const text = `${dept.id} ${dept.process || ""} ${dept.category || ""} ${dept.name}`;
  if (/management|管理层|管代/.test(text)) return "management";
  if (/quality|质检|技术|检验/.test(text)) return "quality";
  if (/operation|生产|加工|服务实现/.test(text)) return "operation";
  if (/purchase|采购/.test(text)) return "purchase";
  if (/sales|销售|市场|客服/.test(text)) return "sales";
  if (/finance|财务/.test(text)) return "finance";
  if (/admin|行政|综合|人资/.test(text)) return "admin";
  return null;
}

function prepareImportedPlan(plan) {
  if (!valueToString(plan.project.company_name) || !plan.departments.length || !plan.auditors.length) {
    throw new Error("缺少企业、部门或审核组信息。请使用配套导入表，并在 Excel 中完成计算后保存为 .xlsx。");
  }
  plan.notes = [];
  const systems = resolvePlanSystems(plan);
  for (const prefix of ["stage1", "stage2"]) {
    const start = plan.project[`${prefix}_start_date`], end = plan.project[`${prefix}_end_date`];
    if (start && end && (!Number.isFinite(Date.parse(start)) || !Number.isFinite(Date.parse(end)) || end < start || (Date.parse(end) - Date.parse(start)) / 86400000 >= 60)) {
      throw new Error(`${prefix === "stage1" ? "一" : "二"}阶段审核起止日期无效`);
    }
  }
  const emsSource = valueToString(plan.project.ems_version || plan.project.standard_e);
  plan.emsVersion = /2015/.test(emsSource) ? "2015" : "2026";
  clauseLibrary = buildQesLibrary(qmsClauseLibrary, plan.emsVersion);
  if (systems.includes("EMS") && !emsSource) plan.notes.push("环境体系按已约定的 ISO 14001:2026 编排；可在项目信息中切换版本。");
  const has29 = yesNoToBoolean(plan.project.has_29_scope) || /(^|\D)29(?:\.|\b)/.test(valueToString(plan.project.industry_code || plan.project.scope_q));
  const merged = new Map();
  const seenIds = new Set();
  plan.departments.forEach((source) => {
    if (seenIds.has(source.id)) throw new Error(`部门ID重复：${source.id}`);
    seenIds.add(source.id);
    const process = inferProcess(source);
    const processKey = has29 && process === "sales" ? "sales29" : process;
    if (!processKey) plan.notes.push(`${source.name} 未匹配默认过程，需人工确认条款。`);
    const ids = [];
    systems.forEach((system) => {
      const rule = source.rule || {};
      const imported = has29 && process === "sales" && rule[`29大类${system}条款`] ? rule[`29大类${system}条款`] : rule[`${system}默认条款`];
      const legacy = system === "QMS" && !source.rule ? source.clauseIds.join(";") : "";
      let text = valueToString(imported || legacy || auditRules.processClauses[processKey]?.[system]);
      if (system === "EMS" && plan.emsVersion === "2026") {
        text = text.replace(/\b10\.3\b/g, "10.1");
        if (text.split(";").includes("6.1.4")) text += ";6.1.5";
        if (process === "management") text += ";6.3";
      }
      if (system === "QMS" && (process === "operation" || processKey === "sales29")) text += ";8.1";
      if (["EMS", "OHSMS"].includes(system) && ["quality", "sales29"].includes(processKey)) text += ";9.1.1";
      if (processKey === "sales29" && system === "QMS") text += ";8.2;9.1.2";
      splitList(text).forEach((number) => {
        const expanded = expandClauseId(number, system);
        if (!expanded.length) plan.notes.push(`${source.name}：未识别 ${system} ${number}，请核对。`);
        ids.push(...expanded);
      });
    });
    (plan.mappings || []).filter((item) => item.deptId === source.id).forEach((item) => ids.push(...expandClauseId(item.clauseId).filter(id => systems.includes(getClause(id)?.system))));
    const key = source.actualName || source.name;
    if (!merged.has(key)) merged.set(key, { ...source, clauseIds: [], processes: [], processLabels: [], auditorIds: [] });
    const dept = merged.get(key);
    dept.clauseIds = uniqueList([...dept.clauseIds, ...ids]);
    dept.processes = uniqueList([...dept.processes, processKey]);
    dept.processLabels = uniqueList([...dept.processLabels, source.process]);
    dept.auditorIds = uniqueList([...dept.auditorIds, ...source.auditorIds]);
    for (const field of ["manager", "site", "processNotes"]) dept[field] = uniqueList([dept[field], source[field]]).join("；");
  });
  plan.sourceDepartmentCount = plan.departments.length;
  plan.departments = [...merged.values()];
  const auditorIds = new Set();
  plan.auditors.forEach((auditor) => {
    if (auditorIds.has(auditor.id)) throw new Error(`审核员ID重复：${auditor.id}`);
    auditorIds.add(auditor.id);
    if (auditor.professionalCodes) {
      auditor.professionalSystems = systems.filter((system) => {
        const codes = auditor.professionalCodes[system] || "";
        const scope = valueToString(plan.project[{ QMS: "scope_q", EMS: "scope_e", OHSMS: "scope_s" }[system]]);
        const required = scope.match(/\b\d{2}(?:\.\d{2}){1,2}\b/g) || [];
        const held = codes.match(/\b\d{2}(?:\.\d{2}){1,2}\b/g) || [];
        return required.length ? required.every((code) => held.includes(code)) : Boolean(codes);
      });
    } else auditor.professionalSystems = auditor.professional ? systems.filter((system) => ["QMS", "EMS", "OHSMS"].includes(system)) : [];
    auditor.professional = auditor.professionalSystems.length > 0;
  });
  plan.notes = uniqueList(plan.notes);
  return plan;
}

function suggestAuditors() {
  const auditors = state.auditors.filter(isIndependentAuditor);
  const loads = Object.fromEntries(state.auditors.map((auditor) => [auditor.id, 0]));
  const expertLeads = new Map();
  state.departments.forEach((dept) => {
    const clauses = clausesForDepartment(dept);
    const required = uniqueList(clauses.filter((clause) => requiresProfessional(clause, dept)).map((clause) => clause.system));
    const candidates = [...auditors].sort((a, b) => {
      const score = (person) => required.filter((system) => professionalFor(person, system)).length * -100 +
        (dept.processes?.includes("management") && person.role === "组长" ? -25 : 0) +
        (!required.length && person.professional ? 10 : 0) + loads[person.id];
      return score(a) - score(b);
    });
    let selected = candidates.length ? [candidates[0].id] : [];
    required.forEach((system) => {
      if (selected.some((id) => professionalFor(getAuditor(id), system))) return;
      const support = state.auditors.filter((auditor) => professionalFor(auditor, system)).sort((a, b) => loads[a.id] - loads[b.id])[0];
      if (support) {
        if (support.role === "技术专家" && expertLeads.has(support.id) && !selected.some((id) => isIndependentAuditor(getAuditor(id)) && required.some((item) => professionalFor(getAuditor(id), item)))) {
          selected = uniqueList([expertLeads.get(support.id), ...selected.filter((id) => !isIndependentAuditor(getAuditor(id)))]);
        }
        selected.push(support.id);
        if (support.role === "技术专家" && selected[0]) expertLeads.set(support.id, selected[0]);
      }
    });
    dept.auditorIds = uniqueList(selected);
    dept.auditorIds.forEach((id) => { loads[id] += getDepartmentWorkload(dept).workload; });
  });
}

function applyImportedPlanToPreset(plan, phaseId, prefix) {
  const preset = phasePresets[phaseId];
  preset.departments = buildDepartmentsFromImport(plan);
  preset.assignmentGroups = buildAssignmentGroupsFromImport(plan);
  const start = plan.project[`${prefix}_start_date`], end = plan.project[`${prefix}_end_date`];
  const days = Number(plan.project[`${prefix}_days`]) || (start && end ? Math.round((Date.parse(end) - Date.parse(start)) / 86400000) + 1 : 0);
  const personDays = Number(plan.project[`${prefix}_person_days`]);
  if (days) preset.auditDays = days;
  if (personDays) preset.personDays = String(personDays);
  if (plan.project[`${prefix}_audit_type`]) preset.auditType = valueToString(plan.project[`${prefix}_audit_type`]);
}

function setStageFieldsFromImportedPlan(plan, phaseId) {
  const prefix = phaseId === "stage1" ? "stage1" : "stage2";
  const project = plan.project;
  if (project.team_mode) document.getElementById("team-mode").value = valueToString(project.team_mode);
  document.getElementById("start-date").value = valueToString(project[`${prefix}_start_date`] || project.stage2_start_date || "");
  document.getElementById("audit-start-time").value = importedTime(project[`${prefix}_start_time`]) || "08:30";
  document.getElementById("audit-end-time").value = importedTime(project[`${prefix}_end_time`]) || "17:00";
  document.getElementById("lunch-hours").value = parseFloat(project.lunch_hours) || 1;
  document.getElementById("shift-hours").value = phaseId === "stage2" ? parseFloat(project.shift_audit_hours) || 0 : 0;
  document.getElementById("shift-date").value = phaseId === "stage2" ? valueToString(project.shift_date) : "";
  document.getElementById("shift-start").value = phaseId === "stage2" ? importedTime(project.shift_start) : "";
  const start = project[`${prefix}_start_date`];
  const end = project[`${prefix}_end_date`];
  if (start && end) document.getElementById("audit-days").value = Math.round((Date.parse(end) - Date.parse(start)) / 86400000) + 1;
  if (project[`${prefix}_days`]) document.getElementById("audit-days").value = valueToString(project[`${prefix}_days`]);
  if (project[`${prefix}_person_days`]) {
    document.getElementById("person-days").value = String(Number(project[`${prefix}_person_days`]));
  } else {
    const meetings = buildMeetingPlan().meetings;
    const minutes = buildSegments(meetings).reduce((sum, segment) => sum + segment.absEnd - segment.absStart, 0);
    const auditorCount = state.auditors.filter(isIndependentAuditor).length;
    document.getElementById("person-days").value = ((minutes / 60 * auditorCount + countedPersonHours(meetings)) / 8).toFixed(2);
  }
  if (project[`${prefix}_audit_type`]) document.getElementById("audit-type").value = valueToString(project[`${prefix}_audit_type`]);
}

function applyImportedPlan(plan) {
  state.rawImportedPlan = structuredClone(plan);
  plan = prepareImportedPlan(plan);
  state.importedPlan = plan;
  state.emsVersion = plan.emsVersion;
  document.getElementById("ems-version").value = plan.emsVersion;
  state.systems = normalizeSystemCodes(plan.project.audit_systems);
  document.getElementById("company").value = valueToString(plan.project.company_name);
  document.getElementById("scope").value = state.systems.map((system) => {
    const suffix = { QMS: "q", EMS: "e", OHSMS: "s" }[system];
    const value = plan.project[`scope_text_${suffix}`] || plan.project[`scope_${suffix}`];
    return value ? `${systemCatalog[system]?.code}: ${value}` : "";
  }).filter(Boolean).join("\n");
  state.phaseDrafts = {};
  state.assignmentFindings = [];
  Object.assign(phasePresets, structuredClone(initialPhasePresets));
  if (plan.auditors.length) {
    state.auditors = plan.auditors.map((auditor, index) => ({
      ...auditor,
      id: auditor.id || String.fromCharCode(65 + index),
      code: auditor.code || auditor.id || String.fromCharCode(65 + index),
      name: auditor.name,
      role: auditor.role,
      professional: auditor.professional
    }));
  }
  if (plan.departments.length) {
    applyImportedPlanToPreset(plan, "stage1", "stage1");
    applyImportedPlanToPreset(plan, "stage2", "stage2");
  }
  applyPhasePreset(state.activePhase);
  setStageFieldsFromImportedPlan(plan, state.activePhase);
  suggestAuditors();
}

function buildWorkbookFindings(plan) {
  const findings = [];
  const systems = normalizeSystemCodes(plan.project.audit_systems)
    .map((system) => systemCatalog[system]?.code || system);
  if (plan.sourceType === "machine_read_sheet") {
    findings.push("已识别隐藏 Sheet2_小程序读取，并按小程序接口表解析。");
  }
  findings.push(`已读取导入表：${plan.departments.length} 个部门/过程、${plan.auditors.length} 名审核组成员、${systems.join("/") || "Q"} 体系。`);
  findings.push(...(plan.notes || []));
  if (plan.sourceDepartmentCount > plan.departments.length) findings.push(`同名部门已归集：${plan.sourceDepartmentCount} 个过程合并为 ${plan.departments.length} 个部门，部门内条款去重。`);
  const professionalCount = plan.auditors.filter((auditor) => auditor.professional).length;
  if (!professionalCount) {
    findings.push("导入表未确认专业审核员，核心专业条款会出现风险提示。");
  }
  if (!plan.project.stage2_person_days) findings.push("表内未提供批准的审核人日，当前按时段和可独立主审人数暂估，请在项目信息中确认。");
  if (!plan.project.stage1_start_date) findings.push("表内未提供一阶段日期，一阶段为待确认草案。");
  if (plan.auditors.some((auditor) => ["技术专家", "实习"].includes(auditor.role))) findings.push("技术专家安排共同审核；实习人员不独立主审，两者均不计入审核人日。");
  return findings;
}

function buildImportFindings(parsed, file) {
  const findings = [];
  const lowerName = file.name.toLowerCase();
  const isExcelFile = /\.(xls|xlsx)$/.test(lowerName);
  if (isExcelFile) {
    findings.push("已接收 Excel 参考文件；当前原型尚未接入表格解析器，下一步将读取企业信息、审核员填写、QES销售咨询等工作表生成计划。");
    return findings;
  }
  if (!parsed.rawTextLength && lowerName.endsWith(".pdf")) {
    findings.push("未读取到 PDF 文本层，可能是扫描件，需要 OCR 后才能自动识别。");
  }
  if (parsed.systems.length > 1) {
    findings.push(`参考文件包含 ${parsed.systems.join("/") } 体系；当前原型先按 QMS 单体系生成，E/S 将作为后续扩展。`);
  }
  if (!parsed.startDate) findings.push("未识别到审核开始日期，已保留默认日期。");
  if (!parsed.personDays) findings.push("未识别到审核人日，已使用阶段模板人日。");
  if (!parsed.scope) findings.push("未识别到认证/审核范围，已保留默认范围。");
  return findings;
}

function render() {
  renderPhaseSelector();
  renderSystemProfile();
  renderDepartments();
  renderAuditors();
  renderDiagnostics();
  renderProfessionalStrategy();
}

function setImportStatus(text, status) {
  const loading = status === "loading";
  const panel = document.getElementById("plan-file-dropzone");
  panel.setAttribute("aria-busy", String(loading));
  panel.dataset.status = status;
  const message = document.getElementById("import-status");
  message.hidden = false;
  message.textContent = text;
  document.getElementById("btn-import").disabled = loading;
  document.getElementById("notice-file").disabled = loading;
}

async function handleNoticeImport(event) {
  const file = event.target.files?.[0];
  if (!file || importingFile) return;
  importingFile = true;
  const backup = { state: structuredClone(state), presets: structuredClone(phasePresets), fields: Object.fromEntries([...phaseFieldIds, "company", "scope", "ems-version"].map((id) => [id, document.getElementById(id).value])) };
  state.importedFileName = file.name;
  const importButton = document.getElementById("btn-import");
  setImportStatus("解析中...", "loading");

  try {
    if (file.name.toLowerCase().endsWith(".xlsx")) {
      const plan = await parseAuditPlanWorkbook(file);
      applyImportedPlan(plan);
      state.importFindings = buildWorkbookFindings(state.importedPlan);
      setImportStatus("已加载表格", "success");
      render();
      generateSchedule();
      return;
    }

    const text = await extractNoticeText(file);
    const parsed = parseNoticeText(text, file.name);
    const phaseId = parsed.phaseId || state.activePhase;
    applyPhasePreset(phaseId);
    applyParsedNotice(parsed);
    state.importFindings = buildImportFindings(parsed, file);
    setImportStatus("已加载表格", "success");
    render();
    generateSchedule();
  } catch (error) {
    console.error(error);
    Object.assign(state, backup.state);
    Object.assign(phasePresets, backup.presets);
    clauseLibrary = buildQesLibrary(qmsClauseLibrary, state.emsVersion);
    Object.entries(backup.fields).forEach(([id, value]) => { document.getElementById(id).value = value; });
    state.importFindings = [`读取失败：${error.message || "无法解析该文件"}。已保留原计划。`, ...state.importFindings];
    setImportStatus("导入失败，原计划已保留", "error");
    render();
    generateSchedule();
  } finally {
    event.target.value = "";
    importingFile = false;
    importButton.disabled = false;
    document.getElementById("notice-file").disabled = false;
    document.getElementById("plan-file-dropzone").setAttribute("aria-busy", "false");
  }
}

document.querySelectorAll(".phase-card").forEach((card) => {
  card.addEventListener("click", () => setActivePhase(card.dataset.phaseId));
});
document.getElementById("btn-import").addEventListener("click", () => {
  document.getElementById("notice-file").click();
});
document.getElementById("notice-file").addEventListener("change", handleNoticeImport);
let importingFile = false;
document.addEventListener("dragover", (event) => {
  if (event.dataTransfer.types.includes("Files")) { event.preventDefault(); document.body.classList.add("file-drag-over"); }
});
document.addEventListener("dragleave", (event) => { if (!event.relatedTarget) document.body.classList.remove("file-drag-over"); });
document.addEventListener("drop", async (event) => {
  if (!event.dataTransfer.files.length) return;
  event.preventDefault();
  document.body.classList.remove("file-drag-over");
  await handleNoticeImport({ target: { files: [event.dataTransfer.files[0]], value: "" } });
});
makeDropArea(document.getElementById("unassigned-clauses"));
document.getElementById("btn-suggest").addEventListener("click", resetSuggestedAssignments);
document.getElementById("btn-schedule").addEventListener("click", generateSchedule);
document.getElementById("schedule-body").addEventListener("change", event => {
  const key = event.target.dataset.meetingKey;
  if (!key) return;
  if (event.target.value) state.meetingOverrides[key] = event.target.value;
  else delete state.meetingOverrides[key];
  generateSchedule();
});
document.getElementById("schedule-body").addEventListener("click", event => {
  const button = event.target.closest("[data-reset-meeting]");
  if (!button) return;
  delete state.meetingOverrides[button.dataset.resetMeeting];
  generateSchedule();
});
document.getElementById("btn-preview").addEventListener("click", openPlanPreview);
document.getElementById("btn-preview-close").addEventListener("click", () => document.getElementById("plan-preview").close());
document.getElementById("plan-preview").addEventListener("close", () => document.body.classList.remove("preview-open"));
document.getElementById("btn-print").addEventListener("click", printPlan);
document.getElementById("btn-preview-print").addEventListener("click", printPlan);
document.getElementById("btn-preview-word").addEventListener("click", downloadHaideWord);
document.getElementById("btn-download-word").addEventListener("click", downloadHaideWord);
window.addEventListener("beforeprint", preparePlanPrint);
document.getElementById("btn-add-dept").addEventListener("click", addDepartment);
document.getElementById("btn-add-auditor").addEventListener("click", addAuditor);
document.getElementById("new-dept-name").addEventListener("keydown", (event) => {
  if (event.key === "Enter") addDepartment();
});
["company", "scope", ...phaseFieldIds].forEach((id) => {
  document.getElementById(id).addEventListener("change", generateSchedule);
});

document.getElementById("ems-version").addEventListener("change", (event) => {
  const version = event.target.value;
  if (state.rawImportedPlan) {
    const plan = structuredClone(state.rawImportedPlan);
    plan.project.ems_version = version;
    applyImportedPlan(plan);
    state.importFindings = buildWorkbookFindings(state.importedPlan);
  } else {
    state.emsVersion = version;
    clauseLibrary = buildQesLibrary(qmsClauseLibrary, version);
    resetSuggestedAssignments();
  }
  render();
  generateSchedule();
});

lucide.createIcons();
resetSuggestedAssignments();
