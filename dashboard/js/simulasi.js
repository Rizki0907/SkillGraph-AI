/**
 * SkillGraph-AI Interactive Simulation Engine
 * Computes Wage Corridor (P10, P50, P90), Cascade Archetype,
 * Multidisciplinary Premium, and Bridge Skill Recommendations.
 */

function initSimulator() {
  const industrySelect = document.getElementById('sim-industry');
  const locationSelect = document.getElementById('sim-location');
  const senioritySelect = document.getElementById('sim-seniority');
  const expSlider = document.getElementById('sim-exp-slider');
  const expValBadge = document.getElementById('sim-exp-badge');
  const skillsContainer = document.getElementById('sim-skills-container');

  if (!industrySelect || !skillsContainer) return;

  // Populate Industries
  industrySelect.innerHTML = SKILLGRAPH_DATA.simulatorDefaults.industries.map(ind => 
    `<option value="${ind.id}">${ind.name}</option>`
  ).join('');

  // Populate Locations
  locationSelect.innerHTML = SKILLGRAPH_DATA.simulatorDefaults.locations.map(loc => 
    `<option value="${loc.id}">${loc.name}</option>`
  ).join('');

  // Populate Seniorities
  senioritySelect.innerHTML = SKILLGRAPH_DATA.simulatorDefaults.seniorities.map(sen => 
    `<option value="${sen.id}" ${sen.id === 2 ? 'selected' : ''}>${sen.name}</option>`
  ).join('');

  // Populate Skills Checkbox Grid
  skillsContainer.innerHTML = SKILLGRAPH_DATA.simulatorDefaults.skillCatalog.map(skill => `
    <label class="skill-check-item" data-category="${skill.category}">
      <input type="checkbox" value="${skill.id}" ${skill.isBridge ? 'data-bridge="true"' : ''} onchange="calculateSimulation()">
      <span class="skill-check-label">${skill.name}</span>
      <span class="skill-check-badge">+${formatUSD(skill.premiumUsd)}</span>
    </label>
  `).join('');

  // Slider change listener
  expSlider.addEventListener('input', (e) => {
    expValBadge.textContent = `${e.target.value} Tahun`;
    calculateSimulation();
  });

  // Event listeners for select changes
  [industrySelect, locationSelect, senioritySelect].forEach(el => {
    el.addEventListener('change', calculateSimulation);
  });

  // Initial calculation
  calculateSimulation();
}

function calculateSimulation() {
  const indId = document.getElementById('sim-industry').value;
  const locId = document.getElementById('sim-location').value;
  const senId = parseInt(document.getElementById('sim-seniority').value);
  const yearsExp = parseFloat(document.getElementById('sim-exp-slider').value);

  // Selected skills
  const checkedBoxes = Array.from(document.querySelectorAll('#sim-skills-container input[type="checkbox"]:checked'));
  const selectedSkillIds = checkedBoxes.map(cb => cb.value);

  const indObj = SKILLGRAPH_DATA.simulatorDefaults.industries.find(i => i.id === indId) || SKILLGRAPH_DATA.simulatorDefaults.industries[0];
  const locObj = SKILLGRAPH_DATA.simulatorDefaults.locations.find(l => l.id === locId) || SKILLGRAPH_DATA.simulatorDefaults.locations[0];
  const senObj = SKILLGRAPH_DATA.simulatorDefaults.seniorities.find(s => s.id === senId) || SKILLGRAPH_DATA.simulatorDefaults.seniorities[2];

  // Base wage from industry, location, and seniority multipliers
  let baseSalary = indObj.baseMid * locObj.mult * senObj.multiplier;

  // Marginal Experience Impact (+ $1,676.60 / year from SHAP ground truth)
  const expImpact = yearsExp * 1676.60;

  // Selected Skills Impact
  let skillsTotalPremium = 0;
  let countTech = 0;
  let countBusiness = 0;
  let countBridge = 0;
  let countCert = 0;

  selectedSkillIds.forEach(id => {
    const item = SKILLGRAPH_DATA.simulatorDefaults.skillCatalog.find(s => s.id === id);
    if (item) {
      skillsTotalPremium += item.premiumUsd;
      if (item.category === 'tech') countTech++;
      if (item.category === 'business') countBusiness++;
      if (item.category === 'bridge') countBridge++;
      if (item.category === 'cert') countCert++;
    }
  });

  // Non-linear interaction bonuses (from SHAP findings)
  let interactionBonus = 0;
  // Seniority x Location interaction (+ $7,220 if senior in tier 1 hub)
  if (senId >= 2 && locId === 'sf_ny') {
    interactionBonus += 7220.41;
  }
  // Experience x Industry interaction
  if (yearsExp >= 5 && (indId === 'tech' || indId === 'fintech')) {
    interactionBonus += 2752.51;
  }

  // Calculate Cascade Archetype & Shannon Entropy
  let archetype = "Core Dense Cluster";
  let badgeClass = "badge-core";
  let entropyVal = 0.008;
  let isHybrid = false;

  const totalSkillsCount = selectedSkillIds.length;

  if (countTech >= 2 && countBusiness >= 1) {
    // Cross-functional / Multidisciplinary!
    archetype = "Hybrid / Cross-Functional";
    badgeClass = "badge-hybrid";
    entropyVal = 0.7135;
    isHybrid = true;
  } else if (countCert >= 1 && (countTech >= 3 || countBusiness >= 3)) {
    archetype = "Niche / Ultra-Specialized";
    badgeClass = "badge-niche";
    entropyVal = 0.0226;
  } else if (totalSkillsCount <= 1 && yearsExp <= 2) {
    archetype = "Generic Staffing / Boilerplate";
    badgeClass = "badge-generic";
    entropyVal = 0.7373;
  }

  // Multidisciplinary Premium (+14% bonus if Hybrid role detected, based on empirical finding $107.9k vs $90k)
  let hybridBonus = 0;
  if (isHybrid) {
    hybridBonus = 17930;
  }

  // Final Median Predicted Salary (P50)
  const salaryP50 = Math.round(baseSalary + expImpact + skillsTotalPremium + interactionBonus + (isHybrid ? hybridBonus * 0.5 : 0));

  // Quantile Corridor Bounds (P10 and P90 calibrated to match empirical MPIW ~$59,987)
  const salaryP10 = Math.round(salaryP50 * 0.78);
  const salaryP90 = Math.round(salaryP50 * 1.32);
  const intervalWidth = salaryP90 - salaryP10;

  // Update DOM Elements with full economic breakdown
  updateSimulatorDOM({
    salaryP10,
    salaryP50,
    salaryP90,
    intervalWidth,
    archetype,
    badgeClass,
    entropyVal,
    isHybrid,
    selectedSkillIds,
    countTech,
    countBusiness,
    baseSalary,
    expImpact,
    locMult: locObj.mult,
    locName: locObj.id === 'sf_ny' ? 'Tier 1 Hubs' : locObj.id === 'tier2' ? 'Tier 2 Metro' : locObj.id === 'tier3' ? 'Tier 3 Metro' : locObj.id === 'remote' ? 'Remote' : 'Emerging',
    skillsTotalPremium
  });
}

