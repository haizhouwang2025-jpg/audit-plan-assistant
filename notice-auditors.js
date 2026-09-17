function noticeAuditorRoles(text) {
  const normalize=value=>/实习/.test(value) ? '实习' : /专家/.test(value) ? '技术专家' : value;
  const systemRoles={};
  for (const m of text.matchAll(/(QMS|EMS|OHSMS|[QES][QES/、,]*)\s*[:：]\s*(组长|组员|技术专家|专家|实习审核员|实习)/g)) {
    const labels={QMS:'Q',EMS:'E',OHSMS:'S'}[m[1]] || m[1];
    for (const label of labels) if ('QES'.includes(label)) systemRoles[{Q:'QMS',E:'EMS',S:'OHSMS'}[label]]=normalize(m[2]);
  }
  const roles=Object.values(systemRoles);
  const role=['组长','组员','技术专家','实习'].find(value=>roles.includes(value)) || normalize(text.match(/组长|组员|技术专家|专家|实习审核员|实习/)?.[0] || '');
  return {role,...(roles.length ? {systemRoles} : {})};
}

function noticeAuditorRoleLabel(auditor) {
  if (!auditor.systemRoles) return auditor.role;
  const groups=new Map();
  for (const [system,code] of Object.entries({QMS:'Q',EMS:'E',OHSMS:'S'})) {
    const role=auditor.systemRoles[system];
    if (role) groups.set(role,[...(groups.get(role) || []),code]);
  }
  return [...groups].map(([role,codes])=>codes.join('/')+'：'+role).join('；');
}

function parseNoticeAuditors(groupText, warnings) {
  const headers={code:/^(代码|代号|人员代码)$/,name:/^(?:审核员|审核人员|人员)?姓名$/,role:/组内身份|组内职务|组内角色|担任角色|审核分工/,registration:/注册.*(?:证书|资格|编号|号码)|注册号|证书号/,professional:/^专业$|专业代码|专业类别|技术领域/,employer:/工作单位|所在单位/,fullTime:/专职|专兼职/,phone:/电话|手机/};
  // Word 97 tables may delimit every row with tabs instead of a newline.
  const starts=[...groupText.matchAll(/(?:^|[\n\t])[ \t]*[A-Z](?=[ \t])/g)];
  const lines=groupText.slice(0,starts[0]?.index ?? groupText.length).split('\n');
  const header=lines.find(line=>line.includes('\t') && /姓名/.test(line.replace(/\s/g,'')) && /身份|职务|角色|分工/.test(line.replace(/\s/g,'')));
  const columns=header?.split('\t').map(value=>value.replace(/\s/g,''));
  const indexes=Object.fromEntries(Object.entries(headers).map(([key,pattern],i)=>[key,columns ? columns.findIndex(value=>pattern.test(value)) : i]));
  // Keep wrapped table cells attached to their personnel row before reading columns.
  const blocks=starts.map((m,i)=>groupText.slice(m.index,starts[i+1]?.index ?? groupText.length).trim());
  const auditors=[];
  for (const block of blocks) {
    let cells=block.replace(/\n/g,' ').split('\t').map(value=>value.trim());
    let record;
    if (cells.length>=5) record=Object.fromEntries(Object.entries(indexes).map(([key,index])=>[key,index<0 ? '' : cells[index] || '']));
    else {
      const flat=block.replace(/\s+/g,' ').trim();
      const m=flat.match(/^([A-Z])\s+(\S+)\s+((?:[QES/、,]+\s*[:：]?\s*)?(?:组长|组员|技术专家|实习审核员|实习))\s+(.+)$/);
      if (!m) {warnings.push('有审核组人员行未完整识别，请对照通知书补充。');continue;}
      const rest=m[4].replace(/\s*-\s*/g,'-');
      record={code:m[1],name:m[2],role:m[3],registration:rest.split(/\d{2}\.\d{2}/)[0].trim(),professional:rest.match(/\d{2}(?:\.\d{2}){1,2}\s*[(（][QES/、,\s]+[)）]/g)?.join(';') || '',phone:rest.match(/(?:1\d{10}|0\d{2,3}-\d{7,8})/)?.[0] || '',employer:'',fullTime:''};
    }
    if (!/^[A-Z]$/.test(record.code) || !record.name || !/组长|组员|专家|实习/.test(record.role)) {
      warnings.push('有审核组人员的代码、姓名或身份未完整识别，请对照通知书复核。');continue;
    }
    const {role,systemRoles}=noticeAuditorRoles(record.role);
    const professionalCodes={QMS:'',EMS:'',OHSMS:''};
    const add=(systems,code)=>[...systems].filter(c=>'QES'.includes(c)).forEach(c=>{
      const system={Q:'QMS',E:'EMS',S:'OHSMS'}[c];
      professionalCodes[system]=[...new Set([...professionalCodes[system].split(';').filter(Boolean),code])].join(';');
    });
    for (const m of record.professional.matchAll(/(\d{2}(?:\.\d{2}){1,2}(?:\s*[;；、,，]\s*\d{2}(?:\.\d{2}){1,2})*)\s*[(（]([QES/、,\s]+)[)）]/g)) {
      for (const code of m[1].match(/\d{2}(?:\.\d{2}){1,2}/g)) add(m[2],code);
    }
    const labelled=[...record.professional.matchAll(/(QMS|EMS|OHSMS|[QES](?:[QES/、,]*))\s*[:：]/g)];
    labelled.forEach((m,i)=>{
      const label={QMS:'Q',EMS:'E',OHSMS:'S'}[m[1]] || m[1];
      const part=record.professional.slice(m.index+m[0].length,labelled[i+1]?.index ?? record.professional.length);
      for (const code of part.match(/\b\d{2}(?:\.\d{2}){1,2}\b/g) || []) add(label,code);
    });
    const professional=Object.values(professionalCodes).some(Boolean);
    if (!record.registration && !['技术专家','实习'].includes(role)) warnings.push(record.name+'的注册号未读取到，请对照通知书复核。');
    if (record.professional && !professional && !/^(无|不适用|[-/／])$/.test(record.professional)) warnings.push(record.name+'的专业代码未明确分体系，请人工填写对应能力，未自动授权。');
    auditors.push({id:record.code,code:record.code,name:record.name,role,...(systemRoles ? {systemRoles} : {}),registration:record.registration,professionalCodes,professional,independent:!['技术专家','实习'].includes(role),employer:record.employer,fullTime:record.fullTime,phone:record.phone});
  }
  return auditors;
}
