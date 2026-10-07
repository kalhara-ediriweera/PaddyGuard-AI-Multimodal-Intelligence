/**
 * PaddyGuard AI - Academic Documents Repository Controller
 * Strictly satisfies Slide 12:
 * - Project Charter (one doc)
 * - Proposal Document (one doc)
 * - Check List documents (SE Checklist 1, 2, 3)
 * - Final Document (4 docs with the main)
 */

document.addEventListener('DOMContentLoaded', () => {
  initDocumentsPage();
});

function initDocumentsPage() {
  const container = document.getElementById('documents-grid');
  const searchInput = document.getElementById('doc-search-input');
  const categoryPills = document.querySelectorAll('.doc-cat-btn');
  const countBadge = document.getElementById('doc-count-badge');

  if (!container || typeof projectData === 'undefined') return;

  let currentCategory = 'all';
  let currentSearch = '';

  function renderDocuments() {
    let list = [...projectData.documents];

    // Filter by category
    if (currentCategory !== 'all') {
      list = list.filter(d => d.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // Filter by search
    if (currentSearch) {
      list = list.filter(d => 
        d.title.toLowerCase().includes(currentSearch) ||
        d.description.toLowerCase().includes(currentSearch) ||
        d.code.toLowerCase().includes(currentSearch) ||
        d.author.toLowerCase().includes(currentSearch)
      );
    }

    if (countBadge) countBadge.textContent = `${list.length} Document${list.length === 1 ? '' : 's'}`;

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; padding: 3rem 1.5rem; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📂</div>
          <h4 style="margin-bottom: 0.25rem; color: var(--text-primary);">No Documents Found</h4>
          <p style="color: var(--text-muted); font-size: 0.875rem; margin:0;">No documents match the category "${currentCategory}".</p>
        </div>`;
      return;
    }

    container.innerHTML = list.map(doc => {
      let statusBadgeClass = 'badge-neutral';
      if (doc.status === 'Available') statusBadgeClass = 'badge-success';
      else if (doc.status === 'To be updated') statusBadgeClass = 'badge-warning';
      else if (doc.status.includes('Pending')) statusBadgeClass = 'badge-purple';

      return `
        <div class="doc-card">
          <div class="doc-header">
            <div class="doc-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <span class="badge ${statusBadgeClass}">${doc.status}</span>
          </div>
          <span class="doc-code">${doc.code}</span>
          <h3 class="doc-title">${doc.title}</h3>
          <p class="doc-desc">${doc.description}</p>
          
          <div class="doc-meta-row">
            <span><strong>Author:</strong> ${doc.author}</span>
            <span><strong>Category:</strong> ${doc.category}</span>
          </div>

          <div class="doc-actions">
            <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="handleDocAction('${doc.id}', 'view')">
              Document Info
            </button>
            <button class="btn btn-primary btn-sm" style="flex:1;" onclick="handleDocAction('${doc.id}', 'download')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              ${doc.fileUrl ? 'Download PDF' : 'Download (Pending)'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-cat') || 'all';
      renderDocuments();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      renderDocuments();
    });
  }

  renderDocuments();
}

function handleDocAction(docId, action) {
  const doc = projectData.documents.find(d => d.id === docId);
  if (!doc) return;

  if (action === 'download' && doc.fileUrl) {
    window.open(doc.fileUrl, '_blank');
  } else {
    showDocumentNotice(doc.title, doc.status, doc.code);
  }
}
