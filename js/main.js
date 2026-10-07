/**
 * PaddyGuard AI - Main Site JavaScript
 * Theme management, navigation drawer, scroll progress,
 * back-to-top button, modal helpers, and keyboard accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollEffects();
  initModals();
});

/* ==================== THEME MANAGEMENT ==================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  // Clear legacy dark theme setting if user found previous version too dark
  if (localStorage.getItem('paddyguard-theme') === 'dark' && !localStorage.getItem('paddyguard-theme-v2')) {
    localStorage.removeItem('paddyguard-theme');
  }
  // Default strictly to clean, crisp 'light' theme
  let currentTheme = localStorage.getItem('paddyguard-theme-v2') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('paddyguard-theme-v2', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;
  if (theme === 'dark') {
    themeToggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
    themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    themeToggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
    themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

/* ==================== NAVIGATION & MOBILE DRAWER ==================== */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('open');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // Close drawer when any mobile link is tapped
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Active link highlighters
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ==================== SCROLL EFFECTS ==================== */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const siteHeader = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (siteHeader) {
      if (scrollTop > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==================== MODAL HELPER FUNCTIONS ==================== */
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });

    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal.id));
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        closeModal(modal.id);
      });
      // Close mobile drawer if open
      const mobileDrawer = document.getElementById('mobile-nav-drawer');
      const drawerBackdrop = document.getElementById('drawer-backdrop');
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        if (drawerBackdrop) drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global helper to show document placeholder notice
function showDocumentNotice(title, status, code) {
  const noticeTitle = document.getElementById('doc-notice-title');
  const noticeMsg = document.getElementById('doc-notice-msg');
  const noticeCode = document.getElementById('doc-notice-code');

  if (noticeTitle) noticeTitle.textContent = title;
  if (noticeCode) noticeCode.textContent = `Document Code: ${code || 'R26-SE-015'}`;
  if (noticeMsg) {
    noticeMsg.textContent = status === 'Available' 
      ? 'The requested research document is verified and linked in the central academic archive.'
      : 'This research deliverable is in progress or scheduled for formal upload upon completion of the respective milestone assessment.';
  }
  openModal('doc-notice-modal');
}
