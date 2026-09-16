function buildHaidePlanModel() {
  const project = state.importedPlan?.project || {};
  const text = (key, fallback = "") => valueToString(project[key]) || fallback;
  const pending = (key, label) => text(key, `【待补充：${label}】`);
  const systems = state.systems.map((system) => ({ system, code: systemCatalog[system]?.code || system, suffix: { QMS: "q", EMS: "e", OHSMS: "s" }[system] }));
  const auditType = document.getElementById("audit-type").value;
  const phase = state.activePhase === "stage1" ? "一阶段" : "本次";
  const date = document.getElementById("start-date").value;
  const end = date ? addDays(date, scheduleWindow().days - 1) : "";
  const missing = [];
  for (const field of HAIDE_FIELDS.filter((f) => f.required && !["audit_systems", "stage2_audit_type", "stage2_person_days"].includes(f.key))) {
    if (!text(field.key)) missing.push(field.label);
  }
  for (const {code,suffix} of systems) {
    for (const [key,label] of [[`contract_${suffix}`,"合同编号"],[`criteria_${suffix}`,"审核准则"],[`scope_text_${suffix}`,"正式认证范围"]]) if (!text(key)) missing.push(`${code} ${label}`);
  }
  if (!text("address")) missing.push("经营地址");
  if (state.activePhase === "stage2" && !text("stage2_audit_type")) missing.push("本次审核类型");
  if (!text(state.activePhase === "stage1" ? "stage1_person_days" : "stage2_person_days")) missing.push(`${phase}批准审核人日`);
  if (state.activePhase === "stage1" && (!text("stage1_start_date") || !text("stage1_end_date"))) missing.push("一阶段审核起止日期");
  const selected = /第一阶段/.test(auditType) ? 0 : /第二阶段/.test(auditType) ? 1 : /监督|监审/.test(auditType) ? 2 : /再认证/.test(auditType) ? 3 : /专项/.test(auditType) ? 4 : /短通/.test(auditType) ? 5 : /补充/.test(auditType) ? 6 : /转换前/.test(auditType) ? 7 : -1;
  if (selected < 0 && !text("other_purpose")) missing.push("其他审核目的");
  const scopeLines = systems.map(({code,suffix}) => `${code}：${pending(`scope_text_${suffix}`,"正式认证范围")}`);
  const fields = {
    company: document.getElementById("company").value.trim() || "【待补充：受审核方】",
    contracts: systems.map(({code,suffix}) => `${code}：${pending(`contract_${suffix}`,"合同编号")}`).join("\n"),
    registered_address: pending("registered_address","注册地址"), address: pending("address","经营地址"),
    management_representative: text("management_representative"), representative_phone: text("representative_phone"),
    contact_name: pending("contact_name","联系人"), contact_phone: pending("contact_phone","联系电话"), contact_email: text("contact_email"),
    audit_types: state.activePhase === "stage1" ? systems.map(({code}) => `${code}：${auditType}`).join("\n") : text("audit_type_detail",systems.map(({code}) => `${code}：${auditType}`).join("\n")),
    other_type: `其他：\n${yesNoToBoolean(project.restore_suspended)?"☑":"□"}暂停恢复`,
    changes: pending("changes","变更事项"),
    criteria: `1）${systems.map(({code,suffix}) => `${code}：${pending(`criteria_${suffix}`,"标准及版本")}`).join("\n")}\n2）受审核方管理体系文件\n3）适用的国家、行业及地方有关的法律法规及标准${text("criteria_extra")?"\n4）"+text("criteria_extra"):""}`,
    scopes: document.getElementById("scope").value.trim() || scopeLines.join("\n"), mms: `MMS认证级别：${text("mms_level","□AAA；□AA；□A")}`,
    enms: `EnMS边界：${text("enms_boundary")}`,
    enp: `EnP核算边界：与EnMS边界${text("enp_boundary_relation")==="相同"?"☑":"□"}相同；${text("enp_boundary_relation")==="不同"?"☑":"□"}不同，其核算边界为：${text("enp_boundary")}`,
    coverage: `审核覆盖的时期：自${pending("coverage_start_date","覆盖起始日")}至${text("coverage_end_date",end || "【待确认：审核末日】")}止。需要时，可超期取证。`,
    method: `审核方式：${pending("audit_method","审核方式")}`,
    shift: `${Number(document.getElementById("shift-hours").value)>0?"☑":"□"}针对倒班作业：需要进行其他班次的审核。`,
    outsourcing: `${yesNoToBoolean(project.outsource_visit)?"☑":"□"}针对外包过程：需要到外包方的作业现场进行审核。${text("outsource_details")?"\n"+text("outsource_details"):""}`,
    person_days: `总现场审核人日：${document.getElementById("person-days").value} 人日`,
    dates: `审核日期：${date || "待确认"} ${document.getElementById("audit-start-time").value} 至 ${end || "待确认"} ${document.getElementById("audit-end-time").value}，共 ${scheduleWindow().days} 天`,
    other_purpose: text("other_purpose"),
    schedule_notes: [`每日午休 ${document.getElementById("lunch-hours").value} 小时。`,text("site_arrangements"),text("travel_arrangements")?`转场安排（不计入审核人日）：${text("travel_arrangements")}`:"",text("schedule_notes")].filter(Boolean).join("\n")
  };
  HAIDE_TEMPLATE.purposes.forEach((_,index) => { fields[`purpose_${index}`]=index===selected?"☑":"□"; });
  const auditors=state.auditors.map((a) => {
    if (!a.registration && !["技术专家","实习"].includes(a.role)) missing.push(`${a.name} 注册证书号`);
    if (!a.phone) missing.push(`${a.name} 联系电话`);
    return {code:a.code || a.id,name:a.name,role:getAuditorRoleText(a),registration:a.registration || "",professional_codes:systems.map(({system,code})=>a.professionalCodes?.[system]?`${code}：${a.professionalCodes[system]}`:"").filter(Boolean).join("\n"),employer:a.employer || "",full_time:a.fullTime || "",phone:a.phone || ""};
  });
  const warnings=[...document.querySelectorAll("#issues-list .bad, #issues-list .warn")].map((x)=>x.textContent);
  if (missing.length) warnings.unshift(`正式计划信息待补充：${uniqueList(missing).join("、")}。`);
  const coverageEnd=text("coverage_end_date",end);
  for (const key of ["coverage_start_date", "coverage_end_date"]) {
    const value=text(key), timestamp=Date.parse(value);
    if (value && (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0,10)!==value)) warnings.push(`${key==="coverage_start_date"?"审核覆盖起始日":"审核覆盖截止日"}不是有效日期。`);
  }
  const approved=Number(project[state.activePhase==="stage1"?"stage1_person_days":"stage2_person_days"]);
  if (!Number.isFinite(approved) || approved<=0) warnings.push("批准审核人日必须是大于零的数值。");
  if (text("coverage_start_date") && coverageEnd && text("coverage_start_date")>coverageEnd) warnings.push("审核覆盖起始日期晚于截止日期，请更正后再确认计划。");
  if (coverageEnd && end && coverageEnd>end) warnings.push("审核覆盖截止日期晚于本次审核结束日，请核对。");
  if (text("site_arrangements") || text("travel_arrangements") || yesNoToBoolean(project.outsource_visit)) warnings.push("多场所、外包或转场安排需组长核对实际日程；当前自动排程尚未扣除转场占用时段，不能将路途时间计为审核时间。");
  const rows=state.scheduleRows.map((r)=>({date:r.date.split("-").map(Number).join("."),time:r.time.replace(/(^|-)0/g,"$1"),content:[r.process,r.clauses].filter(Boolean).join("\n"),auditors:(r.auditorIds || []).map(id=>getAuditor(id)?.code || id).join("、")}));
  return {fields,auditors,rows,warnings:uniqueList(warnings)};
}

