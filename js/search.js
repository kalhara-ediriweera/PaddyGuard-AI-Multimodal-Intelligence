/**
 * PaddyGuard AI - Client-side Global Search
 * Indexes projectData and enables instantaneous fuzzy/keyword search
 * with category filtering and deep navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGlobalSearch();
});

function initGlobalSearch() {
  const searchBtn = document.getElementById('global-search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('search-results-list');
  const searchCount = document.getElementById('search-results-count');

  if (!searchBtn || !searchModal || !searchInput || !searchResults) return;

  // Build Search Index from projectData
  const searchIndex = buildSearchIndex();

  // Keyboard shortcut Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openModal('search-modal');
      setTimeout(() => searchInput.focus(), 100);
    }
  });

  searchBtn.addEventListener('click', () => {
    openModal('search-modal');
    setTimeout(() => searchInput.focus(), 100);
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      searchResults.innerHTML = `
        <li style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          Type keywords such as <em>"ResNet50"</em>, <em>"ODIN"</em>, <em>"Sinhala"</em>, <em>"RAG"</em>, <em>"Pest"</em>, or <em>"Milestones"</em> to explore the research.
        </li>`;
      if (searchCount) searchCount.textContent = '0 results';
      return;
    }

    const matches = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(query) ||
             item.desc.toLowerCase().includes(query) ||
             item.category.toLowerCase().includes(query) ||
             (item.keywords && item.keywords.some(k => k.toLowerCase().includes(query)));
    });

    if (searchCount) searchCount.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'}`;

    if (matches.length === 0) {
      searchResults.innerHTML = `
        <li style="padding: 2rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          No matching research entries found for <strong>"${escapeHtml(query)}"</strong>.
        </li>`;
      return;
    }

    searchResults.innerHTML = matches.map((match, idx) => `
      <li class="search-result-item" data-url="${match.url}" tabindex="0">
        <div class="search-result-title">
          <span>${highlightKeyword(match.title, query)}</span>
          <span class="search-result-category">${match.category}</span>
        </div>
        <div class="search-result-desc">${highlightKeyword(truncate(match.desc, 130), query)}</div>
      </li>
    `).join('');

    // Attach click and enter navigation
    searchResults.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        navigateToResult(el.getAttribute('data-url'));
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          navigateToResult(el.getAttribute('data-url'));
        }
      });
    });
  });
}

function navigateToResult(url) {
  if (url) {
    closeModal('search-modal');
    window.location.href = url;
  }
}

function buildSearchIndex() {
  const index = [];

  // 1. Core Pages & Domain Concepts
  index.push(
    { title: "Project Overview & Abstract", category: "General", desc: "PaddyGuard AI integrates multimodal computer vision, Sinhala voice diagnosis, Out-of-Distribution screening, and RAG knowledge assistance for rice farming.", url: "index.html#abstract", keywords: ["rice", "abstract", "multimodal", "overview", "sliit"] },
    { title: "Research Problem Statement", category: "Domain", desc: "Smallholder farmers face foliar disease epidemics, pesticide misuse, delayed diagnosis, and closed-world AI classifiers that fail on unseen field inputs.", url: "domain.html#problem", keywords: ["problem", "issues", "challenges", "misuse"] },
    { title: "Literature Survey & Existing Systems", category: "Domain", desc: "Comprehensive review of CNN approaches (Mohanty, Lu, Chen), commercial tools (Plantix, Rice Doctor), and their limitations regarding OOD robustness.", url: "domain.html#literature", keywords: ["literature", "survey", "plantix", "rice doctor", "prior art"] },
    { title: "Research Gap (Closed vs Open World)", category: "Domain", desc: "Why existing closed-world classifiers produce confident errors on weeds, soil, and non-target pests, and how PaddyGuard AI introduces OOD safeguards.", url: "domain.html#gap", keywords: ["gap", "closed-world", "openmax", "odin", "reliability"] },
    { title: "Research Objectives", category: "Domain", desc: "Main objective: design an explainable rice leaf disease & pest detection system with OOD screening and Sinhala voice assistance.", url: "domain.html#objectives", keywords: ["objectives", "aims", "targets", "goals"] },
    { title: "Design Science Methodology", category: "Methodology", desc: "17-step iterative Design Science Research (DSR) lifecycle encompassing data curation, model training, OOD calibration, and field evaluation.", url: "domain.html#methodology", keywords: ["methodology", "dsr", "design science", "workflow", "lifecycle"] }
  );

  // 2. Components
  if (typeof projectData !== 'undefined' && projectData.components) {
    projectData.components.forEach(c => {
      index.push({
        title: `Component ${c.number}: ${c.title}`,
        category: "AI Component",
        desc: `${c.summary} Lead: ${c.lead}. Tech: ${c.technologies.join(', ')}`,
        url: `index.html#component-${c.id}`,
        keywords: [...c.technologies, ...c.targetClasses, c.lead]
      });
    });
  }

  // 3. Datasets
  if (typeof projectData !== 'undefined' && projectData.datasets) {
    projectData.datasets.forEach(d => {
      index.push({
        title: `Dataset: ${d.name}`,
        category: "Datasets",
        desc: `Source: ${d.source}. Classes: ${d.classes}. Status: ${d.status}`,
        url: "domain.html#datasets",
        keywords: [d.name, d.category, d.source, "kaggle"]
      });
    });
  }

  // 4. Milestones
  if (typeof projectData !== 'undefined' && projectData.milestones) {
    projectData.milestones.forEach(m => {
      index.push({
        title: `Milestone ${m.number}: ${m.name} (${m.assessment})`,
        category: "Milestones",
        desc: `${m.description} Status: ${m.status}`,
        url: "milestones.html",
        keywords: [m.name, m.assessment, m.status, "assessment", "viva", "proposal"]
      });
    });
  }

  // 5. Documents
  if (typeof projectData !== 'undefined' && projectData.documents) {
    projectData.documents.forEach(d => {
      index.push({
        title: `Document: ${d.title}`,
        category: "Documents",
        desc: `${d.description} Code: ${d.code}. Status: ${d.status}`,
        url: "documents.html",
        keywords: [d.title, d.category, d.code, "pdf", "report"]
      });
    });
  }

  // 6. Presentations
  if (typeof projectData !== 'undefined' && projectData.presentations) {
    projectData.presentations.forEach(p => {
      index.push({
        title: `Presentation ${p.number}: ${p.title}`,
        category: "Presentations",
        desc: `${p.description} (${p.status})`,
        url: "presentations.html",
        keywords: [p.title, p.occasion, "slides", "deck"]
      });
    });
  }

  // 7. Team & Supervision
  if (typeof projectData !== 'undefined' && projectData.team) {
    projectData.team.forEach(t => {
      index.push({
        title: `Research Team: ${t.name} (${t.studentId})`,
        category: "About Us",
        desc: `${t.role}. Key focus: ${t.componentTitle}`,
        url: "about.html#team",
        keywords: [t.name, t.studentId, t.role, ...t.technologies]
      });
    });
  }

  // Supervisor
  if (typeof projectData !== 'undefined' && projectData.supervision) {
    index.push({
      title: `Supervisor: ${projectData.supervision.supervisor.name}`,
      category: "Supervision",
      desc: `${projectData.supervision.supervisor.role}, ${projectData.supervision.supervisor.department}, SLIIT. Expertise: ${projectData.supervision.supervisor.expertise}`,
      url: "about.html#supervision",
      keywords: ["supervisor", "nathali silva", "sliit", "faculty"]
    });
  }

  // 8. Requirements
  if (typeof projectData !== 'undefined' && projectData.requirements) {
    projectData.requirements.functional.forEach(fr => {
      index.push({
        title: `${fr.id}: ${fr.requirement}`,
        category: "Requirements (FR)",
        desc: fr.description,
        url: "domain.html#requirements",
        keywords: [fr.id, fr.requirement, fr.category]
      });
    });
    projectData.requirements.nonFunctional.forEach(nfr => {
      index.push({
        title: `${nfr.id}: ${nfr.metric} (${nfr.target})`,
        category: "Requirements (NFR)",
        desc: nfr.description,
        url: "domain.html#requirements",
        keywords: [nfr.id, nfr.category, nfr.metric]
      });
    });
  }

  return index;
}

function highlightKeyword(text, keyword) {
  if (!keyword || !text) return text;
  const regex = new RegExp(`(${escapeRegex(keyword)})`, 'gi');
  return text.replace(regex, '<mark style="background: rgba(16, 185, 129, 0.3); color: inherit; padding: 0 2px; border-radius: 2px;">$1</mark>');
}

function truncate(str, maxLen) {
  if (!str) return '';
  return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
}

function escapeHtml(string) {
  return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
