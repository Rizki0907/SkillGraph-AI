/**
 * SkillGraph-AI Application Controller
 * Manages SPA Routing, Themes, Boot Sequence, Particle Canvas, and UI Events
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBootSequence();
  initParticleCanvas();
  initNavigation();
  initSimulator();
  initCharts();
});

/* ==============================================================================
   THEME SWITCHER WITH DYNAMIC LOGO SWAP
   ============================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('skillgraph_theme') || 'dark';
  applyTheme(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('skillgraph_theme', theme);

  // Dynamic Logo Swap
  const brandLogos = document.querySelectorAll('.brand-logo-img, .boot-logo-img');
  const logoSrc = theme === 'light' ? 'logo/skillgraph_logo_light.jpg' : 'logo/skillgraph_logo_dark.jpg';
  brandLogos.forEach(img => {
    img.src = logoSrc;
  });

  // Theme icon update
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    if (theme === 'light') {
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    } else {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    }
  }

  if (window.refreshAllCharts) {
    window.refreshAllCharts();
  }
}

/* ==============================================================================
   BOOT SEQUENCE TERMINAL
   ============================================================================== */
function initBootSequence() {
  const bootScreen = document.getElementById('boot-screen');
  const bootLog = document.getElementById('boot-log');
  const bootFill = document.getElementById('boot-fill');
  const bootPct = document.getElementById('boot-pct');

  if (!bootScreen || !bootLog) return;

  const logs = [
    { text: ">>> Initializing SkillGraph-AI Subsystem [Dual T4 GPU Mode]...", delay: 200, pct: 15 },
    { text: ">>> Loading Tokenizer & Checkpoint: jjzha/jobbert-base-cased [OK]", delay: 450, pct: 35 },
    { text: ">>> Loading PMI Competency Graph & 40 Technical Entities [OK]", delay: 700, pct: 55 },
    { text: ">>> Reconstructing 3,341 HDBSCAN Noise Postings via GMM Cascade [OK]", delay: 950, pct: 75 },
    { text: ">>> Initializing 614-D Multimodal Feature Matrix & Stacking Ensemble [OK]", delay: 1200, pct: 90 },
    { text: ">>> Quantum Quantile Corridors (P10, P50, P90) & TreeSHAP Engine: READY", delay: 1400, pct: 100, success: true }
  ];

  logs.forEach(step => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.textContent = step.text;
      if (step.success) p.className = 'term-success';
      bootLog.appendChild(p);
      bootFill.style.width = `${step.pct}%`;
      bootPct.textContent = `${step.pct}%`;
    }, step.delay);
  });

  setTimeout(() => {
    bootScreen.classList.add('boot-done');
    animateCounters();
  }, 1750);
}

/* ==============================================================================
   SPA NAVIGATION ROUTER
   ============================================================================== */
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-tab-btn, .mobile-drawer-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pageId = btn.getAttribute('data-page');
      nav(pageId, btn);
      closeMobileMenu();
    });
  });

  // Subtabs within Metodologi
  const subtabBtns = document.querySelectorAll('.subtab-btn');
  subtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const subpageId = btn.getAttribute('data-subpage');
      switchSubtab(subpageId, btn);
    });
  });
}

function nav(pageId, triggerBtn) {
  // Update nav buttons active state
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-page') === pageId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Switch tab content
  document.querySelectorAll('.tab-content').forEach(tab => {
    if (tab.id === `tab-${pageId}`) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Refresh charts if entering methodology or simulator
  if (['metodologi', 'eda', 'simulator'].includes(pageId)) {
    if (window.refreshAllCharts) window.refreshAllCharts();
  }
}

function switchSubtab(subpageId, triggerBtn) {
  const container = triggerBtn.closest('.subtabs-wrapper');
  if (!container) return;

  container.querySelectorAll('.subtab-btn').forEach(b => b.classList.remove('active'));
  triggerBtn.classList.add('active');

  container.querySelectorAll('.subtab-panel').forEach(panel => {
    if (panel.id === `subpanel-${subpageId}`) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  if (window.refreshAllCharts) window.refreshAllCharts();
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.toggle('open');
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.remove('open');
}

/* ==============================================================================
   KPI COUNT-UP ANIMATION
   ============================================================================== */
function animateCounters() {
  const counterEls = document.querySelectorAll('.counter-val');
  counterEls.forEach(el => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isCurrency = el.getAttribute('data-currency') === 'true';
    const isPercent = el.getAttribute('data-percent') === 'true';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0');

    let current = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      let formatted = current.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });

      if (isCurrency) formatted = `$${formatted}`;
      if (isPercent) formatted = `${formatted}%`;
      el.textContent = formatted;
    }, stepTime);
  });
}

/* ==============================================================================
   PARTICLE CONSTELLATION CANVAS
   ============================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(width > 768 ? 65 : 30, 80);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1.2,
      baseColor: Math.random() > 0.4 ? 'rgba(0, 210, 255,' : 'rgba(0, 102, 255,'
    });
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Mouse gentle attraction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += dx * 0.015;
          p.y += dy * 0.015;
        }
      }

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.baseColor} 0.8)`;
      ctx.fill();

      // Connect constellation edges
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          let alpha = (1 - dist / 120) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// Global functions for inline HTML calls
window.nav = nav;
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.switchSubtab = switchSubtab;