const haideInstructions=[
  "首/末次会议由审核组长主持，受审核方最高管理者（或授权其他高级管理层成员）、相关职能过程负责人须参加会议。",
  "审核过程中请为每个审核小组配备一名陪同人员，其职责主要是审核的见证、联络、向导。",
  "对审核过程中接触到的一切有关受审核方的信息，审核组全体成员承诺有责任保守秘密，未经本机构和受审核方书面许可不向第三方泄露。",
  "通过微信/QQ等方式传输的电子版文件和记录，以及采用截屏、影音录制等方式保存的审核信息，除需作为审核证据外，审核组成员在审核结束后全部删除。"
];
function renderHaidePlan(model) {
  const {fields:f,auditors,rows,warnings}=model;
  const e=escapeHtml, v=(key)=>e(f[key]);
  const pair=(label,key)=>`<tr><th>${label}</th><td colspan="5">${v(key)}</td></tr>`;
  return `<article class="haide-document">
    <header class="haide-letterhead"><img src="${HAIDE_TEMPLATE.logo}" alt="海德认证"><span>文件编号：OP-01-05-H/8</span></header>
    <p class="haide-company">北京海德国际认证有限公司</p><h1>管理体系认证审核实施计划</h1>
    ${warnings.length?`<aside class="haide-check"><h2>待确认事项</h2><ul>${warnings.map(w=>`<li>${e(w)}</li>`).join("")}</ul></aside>`:""}
    <h2>1.受审核方基本信息</h2><table class="haide-table haide-basic"><tbody>
    ${pair("受审核方名称","company")}${pair("合同编号","contracts")}${pair("注册地址","registered_address")}${pair("经营地址","address")}
    <tr><th>管理者代表/职务</th><td>${v("management_representative")}</td><th>电话</th><td colspan="3">${v("representative_phone")}</td></tr>
    <tr><th>联系人/职务</th><td>${v("contact_name")}</td><th>电话</th><td>${v("contact_phone")}</td><th>邮箱</th><td>${v("contact_email")}</td></tr></tbody></table>
    <h2>2.审核实施计划</h2><table class="haide-table haide-details"><tbody>
    <tr><th>认证领域和<br>审核类型</th><td colspan="2">${v("audit_types")}</td><td>${v("other_type")}</td></tr>
    <tr><th>变更事项</th><td colspan="3">${v("changes")}</td></tr>
    <tr><th>审核准则</th><td colspan="3">${v("criteria")}</td></tr>
    <tr><th>审核目的</th><td colspan="3">${HAIDE_TEMPLATE.purposes.map((p,i)=>`<p>${v(`purpose_${i}`)} ${e(p)}</p>`).join("")}<p>其他：${v("other_purpose")}</p></td></tr>
    <tr><th rowspan="6">审核范围</th><th>产品/服务及活动</th><td colspan="2">${v("scopes")}</td></tr>
    <tr><th>对于MMS</th><td colspan="2">${v("mms")}</td></tr>
    <tr><th rowspan="2">对于EnMS</th><td colspan="2">${v("enms")}</td></tr><tr><td colspan="2">${v("enp")}</td></tr>
    <tr><td colspan="3">审核的部门和场所及审核日程安排，具体附后。</td></tr><tr><td colspan="3">${v("coverage")}</td></tr>
    <tr><th rowspan="3">审核活动策划</th><td colspan="3">${v("method")}</td></tr><tr><td colspan="3">${v("shift")}</td></tr><tr><td colspan="3">${v("outsourcing")}</td></tr>
    <tr><th rowspan="2">审核时间</th><td colspan="3">${v("person_days")}</td></tr><tr><td colspan="3">${v("dates")}</td></tr></tbody></table>
    <h2>3.审核组长、审核组成员及与审核组同行的人员</h2>
    <table class="haide-table haide-team"><thead><tr>${["代码","姓名","组内身份","注册证书号","专业代码","工作单位","是否专职","联系电话"].map(t=>`<th>${t}</th>`).join("")}</tr></thead><tbody>${auditors.map(a=>`<tr>${["code","name","role","registration","professional_codes","employer","full_time","phone"].map(k=>`<td>${e(a[k])}</td>`).join("")}</tr>`).join("")}</tbody></table>
    <h2>4.其他说明</h2><table class="haide-table"><tbody><tr><td>${haideInstructions.map((t,i)=>`<p>${i+1}）${e(t)}</p>`).join("")}</td></tr><tr><td class="haide-sign">审核组长（签名）：　　　　　　　　　日期：</td></tr></tbody></table>
    <h2>5.受审核方确认意见</h2><table class="haide-table"><tbody><tr><td>同意本计划的安排，我单位可以按此计划安排工作，配合现场审核。</td></tr><tr><td class="haide-sign">授权代表（签名）：　　　　　　　　　日期（盖章）：</td></tr></tbody></table>
    <h2 class="haide-schedule-title">审 核 日 程 安 排</h2><table class="haide-table haide-schedule"><thead><tr><th>日期</th><th>时间</th><th>审核内容<br><small>（以部门/场所或主要活动/过程为主线，标明涉及的标准条款等）</small></th><th>审核人员</th></tr></thead><tbody>${rows.length?rows.map(r=>`<tr><td>${e(r.date)}</td><td>${e(r.time)}</td><td>${e(r.content)}</td><td>${e(r.auditors)}</td></tr>`).join(""):'<tr><td colspan="4">暂无日程</td></tr>'}</tbody></table>
    <p class="haide-notes">说明：1）对多场所路途时间须做出安排，且不计入审核时间；2）遵循“时段优先、岗位优先”原则，合理策划倒班作业审核时间。\n${v("schedule_notes")}</p>
    <footer class="haide-footer">实施日期：2026-3-1</footer></article>`;
}

