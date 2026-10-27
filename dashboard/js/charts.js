/**
 * SkillGraph-AI Chart & Visualization Engine
 * Renders interactive visualizations and manages Plotly embeds
 */

let chartInstances = {};

function initCharts() {
  renderBridgeSkillsChart();
  renderAblationChart();
  renderCascadeChart();
  renderShapBarChart();
}

function renderBridgeSkillsChart() {
  const canvas = document.getElementById('chart-bridge-skills');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const labels = SKILLGRAPH_DATA.topBridgeSkills.map(s => s.text);
  const betweennessData = SKILLGRAPH_DATA.topBridgeSkills.map(s => s.betweenness);
  const pagerankData = SKILLGRAPH_DATA.topBridgeSkills.map(s => s.pagerank * 10); // Scaled for comparison

  if (chartInstances.bridgeSkills) chartInstances.bridgeSkills.destroy();

  chartInstances.bridgeSkills = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Betweenness Centrality (Bridge Power)',
          data: betweennessData,
          backgroundColor: 'rgba(0, 210, 255, 0.75)',
          borderColor: '#00d2ff',
          borderWidth: 1,
          borderRadius: 6
        },
        {
          label: 'PageRank Centrality (Ubiquitous Core ×10)',
          data: pagerankData,
          backgroundColor: 'rgba(16, 185, 129, 0.75)',
          borderColor: '#10b981',
          borderWidth: 1,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: getComputedStyle(document.body).getPropertyValue('--text-primary').trim(), font: { family: 'Plus Jakarta Sans', size: 12 } }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const val = context.raw;
              if (context.datasetIndex === 1) {
                return `PageRank Aktual: ${(val / 10).toFixed(5)}`;
              }
              return `Betweenness: ${val.toFixed(5)}`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim(), font: { size: 11 } },
          grid: { display: false }
        },
        y: {
          ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        }
      }
    }
  });
}

function renderAblationChart() {
  const canvas = document.getElementById('chart-ablation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const labels = ['Baseline 1 (70-D)', 'Baseline 2 (604-D)', 'SkillGraph-AI (614-D)'];
  const maeData = SKILLGRAPH_DATA.ablationStudy.map(a => a.mae);

  if (chartInstances.ablation) chartInstances.ablation.destroy();

  chartInstances.ablation = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Mean Absolute Error (USD/thn) — Makin Rendah Makin Akurat',
        data: maeData,
        backgroundColor: [
          'rgba(148, 163, 184, 0.65)',
          'rgba(96, 165, 250, 0.75)',
          'rgba(0, 210, 255, 0.9)'
        ],
        borderColor: ['#94a3b8', '#60a5fa', '#00d2ff'],
        borderWidth: 1.5,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: getComputedStyle(document.body).getPropertyValue('--text-primary').trim() }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `MAE: $${context.raw.toLocaleString()} (-14.7% pada Full Model)`;
            }
          }
        }
      },
      scales: {
        x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() }, grid: { display: false } },
        y: {
          min: 15000,
          max: 26000,
          ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        }
      }
    }
  });
}

function renderCascadeChart() {
  const canvas = document.getElementById('chart-cascade');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const labels = SKILLGRAPH_DATA.noiseCascadeSummary.map(c => c.category);
  const salaryData = SKILLGRAPH_DATA.noiseCascadeSummary.map(c => c.medianSalary);

  if (chartInstances.cascade) chartInstances.cascade.destroy();

  chartInstances.cascade = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Median Kompensasi Pasar (USD/tahun)',
        data: salaryData,
        backgroundColor: [
          'rgba(59, 130, 246, 0.75)',
          'rgba(245, 158, 11, 0.75)',
          'rgba(139, 92, 246, 0.9)',
          'rgba(100, 116, 139, 0.6)'
        ],
        borderColor: ['#3b82f6', '#f59e0b', '#8b5cf6', '#64748b'],
        borderWidth: 1.5,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: getComputedStyle(document.body).getPropertyValue('--text-primary').trim() }
        },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              if (context.dataIndex === 2) {
                return '✨ Multidisciplinary Premium Tertinggi!';
              }
              return '';
            }
          }
        }
      },
      scales: {
        x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim(), font: { size: 10 } }, grid: { display: false } },
        y: {
          min: 50000,
          max: 130000,
          ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        }
      }
    }
  });
}

function renderShapBarChart() {
  const canvas = document.getElementById('chart-shap');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const top10 = SKILLGRAPH_DATA.topShapDrivers.slice(0, 10);
  const labels = top10.map(d => d.name);
  const values = top10.map(d => d.marginalUsd);

  if (chartInstances.shap) chartInstances.shap.destroy();

  chartInstances.shap = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        axis: 'y',
        label: 'Nilai Marjinal Ekonomi (USD/tahun)',
        data: values,
        backgroundColor: 'rgba(0, 210, 255, 0.8)',
        borderColor: '#00d2ff',
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: getComputedStyle(document.body).getPropertyValue('--text-primary').trim() }
        }
      },
      scales: {
        x: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim() }, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
        y: { ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary').trim(), font: { size: 10.5 } }, grid: { display: false } }
      }
    }
  });
}

// Refresh all charts on theme toggle
window.refreshAllCharts = function() {
  setTimeout(() => {
    initCharts();
  }, 200);
};

window.initCharts = initCharts;
