// Return to the previous site page without falling back to the login screen.
function goBackToPreviousPage() {
  if (history.length > 1) {
    history.back();
    return;
  }
  window.location.href = 'index.html';
}

// ── SIDEBAR ──
function initSidebar() {
  const btn     = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const close   = document.getElementById('sidebarClose');
  const logout  = document.getElementById('logoutBtn');
  if (!btn || !sidebar) return;

  function open()  { sidebar.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow='hidden'; }
  function shut()  { sidebar.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow=''; }

  btn.addEventListener('click', open);
  close && close.addEventListener('click', shut);
  overlay && overlay.addEventListener('click', shut);
  logout && logout.addEventListener('click', () => {
    localStorage.removeItem('userName');
    shut();
    window.location.href = 'index.html';
  });
}

// ── BOTTOM NAV active ──
function initBottomNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-page]').forEach(el => {
    if (el.dataset.page === path) el.classList.add('active');
  });
}

// ── SCROLL REVEAL ──
function initReveal() {
  const els = document.querySelectorAll('.game-card, .topic-chip, .feature-card, .gallery-grid img');
  els.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 6) * 55}ms`;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// ── LIGHTBOX ──
function initLightbox() {
  const lb    = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src; lb.classList.add('open'); document.body.style.overflow = 'hidden';
    });
  });
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// ── GREETING ──
function initGreeting() {
  const el = document.getElementById('greetingName');
  if (!el) return;
  const name = localStorage.getItem('userName');
  el.textContent = name ? `Xin chào ${name} 👋` : 'Xin chào 👋';
}

function initSpiritBeast() {
  if (document.querySelector('.spirit-beast')) return;
  const beast = document.createElement('img');
  beast.className = 'spirit-beast';
  beast.src = 'mam3.png';
  beast.alt = 'Linh thú đồng hành';
  beast.title = 'Chạm để linh thú vui nhảy, kéo để di chuyển';
  document.body.appendChild(beast);
  beast.addEventListener('click', () => {
    beast.classList.remove('happy');
    void beast.offsetWidth;
    beast.classList.add('happy');
  });
  let dragging = false, offsetX = 0, offsetY = 0;
  beast.addEventListener('pointerdown', e => {
    dragging = true;
    const rect = beast.getBoundingClientRect();
    offsetX = e.clientX - rect.left; offsetY = e.clientY - rect.top;
    beast.setPointerCapture(e.pointerId);
  });
  beast.addEventListener('pointermove', e => {
    if (!dragging) return;
    beast.style.left = `${Math.max(8, Math.min(window.innerWidth - beast.offsetWidth - 8, e.clientX - offsetX))}px`;
    beast.style.top = `${Math.max(8, Math.min(window.innerHeight - beast.offsetHeight - 8, e.clientY - offsetY))}px`;
    beast.style.right = 'auto'; beast.style.bottom = 'auto';
  });
  beast.addEventListener('pointerup', () => { dragging = false; });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initBottomNav();
  initReveal();
  initLightbox();
  initGreeting();
  initSpiritBeast();
});