async function createHaideWord(model) {
  const zip=await JSZip.loadAsync(HAIDE_TEMPLATE.base64,{base64:true});
  const xml=parseXml(await zip.file("word/document.xml").async("string"));
  const w="http://schemas.openxmlformats.org/wordprocessingml/2006/main";
  function fill(root,values){
    for(const t of [...root.getElementsByTagNameNS(w,"t")]) {
      const original=t.textContent;
      const replaced=original.replace(/\{\{([\w.]+)\}\}/g,(token,key)=>key in values?String(values[key]):token);
      if(replaced===original) continue;
      const lines=replaced.split("\n");
      t.textContent=lines.shift(); t.setAttribute("xml:space","preserve");
      let previous=t;
      for(const line of lines){
        const br=xml.createElementNS(w,"w:br"), text=xml.createElementNS(w,"w:t"); text.textContent=line; text.setAttribute("xml:space","preserve");
        previous.after(br,text); previous=text;
      }
    }
  }
  for(const [prefix,records] of [["auditor",model.auditors],["schedule",model.rows]]) {
    const template=[...xml.getElementsByTagNameNS(w,"tr")].find(tr=>tr.textContent.includes(`{{${prefix}.`));
    if(!template) throw new Error("标准模板缺少重复行");
    for(const record of records){ const row=template.cloneNode(true); fill(row,Object.fromEntries(Object.entries(record).map(([key,value])=>[`${prefix}.${key}`,value]))); template.before(row); }
    template.remove();
  }
  fill(xml,model.fields);
  const result=new XMLSerializer().serializeToString(xml);
  if(/\{\{[\w.]+\}\}/.test(result)) throw new Error("标准模板仍有未填充字段，请核对模板版本");
  zip.file("word/document.xml",result);
  return zip.generateAsync({type:"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",compression:"DEFLATE"});
}

async function downloadHaideWord() {
  const button=document.getElementById("btn-preview-word");
  const model=window.currentHaidePlan;
  if(!model || model.warnings.length) return;
  button.disabled=true;
  try {
    const blob=await createHaideWord(model), url=URL.createObjectURL(blob), a=document.createElement("a");
    a.href=url; a.download=`${model.fields.company.replace(/[<>:"/\\|?*]/g,"_")}_审核实施计划.docx`; a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  } catch(error) { window.alert(`导出失败：${error.message}`); }
  finally { button.disabled=false; }
}
