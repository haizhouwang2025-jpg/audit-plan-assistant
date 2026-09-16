// Dispatch policy follows the agreed process matrix; it is not a standard's competence mandate.
const auditRules = {
  version: "QES-dispatch-1.1",
  sources: [
    "https://www.iso.org/standard/14001",
    "https://www.iso.org/obp/ui#iso:std:iso:14001:ed-4:v1:en"
  ],
  commonNumbers: new Set(["4.1", "4.2", "4.3", "4.4", "5.1", "5.2", "5.3", "6.2", "7.2", "7.3", "7.4", "7.5.1", "7.5.2", "7.5.3", "9.2", "9.3", "10.3"]),
  processClauses: {
    management: {
      QMS: "4.1;4.2;4.3;4.4;5.1;5.2;5.3;6.1;6.2;6.3;7.1.1;7.4;7.5.1;9.1.1;9.1.3;9.3;10.1;10.3",
      EMS: "4.1;4.2;4.3;4.4;5.1;5.2;5.3;6.1.1;6.2;7.1;7.4;7.5.1;9.1.1;9.3;10.1;10.3",
      OHSMS: "4.1;4.2;4.3;4.4;5.1;5.2;5.3;5.4;6.1.1;6.2;7.1;7.4;7.5.1;9.1.1;9.3;10.1;10.3"
    },
    operation: {
      QMS: "5.3;6.2;7.1.3;7.1.4;8.1;8.5.1;8.5.2;8.5.3;8.5.4;8.5.6",
      EMS: "5.3;6.1.2;6.2;7.1;8.1;8.2",
      OHSMS: "5.3;6.1.2;6.2;7.1;8.1.2;8.1.4;8.2"
    },
    quality: {
      QMS: "5.3;6.2;7.1.5;8.3;8.5.5;8.6;8.7;10.2",
      EMS: "5.3;6.1.2;6.1.3;6.1.4;6.2;8.1;9.1.1;9.1.2;10.2",
      OHSMS: "5.3;6.1.2;6.1.3;6.1.4;6.2;8.1.1;8.1.3;9.1.1;9.1.2;10.2"
    },
    admin: {
      QMS: "5.3;6.2;7.1.2;7.1.6;7.2;7.3;7.4;7.5.2;7.5.3;9.2",
      EMS: "5.3;6.1.2;6.2;7.2;7.3;7.4;7.5.2;7.5.3;8.1;8.2;9.2",
      OHSMS: "5.3;6.1.2;6.2;7.2;7.3;7.4;7.5.2;7.5.3;8.1.1;8.1.2;8.2;9.2"
    },
    sales: {
      QMS: "5.3;6.2;7.4;8.2;9.1.2",
      EMS: "5.3;6.1.2;6.2;7.4;8.1",
      OHSMS: "5.3;6.1.2;6.2;7.4;8.1.1;8.1.2"
    },
    purchase: {
      QMS: "5.3;6.2;7.4;8.4",
      EMS: "5.3;6.1.2;6.2;7.4;8.1",
      OHSMS: "5.3;6.1.2;6.2;7.4;8.1.1;8.1.2;8.1.4"
    },
    finance: {
      QMS: "5.3;6.2;7.4;7.5.2;7.5.3",
      EMS: "5.3;6.2;7.4;7.5.2;7.5.3",
      OHSMS: "5.3;6.2;7.4;7.5.2;7.5.3"
    },
    sales29: {
      QMS: "5.3;6.2;7.1.3;7.1.4;7.1.5;8.1;8.2;8.3;8.5.1;8.5.2;8.5.3;8.5.4;8.5.5;8.5.6;8.6;8.7;9.1.2;10.2",
      EMS: "5.3;6.1.2;6.1.3;6.1.4;6.2;7.1;8.1;8.2;9.1.1;9.1.2;10.2",
      OHSMS: "5.3;6.1.2;6.1.3;6.1.4;6.2;7.1;8.1;8.2;9.1.1;9.1.2;10.2"
    }
  },
  shared: [
    ["4.1", "组织环境", "management"], ["4.2", "相关方需求", "management"],
    ["4.3", "体系范围", "management"], ["4.4", "管理体系", "management"],
    ["5.1", "领导作用与承诺", "management"], ["5.2", "方针", "management"],
    ["5.3", "职责权限", "management"], ["6.1.1", "风险和机遇策划总则", "management"],
    ["6.2", "目标及实现策划", "management"], ["7.1", "资源", "management"],
    ["7.2", "能力", "admin"], ["7.3", "意识", "admin"], ["7.4", "沟通", "admin"],
    ["7.5.1", "成文信息总则", "management"], ["7.5.2", "创建和更新", "admin"],
    ["7.5.3", "成文信息控制", "admin"], ["9.2", "内部审核", "admin"]
  ],
  EMS: [
    ["6.1.2", "环境因素", "operation", "context"],
    ["6.1.3", "合规义务", "quality", "strict"],
    ["6.1.4", "风险和机遇", "quality", "strict"],
    ["6.1.5", "措施策划", "quality", "strict"],
    ["6.3", "变更策划", "management"],
    ["8.1", "运行策划和控制", "operation", "context"],
    ["8.2", "应急准备和响应", "operation", "context"],
    ["9.1.1", "环境绩效监视测量与评价", "quality", "context"],
    ["9.1.2", "合规性评价", "quality", "strict"],
    ["9.3.1", "管理评审总则", "management"],
    ["9.3.2", "管理评审输入", "management"],
    ["9.3.3", "管理评审结果", "management"],
    ["10.1", "持续改进", "management"],
    ["10.2", "不符合和纠正措施", "quality", "context"]
  ],
  OHSMS: [
    ["5.4", "工作人员协商和参与", "management"],
    ["6.1.2", "危险源及风险机遇评价", "operation", "context"],
    ["6.1.3", "法律法规和其他要求", "quality", "strict"],
    ["6.1.4", "措施策划", "quality", "strict"],
    ["8.1.1", "运行策划和控制总则", "quality", "context"],
    ["8.1.2", "消除危险源和降低风险", "operation", "context"],
    ["8.1.3", "变更管理", "quality", "strict"],
    ["8.1.4", "采购、承包商和外包", "operation", "context"],
    ["8.2", "应急准备和响应", "operation", "context"],
    ["9.1.1", "职业健康安全绩效评价", "quality", "context"],
    ["9.1.2", "合规性评价", "quality", "strict"],
    ["9.3", "管理评审", "management"], ["10.1", "改进总则", "management"],
    ["10.2", "事件、不符合和纠正措施", "quality", "context"],
    ["10.3", "持续改进", "management"]
  ]
};

function buildQesLibrary(qms, emsVersion = "2026") {
  const library = qms.map((clause) => ({ ...clause, number: clause.id, id: `QMS:${clause.id}`, system: "QMS" }));
  for (const system of ["EMS", "OHSMS"]) {
    let rows = [...auditRules.shared, ...auditRules[system]];
    if (system === "EMS" && emsVersion === "2015") {
      rows = rows.filter(([number]) => !["6.1.5", "6.3", "9.3.1", "9.3.2", "9.3.3"].includes(number))
        .map((row) => row[0] === "6.1.4" ? ["6.1.4", "措施策划", "quality", "strict"] : row[0] === "10.1" ? ["10.1", "改进总则", "management"] : row);
      rows.push(["9.3", "管理评审", "management"], ["10.3", "持续改进", "management"]);
    }
    rows.forEach(([number, title, defaultDept, policy]) => library.push({
      id: `${system}:${number}`, number, system, title, defaultDept, required: true,
      category: policy ? "professional" : "common", strictProfessional: policy === "strict",
      contextualProfessional: policy === "context", weight: policy ? 1.1 : 0.7
    }));
  }
  return library;
}
