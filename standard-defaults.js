const STANDARD_DEFAULTS = {
  QMS: 'GB/T 19001-2016/ISO9001:2015',
  EMS: 'GB/T 24001-2016/ISO14001:2015',
  OHSMS: 'GB/T 45001-2020/ISO 45001:2018'
};
const STANDARD_SYSTEMS = {
  QMS: {code:'Q',suffix:'q',name:'质量管理体系'},
  EMS: {code:'E',suffix:'e',name:'环境管理体系'},
  OHSMS: {code:'S',suffix:'s',name:'职业健康安全管理体系'}
};

function splitSystemValues(value) {
  const text=String(value || ''), result={};
  const labels=[...text.matchAll(/(职业健康安全管理体系|质量管理体系|环境管理体系|OHSMS|QMS|EMS|[QES](?:\s*[/、,]?\s*[QES])*)\s*[:：]/gi)];
  labels.forEach((match,i)=>{
    const label=match[1].toUpperCase();
    const exact=Object.keys(STANDARD_SYSTEMS).find(s=>s===label || STANDARD_SYSTEMS[s].name===label);
    const systems=exact ? [exact] : Object.keys(STANDARD_SYSTEMS).filter(s=>label.includes(STANDARD_SYSTEMS[s].code));
    const part=text.slice(match.index+match[0].length,labels[i+1]?.index ?? text.length).replace(/^[\s;；]+|[\s;；]+$/g,'');
    systems.forEach(s=>{result[s]=[result[s],part].filter(Boolean).join('；');});
  });
  return result;
}

function splitStandardCriteria(value, systems) {
  const text=String(value || '').trim(), labelled=splitSystemValues(text);
  if (Object.keys(labelled).length) return labelled;
  if (systems.length===1) return {[systems[0]]:text};
  const result={};
  for (const match of text.matchAll(/(?:GB\s*\/\s*T|ISO)\s*(19001|9001|24001|14001|45001)\s*[-:：]\s*\d{4}(?:\s*\/\s*Amd\s*\d+\s*:\s*\d{4})?/gi)) {
    const system=/^(19001|9001)$/.test(match[1]) ? 'QMS' : /^(24001|14001)$/.test(match[1]) ? 'EMS' : 'OHSMS';
    result[system]=[result[system],match[0]].filter(Boolean).join('/');
  }
  return result;
}

function emsCriteriaVersion(criteria) {
  const iso=String(criteria || '').match(/ISO\s*14001\s*[:：-]\s*(\d{4})/i);
  if (iso) return ['2015','2026'].includes(iso[1]) ? iso[1] : '';
  if (/GB\s*\/\s*T\s*24001\s*[-:：]\s*2016/i.test(criteria)) return '2015';
  return '';
}

function applyStandardDefaults(project, systems) {
  for (const system of systems) {
    const spec=STANDARD_SYSTEMS[system];
    if (!spec) continue;
    const key=`criteria_${spec.suffix}`;
    const existing=String(project[key] || project[`standard_${spec.suffix}`] || '').trim();
    project[key]=existing || (system==='EMS' && String(project.ems_version)==='2026' ? 'ISO 14001:2026' : STANDARD_DEFAULTS[system]);
  }
  if (systems.includes('EMS')) project.ems_version=emsCriteriaVersion(project.criteria_e);
  return project;
}
