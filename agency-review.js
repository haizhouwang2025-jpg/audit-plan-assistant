function noticeAgencySection(project) {
  return `<section class="notice-review-section"><h3>认证机构及输出模板</h3><div class="review-grid">${reviewSelect('agency_id','认证机构',Object.entries(AGENCY_PROFILES).map(([id,p])=>[id,p.name]),project.agency_id ?? 'haide')}<label>计划模板<input readonly value="${escapeHtml(AGENCY_PROFILES[project.agency_id ?? 'haide']?.templateId || '未匹配')}" aria-label="计划模板"></label></div><p class="review-time-status">${escapeHtml(project.agency_detection || '原有项目默认海德，可更改')}</p></section>`;
}

function setupNoticeAgency(form) {
  form.elements.namedItem('agency_id').addEventListener('change',event=>{
    const id=event.target.value, previous=noticeDraft.project.agency_id ?? 'haide';
    if(!window.confirm('切换机构将按对应规则重新读取通知书，尚未确认的修改不会保留。继续吗？')) {event.target.value=previous;return;}
    try {
      const draft=noticeDraft.rawText ? parseTaskNotice(noticeDraft.rawText,noticeDraft.fileName,id) : structuredClone(noticeDraft);
      draft.project.agency_id=id;draft.project.template_version=AGENCY_PROFILES[id].version;
      draft.project.agency_detection='人工选择';
      openNoticeReview(draft);
    } catch(error) {event.target.value=previous;document.getElementById('notice-review-error').textContent=error.message;}
  });
}
