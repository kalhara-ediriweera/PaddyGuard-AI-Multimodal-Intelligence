/**
 * PaddyGuard AI - Presentations Library Controller
 * Renders defense decks, progress presentations, and handles slide outlines.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPresentationsPage();
});

function initPresentationsPage() {
  const container = document.getElementById('presentations-grid');
  const filterPills = document.querySelectorAll('.pres-filter-btn');

  if (!container || typeof projectData === 'undefined') return;

  function renderPresentations(filter = 'all') {
    const list = projectData.presentations.filter(p => {
      if (filter === 'all') return true;
      return p.status.toLowerCase() === filter.toLowerCase();
    });

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; padding: 3rem; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <p style="color: var(--text-muted); margin:0;">No presentation decks found for filter "<strong>${filter}</strong>".</p>
        </div>`;
      return;
    }

    container.innerHTML = list.map(p => {
      let statusBadgeClass = 'badge-neutral';
      if (p.status === 'Completed') statusBadgeClass = 'badge-success';
      else if (p.status === 'Upcoming') statusBadgeClass = 'badge-warning';
      else if (p.status === 'Pending') statusBadgeClass = 'badge-purple';

      return `
        <div class="card doc-card" data-status="${p.status}">
          <div class="doc-header">
            <div class="doc-icon-box" style="background:var(--brand-purple-light); color:var(--brand-purple);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <span class="badge ${statusBadgeClass}">${p.status}</span>
          </div>

          <span class="doc-code">STAGE ${p.number} • ${p.occasion}</span>
          <h3 class="doc-title">${p.title}</h3>
          <p class="doc-desc">${p.description}</p>

          <div style="margin-bottom: 1.25rem;">
            <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700; margin-bottom:0.4rem;">Key Presentation Topics</div>
            <ul style="padding-left:1.25rem; font-size:0.85rem; color:var(--text-secondary); line-height:1.5;">
              ${p.topics.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>

          <div class="doc-meta-row">
            <span><strong>Date:</strong> ${p.date}</span>
            <span><strong>Slides:</strong> ${p.slidesCount}</span>
          </div>

          <div class="doc-actions">
            <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="openPresentationModal('${p.id}')">
              View Outline
            </button>
            <button class="btn btn-primary btn-sm" style="flex:1;" onclick="showDocumentNotice('${p.title}', '${p.status}', 'PRES-${p.number}')">
              ${p.fileUrl ? 'Download Slides' : 'Slides (Pending)'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter') || 'all';
      renderPresentations(filter);
    });
  });

  renderPresentations('all');
}

function openPresentationModal(presId) {
  const p = projectData.presentations.find(item => item.id === presId);
  if (!p) return;

  const titleEl = document.getElementById('pres-modal-title');
  const bodyEl = document.getElementById('pres-modal-body');

  if (titleEl) titleEl.textContent = p.title;
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="badge badge-info" style="margin-bottom:0.5rem;">${p.occasion}</span>
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top:0.5rem;">${p.description}</p>
      </div>

      <div style="background: var(--bg-tertiary); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; font-size: 0.85rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem;">
          <strong>Presentation Date:</strong> <span>${p.date}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem;">
          <strong>Status:</strong> <span>${p.status}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <strong>Slide Deck Volume:</strong> <span>${p.slidesCount}</span>
        </div>
      </div>

      <h4 style="font-size: 1rem; margin-bottom: 0.75rem; color: var(--text-primary);">Detailed Agenda &amp; Defense Content</h4>
      <ol style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
        ${p.topics.map(t => `<li style="margin-bottom:0.35rem;">${t}</li>`).join('')}
      </ol>
    `;
  }

  openModal('pres-outline-modal');
}
