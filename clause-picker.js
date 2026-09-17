function openClausePicker(departmentId) {
  const dept=getDepartment(departmentId);
  if (!dept) return;
  const dialog=document.getElementById('clause-picker');
  const selected=new Set(clausesForDepartment(dept).map(clause=>clause.id));
  dialog.innerHTML=`<form id="clause-picker-form"><header class="notice-review-header"><div><h2 id="clause-picker-title">添加 / 调整条款</h2><p>${escapeHtml(dept.name)}</p></div><button class="icon-button" type="button" data-close-picker title="关闭" aria-label="关闭条款选择"><i data-lucide="x"></i></button></header>
    <div class="clause-picker-filters"><input type="search" id="clause-picker-search" placeholder="条款号或名称" aria-label="搜索条款"><select id="clause-picker-system" aria-label="筛选体系"><option value="">全部体系</option>${state.systems.map(system=>`<option value="${system}">${escapeHtml(systemCatalog[system]?.code || system)}</option>`).join('')}</select><button type="button" class="icon-button" id="clause-picker-select" title="全选当前筛选条款" aria-label="全选当前筛选条款"><i data-lucide="list-checks"></i></button></div>
    <div id="clause-picker-list"></div><footer class="notice-review-footer"><span id="clause-picker-count"></span><button type="button" class="btn" data-close-picker>取消</button><button type="submit" class="btn btn-primary"><i data-lucide="check"></i>确认条款</button></footer></form>`;
  const form=dialog.querySelector('form');
  let visible=[];
  function renderOptions() {
    const search=form.querySelector('#clause-picker-search').value.trim().toLowerCase();
    const system=form.querySelector('#clause-picker-system').value;
    visible=activeClauses().filter(clause=>(!system || clause.system===system) && (!search || (clause.number+' '+clause.title).toLowerCase().includes(search)));
    const list=form.querySelector('#clause-picker-list');
    list.innerHTML=visible.map(clause=>{
      const others=clauseDepartments(clause.id).filter(id=>id!==departmentId).map(id=>getDepartment(id)?.name).filter(Boolean);
      return `<label class="clause-picker-option"><input type="checkbox" value="${escapeHtml(clause.id)}" ${selected.has(clause.id)?'checked':''}><span class="clause-picker-number">${escapeHtml(systemCatalog[clause.system].code+' '+clause.number)}</span><span>${escapeHtml(clause.title)}${others.length?`<small>同时用于：${escapeHtml(others.join('、'))}</small>`:''}</span><small>${escapeHtml(getClauseCapabilityText({...clause,strictProfessional:requiresProfessional(clause,dept)}))}</small></label>`;
    }).join('') || '<p class="empty-state">没有匹配条款</p>';
    form.querySelector('#clause-picker-count').textContent='已选 '+selected.size+' 项';
  }
  form.querySelector('#clause-picker-search').oninput=renderOptions;
  form.querySelector('#clause-picker-system').onchange=renderOptions;
  form.querySelector('#clause-picker-select').onclick=()=>{visible.forEach(clause=>selected.add(clause.id));renderOptions();};
  form.querySelector('#clause-picker-list').onchange=event=>{
    if (event.target.checked) selected.add(event.target.value); else selected.delete(event.target.value);
    form.querySelector('#clause-picker-count').textContent='已选 '+selected.size+' 项';
  };
  form.querySelectorAll('[data-close-picker]').forEach(button=>button.onclick=()=>dialog.close());
  form.onsubmit=event=>{
    event.preventDefault();
    if (!getDepartment(departmentId)) {dialog.close();return;}
    for (const clause of activeClauses()) {
      const other=clauseDepartments(clause.id).filter(id=>id!==departmentId);
      state.assignments[clause.id]=selected.has(clause.id) ? [...other,departmentId] : other;
      if (!selected.has(clause.id)) state.professionalAssignments[clause.id]=(state.professionalAssignments[clause.id] || []).filter(id=>id!==departmentId);
    }
    dialog.close();render();generateSchedule();
  };
  renderOptions();lucide.createIcons();dialog.showModal();form.querySelector('#clause-picker-search').focus();
}
