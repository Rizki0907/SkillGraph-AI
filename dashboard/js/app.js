/**
 * SkillGraph-AI Application Controller
 * Manages SPA Routing, Themes, Boot Sequence, Particle Canvas, 3D Graph Mesh, and UI Events
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBootSequence();
  initParticleCanvas();
  init3DGraphMesh();
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

  // Dynamic Logo Swap across Navbar and Hero Banner
  const brandLogos = document.querySelectorAll('.brand-logo-img, .boot-logo-img, .hero-brand-logo-img');
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
    { text: ">>> Initializing SkillGraph-AI Subsystem [Dual T4 GPU Mode]...", delay: 150, pct: 15 },
    { text: ">>> Loading Tokenizer & Checkpoint: jjzha/jobbert-base-cased [OK]", delay: 350, pct: 35 },
    { text: ">>> Loading PMI Competency Graph & 40 Technical Entities [OK]", delay: 600, pct: 55 },
    { text: ">>> Reconstructing 3,341 HDBSCAN Noise Postings via GMM Cascade [OK]", delay: 850, pct: 75 },
    { text: ">>> Initializing 614-D Multimodal Feature Matrix & Stacking Ensemble [OK]", delay: 1100, pct: 90 },
    { text: ">>> Quantum Quantile Corridors (P10, P50, P90) & TreeSHAP Engine: READY", delay: 1300, pct: 100, success: true }
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
  }, 1600);
}

/* ==============================================================================
   INTERACTIVE 3D KNOWLEDGE GRAPH HOLOGRAM STAGE
   ============================================================================== */
function init3DGraphMesh() {
  const canvas = document.getElementById('graph-mesh-canvas');
  const stage = document.getElementById('graph-stage');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width = canvas.height = 340;
  const center = size / 2;
  const fov = 280;

  // 3D Nodes Definition
  const nodes = [
    { id: 0, label: "SkillGraph-AI", x: 0, y: 0, z: 0, isCore: true, radius: 8, color: '#00d2ff' },
    { id: 1, label: "Project Mgmt", x: 0, y: -80, z: 45, isBridge: true, radius: 6.5, color: '#10b981' },
    { id: 2, label: "Python", x: -75, y: -35, z: -35, radius: 5.5, color: '#00d2ff' },
    { id: 3, label: "AWS Cloud", x: 75, y: -35, z: -35, radius: 5.5, color: '#0066ff' },
    { id: 4, label: "Machine Learning", x: -55, y: 50, z: 40, radius: 5.5, color: '#8b5cf6' },
    { id: 5, label: "Accounting", x: 55, y: 50, z: 40, radius: 5, color: '#f59e0b' },
    { id: 6, label: "Sales", x: -80, y: 5, z: 50, radius: 5, color: '#f59e0b' },
    { id: 7, label: "Communication", x: 80, y: 5, z: 50, isBridge: true, radius: 5.5, color: '#10b981' },
    { id: 8, label: "Computer Sci", x: 0, y: 85, z: -45, radius: 5, color: '#00d2ff' },
    { id: 9, label: "Docker/DevOps", x: -40, y: -65, z: -55, radius: 4.8, color: '#0066ff' },
    { id: 10, label: "Excel", x: 40, y: -65, z: -55, radius: 5.2, color: '#10b981' }
  ];

  // 3D Connecting Edges
  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10],
    [1, 2], [1, 3], [1, 6], [1, 5], [1, 7], // Project Management Bridging
    [2, 4], [2, 8], [2, 9], // Python Tech Stack
    [3, 9], [3, 8], // Cloud Stack
    [5, 6], [5, 10], [6, 7] // Business Stack
  ];

  let rotX = -0.15;
  let rotY = 0;
  let targetRotX = -0.15;
  let targetRotY = 0;
  let pulsePhase = 0;

  if (stage) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 1.8;
      targetRotX = -ny * 1.8;
    });

    stage.addEventListener('mouseleave', () => {
      targetRotX = -0.15;
    });
  }

  function render() {
    ctx.clearRect(0, 0, size, size);

    // Auto idle rotation
    targetRotY += 0.006;
    rotX += (targetRotX - rotX) * 0.08;
    rotY += (targetRotY - rotY) * 0.08;
    pulsePhase += 0.04;

    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    // Project 3D to 2D
    const projected = nodes.map(n => {
      // Rotation X
      let y1 = n.y * Math.cos(rotX) - n.z * Math.sin(rotX);
      let z1 = n.y * Math.sin(rotX) + n.z * Math.cos(rotX);
      // Rotation Y
      let x2 = n.x * Math.cos(rotY) + z1 * Math.sin(rotY);
      let z2 = -n.x * Math.sin(rotY) + z1 * Math.cos(rotY);

      let scale = fov / (fov + z2 + 80);
      let sx = center + x2 * scale;
      let sy = center + y1 * scale;

      return { ...n, sx, sy, sz: z2, scale };
    });

    // Draw Edges with depth sorting
    edges.forEach(([i1, i2]) => {
      const p1 = projected[i1];
      const p2 = projected[i2];
      const avgZ = (p1.sz + p2.sz) / 2;
      const alpha = Math.max(0.12, Math.min(0.7, 0.45 + (avgZ / 140) * 0.35));

      ctx.beginPath();
      ctx.moveTo(p1.sx, p1.sy);
      ctx.lineTo(p2.sx, p2.sy);
      ctx.strokeStyle = isDark ? `rgba(0, 210, 255, ${alpha})` : `rgba(2, 132, 199, ${alpha * 0.8})`;
      ctx.lineWidth = (p1.isCore || p2.isCore || p1.isBridge || p2.isBridge) ? 1.6 : 0.9;
      ctx.stroke();

      // Traveling Synaptic Energy Pulse
      let pulseProg = (pulsePhase + (i1 * 0.35 + i2 * 0.25)) % 1;
      let px = p1.sx + (p2.sx - p1.sx) * pulseProg;
      let py = p1.sy + (p2.sy - p1.sy) * pulseProg;
      ctx.beginPath();
      ctx.arc(px, py, 1.8 * p1.scale, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.9)' : 'rgba(16, 185, 129, 0.9)';
      ctx.fill();
    });

    // Sort nodes back-to-front
    const sortedNodes = [...projected].sort((a, b) => a.sz - b.sz);

    // Draw Nodes
    sortedNodes.forEach(p => {
      const r = p.radius * p.scale;
      // Outer Glow Halo
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, r * (p.isCore ? 2.4 : 1.7), 0, Math.PI * 2);
      ctx.fillStyle = p.isCore ? (isDark ? 'rgba(0, 210, 255, 0.25)' : 'rgba(2, 132, 199, 0.2)') : (isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(5, 150, 105, 0.15)');
      ctx.fill();

      // Solid Node Circle
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.isCore ? 14 : 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label Text for Key Nodes
      if (p.isCore || p.isBridge || p.sz > -20) {
        ctx.font = `${p.isCore ? 'bold 11.5px' : '600 9.5px'} Plus Jakarta Sans, sans-serif`;
        ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText(p.label, p.sx, p.sy - (r + 4));
      }
    });

    requestAnimationFrame(render);
  }

  render();
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
      panel.style.display = 'block';
    } else {
      panel.classList.remove('active');
      panel.style.display = 'none';
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
