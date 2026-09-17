const auditMeetingContent = {
  opening: "由审核组长组织召开，受审核方总经理、管理者代表、员工代表（OHSMS 适用）、职业健康安全监视人员（OHSMS 适用）以及各部门负责人出席并现场签到。审核组长介绍审核组成员、审核计划安排、所需资源及设施，作出审核公正性与保密承诺以及告知可能终止审核的条件等。",
  dailyInternal: "审核组组内沟通，梳理当日现场审核情况，研讨后续审核重点。",
  internal: "审核组内部汇总沟通，对现场收集的审核证据进行分析评价，研讨并确认各项审核发现。",
  management: "审核组与受审核方管理层就本次现场审核整体情况进行沟通，对各项审核发现予以确认；完成认证相关记录的签署、盖章确认工作。",
  closing: "由审核组长组织召开，参会人员现场签到。审核组长介绍审核计划的执行情况，确认认证范围，宣读不符合报告和观察项，明确不符合项整改回复要求，宣读管理体系总体评价及现场审核结论，重申审核公正性与保密承诺，告知申投诉联系方式等。"
};

const planProcessNames = {
  management: "体系管理过程", admin: "行政管理过程", sales: "销售客服过程",
  purchase: "采购管理过程", operation: "生产服务实现过程", quality: "质检技术管理过程",
  finance: "财务管理过程", sales29: "销售服务实现过程"
};

// These are output topics, not clause-equivalence or auditor-competence rules.
const sharedPlanTopics = {
  "4.1": ["context", "组织内外部环境的识别与评价"],
  "4.2": ["parties", "相关方及其需求和期望的确定"],
  "4.3": ["scope", "管理体系范围的确定"],
  "4.4": ["system", "管理体系及过程的识别、建立与运行"],
  "5.1": ["leadership", "领导作用与承诺的落实"],
  "5.2": ["policy", "管理方针的制定、传达与实施"],
  "5.3": ["responsibilities", "组织职责和权限的确定与落实"],
  "6.2": ["objectives", "管理目标及实现措施的策划与落实"],
  "6.3": ["change", "管理体系变更的策划与实施"],
  "7.2": ["competence", "人员能力要求的确定、培训及效果评价"],
  "7.3": ["awareness", "人员意识的建立与保持"],
  "7.4": ["communication", "内外部信息沟通的策划与实施"],
  "7.5.1": ["documents", "成文信息的确定"],
  "7.5.2": ["document-updates", "成文信息的创建与更新"],
  "7.5.3": ["document-control", "成文信息的控制"],
  "9.1.1": ["performance", "管理体系监视、测量、分析和评价及结果应用"],
  "9.2": ["internal-audit", "内部审核的策划、实施及跟踪"],
  "9.3": ["review", "管理评审的策划、实施、输入及结果落实"]
};

function planTopicForClause(clause, emsVersion) {
  const n = clause.number, system = clause.system;
  if (sharedPlanTopics[n]) return sharedPlanTopics[n];
  if (/^9\.3\./.test(n)) return sharedPlanTopics["9.3"];
  if ((system === "QMS" && n === "6.1") || (system !== "QMS" && n === "6.1.1") || (system === "EMS" && emsVersion === "2026" && n === "6.1.4")) return ["risk", "风险和机遇的识别及应对措施"];
  if ((system === "QMS" && n === "7.1.1") || (system !== "QMS" && n === "7.1")) return ["resources", "资源需求的确定与提供"];
  if (system === "QMS" && n === "9.1.3") return sharedPlanTopics["9.1.1"];
  if ((system !== "QMS" && n === "9.1.2")) return ["compliance-evaluation", "合规性评价及评价结果的处置"];
  if (n === "10.1" && !(system === "EMS" && emsVersion === "2026")) return ["improvement", "改进机会的确定与实施"];
  if (n === "10.3" || (system === "EMS" && emsVersion === "2026" && n === "10.1")) return ["continual-improvement", "持续改进的实施及效果评价"];
  if (n === "10.2") return ["corrective-action", "不符合的处置、原因分析、纠正措施及有效性评价"];
  if ((system === "OHSMS" && n === "8.1.1") || n === "8.1") return ["operational-control", "运行过程的策划与控制"];
  if (system !== "QMS" && n === "8.2") return ["emergency", "应急准备、演练与响应"];
  if (system === "EMS" && n === "6.1.3") return ["environmental-obligations", "环境合规义务的识别、获取与应用"];
  if (system === "OHSMS" && n === "6.1.3") return ["ohs-obligations", "职业健康安全法律法规和其他要求的识别、获取与应用"];
  if ((system === "EMS" && (n === "6.1.5" || (emsVersion === "2015" && n === "6.1.4"))) || (system === "OHSMS" && n === "6.1.4")) return ["action-planning", "应对措施的策划、落实及效果评价"];
  return [`${system}:${n}`, clause.title];
}

function buildPlanProcessText(dept, clauses, phase, emsVersion) {
  const topics = new Map();
  for (const clause of clauses) {
    const [key, text] = planTopicForClause(clause, emsVersion);
    if (!topics.has(key)) topics.set(key, text);
  }
  if (clauses.some(c => c.system === "OHSMS" && c.number === "10.2")) topics.set("corrective-action", "事件调查、不符合的处置、原因分析、纠正措施及有效性评价");
  const processes = [...new Set((dept.processes || [dept.id]).map(id => planProcessNames[id]).filter(Boolean))];
  const heading = (processes.length ? processes.join("、") : dept.name) + (phase === "stage1" ? "（文件、现场及二阶段准备度确认）" : "");
  return [
    `${heading}：`, `${[...topics.values()].join("；")}。`, `涉及部门：${dept.name}`,
    dept.manager ? `负责人：${dept.manager}` : "", dept.site ? `审核场所：${dept.site}` : "", dept.processNotes || ""
  ].filter(Boolean).join("\n");
}
