const AGENCY_PROFILES = {
  haide: {name:'北京海德国际认证有限公司',shortName:'海德',templateId:'OP-01-05-H/8',version:'haide-h8',systems:['QMS','EMS','OHSMS']},
  nsi: {name:'中标联合（北京）认证有限公司',shortName:'中标联合',templateId:'NSI/CX-01-04',version:'nsi-01-04-v2',systems:['QMS','EMS','OHSMS']}
};

function detectNoticeAgency(text) {
  const compact=text.replace(/\s/g,'');
  const signals={
    haide:[/北京海德国际认证|hicchina\.com/i.test(compact) && '机构名称或域名',/OP-01-\d{2}-H/i.test(compact) && '海德表单编号'],
    nsi:[/中标联合[（(]北京[）)]认证|ccnsi\.cn/i.test(compact) && '机构名称或域名',/NSI\/CX-01-02/i.test(compact) && 'NSI/CX-01-02']
  };
  const matches=Object.keys(signals).filter(id=>signals[id].some(Boolean));
  if(matches.length===1) return {id:matches[0],evidence:signals[matches[0]].filter(Boolean).join('、'),confidence:'matched'};
  if(matches.length>1) return {id:'',evidence:'出现多个机构标识，请确认通知书来源',confidence:'conflict'};
  // Older Haide forms and linked workbooks may have no searchable letterhead.
  if(!/文件编号[:：]/.test(compact) && /合同编号/.test(compact) && /经营地址/.test(compact) && /申请评审补充说明|审核策划补充说明/.test(compact)) return {id:'haide',evidence:'海德字段结构（需复核机构）',confidence:'structure'};
  return {id:'',evidence:'未匹配已配置机构，请选择机构或补充模板',confidence:'unknown'};
}

function parseTaskNotice(text,fileName,selectedAgency) {
  const detection=detectNoticeAgency(text);
  const id=selectedAgency ?? detection.id;
  if(!/审核\s*.{0,6}通知书/.test(text.replace(/\s/g,''))) throw new Error('未识别为审核任务通知书，原计划未变更。');
  const draft=id==='nsi' ? parseNsiNotice(text,fileName) : id==='haide' ? parseHaideNotice(text,fileName) : {project:{},auditors:[],departments:[],mappings:[],warnings:['未确定认证机构，尚未套用模板。'],rawText:text,fileName,sourceType:'task_notice'};
  draft.project.agency_id=id;
  draft.project.template_version=AGENCY_PROFILES[id]?.version || '';
  draft.project.agency_detection=selectedAgency ? '人工选择' : detection.evidence;
  if(detection.confidence==='structure' && !selectedAgency) draft.warnings.unshift(detection.evidence);
  return draft;
}

function currentAgencyId() {
  const project=state.importedPlan?.project;
  return project && 'agency_id' in project ? project.agency_id : 'haide';
}

function agencyPlanWarnings(project,systems) {
  const agency=AGENCY_PROFILES[currentAgencyId()];
  if(!agency) return ['尚未选择已配置的认证机构。'];
  const warnings=[];
  if(project.template_version && project.template_version!==agency.version) warnings.push('项目模板版本与当前模板不一致，请重新复核通知书。');
  if(systems.some(s=>!agency.systems.includes(s))) warnings.push(`${agency.shortName}当前模板仅支持 ${agency.systems.join('/')}，其他体系须先完成模板适配。`);
  return warnings;
}

function buildAgencyPlanModel() {
  const model=currentAgencyId()==='nsi' ? buildNsiPlanModel() : buildHaidePlanModel();
  model.agencyId=currentAgencyId();
  model.warnings=uniqueList([...agencyPlanWarnings(state.importedPlan?.project || {},state.systems),...model.warnings]);
  return model;
}

function renderAgencyPlan(model) {
  return model.agencyId==='nsi' ? renderNsiPlan(model) : renderHaidePlan(model);
}

function createAgencyWord(model) {
  if(model.warnings.length) throw new Error('请先完成待确认事项。');
  if(model.agencyId==='nsi') return createPlanTemplateWord(model,NSI_TEMPLATE,{mergeSchedule:true});
  if(model.agencyId!=='haide') throw new Error('认证机构未配置。');
  return createHaideWord(model);
}

function updateAgencyOutputLabel() {
  const agency=AGENCY_PROFILES[currentAgencyId()];
  const label=agency ? `${agency.shortName} · ${agency.templateId}` : '机构待确认';
  document.querySelector('.preview-format').textContent=label+' · A4 纵向';
  document.getElementById('word-template-label').textContent=label;
}