function updateSimulatorDOM(data) {
  const p50El = document.getElementById('res-p50-val');
  const p10El = document.getElementById('res-p10-val');
  const p90El = document.getElementById('res-p90-val');
  const widthEl = document.getElementById('res-width-val');
  const archetypeBadge = document.getElementById('res-archetype-badge');
  const entropyEl = document.getElementById('res-entropy-val');
  const hybridBox = document.getElementById('res-hybrid-box');
  const bridgeRecContainer = document.getElementById('res-bridge-recommendations');

  // Breakdown elements
  const breakdownBase = document.getElementById('breakdown-base-val');
  const breakdownExp = document.getElementById('breakdown-exp-val');
  const breakdownLoc = document.getElementById('breakdown-loc-val');
  const breakdownSkill = document.getElementById('breakdown-skill-val');

  if (breakdownBase && data.baseSalary) breakdownBase.textContent = `${formatUSD(data.baseSalary)} / thn`;
  if (breakdownExp && data.expImpact !== undefined) breakdownExp.textContent = `+${formatUSD(data.expImpact)} / thn`;
  if (breakdownLoc && data.locMult) breakdownLoc.textContent = `× ${data.locMult.toFixed(2)} (${data.locName || 'Hub'})`;
  if (breakdownSkill && data.skillsTotalPremium !== undefined) breakdownSkill.textContent = `+${formatUSD(data.skillsTotalPremium)} / thn`;

  if (p50El) p50El.textContent = formatUSD(data.salaryP50);
  if (p10El) p10El.textContent = formatUSD(data.salaryP10);
  if (p90El) p90El.textContent = formatUSD(data.salaryP90);
  if (widthEl) widthEl.textContent = `Rentang Negosiasi (MPIW): ${formatUSD(data.intervalWidth)}/thn`;

  if (archetypeBadge) {
    archetypeBadge.className = `badge ${data.badgeClass}`;
    archetypeBadge.textContent = data.archetype;
  }

  if (entropyEl) {
    entropyEl.textContent = `Entropi Shannon: ${data.entropyVal.toFixed(4)}`;
  }

  if (hybridBox) {
    if (data.isHybrid) {
      hybridBox.style.display = 'flex';
    } else {
      hybridBox.style.display = 'none';
    }
  }

  // Dynamic Bridge Skill Recommendations
  if (bridgeRecContainer) {
    const unselectedSkills = SKILLGRAPH_DATA.simulatorDefaults.skillCatalog.filter(
      s => !data.selectedSkillIds.includes(s.id)
    );

    let recs = [];
    const hasPM = data.selectedSkillIds.includes('pm');
    const hasComm = data.selectedSkillIds.includes('comm');

    if (!hasPM) {
      recs.push({
        title: "Project Management",
        type: "Bridge Skill #1 (Betweenness: 0.2807)",
        desc: "Keahlian jembatan utama untuk menghubungkan keahlian teknis dengan eksekusi bisnis strategis.",
        gain: "+$6,500/thn"
      });
    }

    if (!hasComm) {
      recs.push({
        title: "Communication Skills",
        type: "Cross-Disciplinary Bridge (Betweenness: 0.1282)",
        desc: "Menjembatani penyampaian insight komputasi ke pengambil keputusan eksekutif.",
        gain: "+$4,200/thn"
      });
    }

    const unselectedCerts = unselectedSkills.filter(s => s.category === 'cert');
    if (unselectedCerts.length > 0 && recs.length < 3) {
      const topCert = unselectedCerts[0];
      recs.push({
        title: topCert.name,
        type: "High-ROI Certification",
        desc: "Sertifikasi industri terverifikasi untuk mendongkrak plafon negosiasi upah menuju kuantil P90.",
        gain: `+${formatUSD(topCert.premiumUsd)}/thn`
      });
    }

    bridgeRecContainer.innerHTML = recs.map(r => `
      <div class="bridge-rec-item">
        <div>
          <div class="bridge-rec-name">${r.title}</div>
          <div class="bridge-rec-desc">${r.type} • ${r.desc}</div>
        </div>
        <div class="bridge-rec-val">${r.gain}</div>
      </div>
    `).join('');
  }
}

function formatUSD(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(num);
}

window.initSimulator = initSimulator;
window.calculateSimulation = calculateSimulation;
