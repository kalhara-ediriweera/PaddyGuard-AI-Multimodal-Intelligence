/**
 * PaddyGuard AI - Milestones Controller
 * Slide 11 Requirement: "When design, use a drop-down menu for user to choose."
 * Displays assessment details, date, marks allocated, and status.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMilestonesPage();
});

function initMilestonesPage() {
  const container = document.getElementById('milestones-grid');
  const selector = document.getElementById('milestone-dropdown-selector');
  const singleViewContainer = document.getElementById('milestone-single-detail-view');

  if (!container || !selector || typeof projectData === 'undefined') return;

  function renderSingleMilestone(milestoneId) {
    if (milestoneId === 'all') {
      singleViewContainer.style.display = 'none';
      container.style.display = 'block';
      renderAllMilestones();
      return;
    }

    const m = projectData.milestones.find(item => item.id === milestoneId);
    if (!m) return;

    container.style.display = 'none';
    singleViewContainer.style.display = 'block';

    let statusBadgeClass = 'badge-neutral';
    if (m.status === 'Completed') statusBadgeClass = 'badge-success';
    else if (m.status === 'Upcoming') statusBadgeClass = 'badge-warning';
    else if (m.status === 'Pending') statusBadgeClass = 'badge-purple';

    singleViewContainer.innerHTML = `
      <div class="card" style="border-top:4px solid var(--brand-emerald); padding:2.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
              <span class="badge ${statusBadgeClass}">${m.status}</span>
              <span class="milestone-assessment-tag">${m.assessment}</span>
            </div>
            <h2 style="font-size:2rem; margin-bottom:0.25rem;">Stage ${m.number}: ${m.name}</h2>
          </div>
          <div style="background:var(--bg-tertiary); padding:1rem 1.5rem; border-radius:var(--radius-md); text-align:right;">
            <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Marks Allocated</div>
            <div style="font-size:1.5rem; font-weight:800; color:var(--brand-forest);">${m.marksAllocated}</div>
          </div>
        </div>

        <p style="font-size:1.05rem; color:var(--text-secondary); line-height:1.7; margin-bottom:2rem;">
          ${m.description}
        </p>

        <div class="grid grid-3" style="margin-bottom:2rem;">
          <div style="background:var(--bg-tertiary); padding:1.25rem; border-radius:var(--radius-md);">
            <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Submission Date</div>
            <div style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin-top:0.25rem;">${m.date}</div>
          </div>
          <div style="background:var(--bg-tertiary); padding:1.25rem; border-radius:var(--radius-md);">
            <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Marks Awarded</div>
            <div style="font-size:1.15rem; font-weight:700; color:var(--brand-emerald-dark); margin-top:0.25rem;">${m.marksAwarded}</div>
          </div>
          <div style="background:var(--bg-tertiary); padding:1.25rem; border-radius:var(--radius-md);">
            <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Assessment Nature</div>
            <div style="font-size:1.15rem; font-weight:700; color:var(--text-primary); margin-top:0.25rem;">University Examination</div>
          </div>
        </div>

        <div style="border-top:1px solid var(--border-color); padding-top:1.5rem; margin-bottom:1.5rem;">
          <h4 style="font-size:1rem; margin-bottom:0.75rem;">Required Deliverables</h4>
          <ul style="padding-left:1.25rem; font-size:0.925rem; color:var(--text-secondary); line-height:1.7;">
            ${m.deliverables.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>

        <div style="display:flex; gap:1rem; flex-wrap:wrap;">
          <button class="btn btn-outline" onclick="showDocumentNotice('${m.name} Documentation', '${m.status}', '${m.relatedDocs ? m.relatedDocs[0] : 'R26-SE-015'}')">
            📂 View Associated Documents
          </button>
          <button class="btn btn-secondary" onclick="resetDropdownToAll()">
            Show All Milestones List
          </button>
        </div>
      </div>
    `;
  }

  function renderAllMilestones() {
    container.innerHTML = projectData.milestones.map(m => {
      let statusBadgeClass = 'badge-neutral';
      if (m.status === 'Completed') statusBadgeClass = 'badge-success';
      else if (m.status === 'Upcoming') statusBadgeClass = 'badge-warning';
      else if (m.status === 'Pending') statusBadgeClass = 'badge-purple';

      return `
        <div class="milestone-card" data-status="${m.status}">
          <div class="milestone-badge-box">
            <span class="milestone-badge-num">${m.number}</span>
            <span class="milestone-badge-lbl">Stage</span>
          </div>
          <div class="milestone-info">
            <div style="display:flex; align-items:center; gap:0.65rem; margin-bottom:0.25rem; flex-wrap:wrap;">
              <span class="badge ${statusBadgeClass}">${m.status}</span>
              <span class="milestone-assessment-tag">${m.assessment}</span>
            </div>
            <h3>${m.name}</h3>
            <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.75rem;">${m.description}</p>
            <div style="font-size:0.8rem; color:var(--text-muted);">
              <strong>Deliverables:</strong> ${m.deliverables.join(' • ')}
            </div>
          </div>
          <div class="milestone-meta-sidebar">
            <div>
              <div style="font-size:0.7rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Date</div>
              <div style="font-weight:700; color:var(--text-primary);">${m.date}</div>
            </div>
            <div>
              <div style="font-size:0.7rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Marks Allocated</div>
              <div style="font-weight:700; color:var(--text-primary);">${m.marksAllocated}</div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="selectMilestoneDirect('${m.id}')">
              Select Stage Details &rarr;
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Dropdown change listener
  selector.addEventListener('change', (e) => {
    renderSingleMilestone(e.target.value);
  });

  // Global helper
  window.selectMilestoneDirect = function(milestoneId) {
    selector.value = milestoneId;
    renderSingleMilestone(milestoneId);
    window.scrollTo({ top: selector.offsetTop - 100, behavior: 'smooth' });
  };

  window.resetDropdownToAll = function() {
    selector.value = 'all';
    renderSingleMilestone('all');
  };

  // Default to All
  renderAllMilestones();
}
