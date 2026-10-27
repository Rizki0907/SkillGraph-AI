/**
 * SkillGraph-AI Master Research Data
 * Single Source of Truth for Web Dashboard
 * Team: Ditantang Habib (UNESA) - GEMATIK VI 2026
 */

const SKILLGRAPH_DATA = {
  project: {
    title: "SkillGraph-AI",
    subtitle: "Labor Market Intelligence & Wage Analytics Platform",
    competition: "Kompetisi Nasional GEMATIK VI 2026 — Cabang Data Science",
    organizer: "Fakultas Teknik dan Ilmu Komputer, Universitas Teknokrat Indonesia",
    theme: "Empowering Global Innovators for an Intelligent Future",
    teamName: "Ditantang Habib",
    university: "Universitas Negeri Surabaya (UNESA)",
    studyProgram: "S1 Sains Data, FMIPA",
    authors: [
      { name: "Rizki Piji Fathoni", nim: "24031554029", role: "Ketua Tim / Peneliti 1" },
      { name: "Rahmawati Dian Pratiwi", nim: "24031554183", role: "Anggota Tim / Peneliti 2" }
    ],
    lastUpdated: "2026-10-27"
  },

  kpis: {
    rawCorpus: 123849,
    cleanSample: 10000,
    extractedEntities: 221630,
    hdbscanClusters: 41,
    gmmComponents: 8,
    reconstructedNoise: 3341,
    featureDimensions: 614,
    stackingR2: 0.6638,
    stackingMAE: 19532,
    stackingRMSE: 27236,
    ablationErrorDropPct: 14.7,
    ablationMonetarySaving: 3541,
    quantilePICP: 67.72,
    quantileMPIW: 59987.17,
    hybridMedianSalary: 107930,
    coreMedianSalary: 90000
  },

  topBridgeSkills: [
    { rank: 1, text: "Project Management", type: "KNOWLEDGE", betweenness: 0.28070, pagerank: 0.02648, community: 0, degree: 0.8462, frequency: 276, note: "Bridge Skill #1: Jembatan utama antara rekayasa teknologi dan operasional bisnis" },
    { rank: 2, text: "Organized", type: "SKILL", betweenness: 0.25911, pagerank: 0.02434, community: 1, degree: 0.5897, frequency: 216, note: "Keahlian eksekutif organisasi tugas lintas fungsi" },
    { rank: 3, text: "Sales", type: "KNOWLEDGE", betweenness: 0.19163, pagerank: 0.01981, community: 2, degree: 0.5128, frequency: 178, note: "Domain komersial penghubung produk teknis ke pasar" },
    { rank: 4, text: "Accounting", type: "KNOWLEDGE", betweenness: 0.15250, pagerank: 0.02514, community: 1, degree: 0.4872, frequency: 164, note: "Pilar finansial tata kelola bisnis dan kepatuhan" },
    { rank: 5, text: "Motivated", type: "SKILL", betweenness: 0.14170, pagerank: 0.01824, community: 1, degree: 0.4359, frequency: 152, note: "Atribut kepemimpinan dan inisiatif personal" },
    { rank: 6, text: "Engineering", type: "KNOWLEDGE", betweenness: 0.13090, pagerank: 0.02469, community: 0, degree: 0.4615, frequency: 168, note: "Fondasi metodologi rekayasa sistem perangkat keras & lunak" },
    { rank: 7, text: "Communication Skills", type: "SKILL", betweenness: 0.12821, pagerank: 0.02536, community: 1, degree: 0.5385, frequency: 195, note: "Keterampilan artikulasi ide lintas divisi dan stakeholder" },
    { rank: 8, text: "Computer Science", type: "KNOWLEDGE", betweenness: 0.12011, pagerank: 0.02101, community: 0, degree: 0.4103, frequency: 142, note: "Fondasi komputasi, algoritma, dan rekayasa data" },
    { rank: 9, text: "Microsoft Office", type: "KNOWLEDGE", betweenness: 0.11201, pagerank: 0.02992, community: 2, degree: 0.5641, frequency: 210, note: "Perangkat lunak perkantoran esensial di sektor administrasi" },
    { rank: 10, text: "Excel", type: "KNOWLEDGE", betweenness: 0.08097, pagerank: 0.03654, community: 1, degree: 0.6154, frequency: 245, note: "Keahlian Ubiquitous #1: PageRank tertinggi di seluruh pasar kerja global" }
  ],

  noiseCascadeSummary: [
    {
      category: "Core Dense Cluster",
      totalJobs: 6659,
      pctOfTotal: 66.59,
      meanSalary: 103150,
      medianSalary: 90000,
      meanEntropy: 0.0080,
      meanConfidence: 0.9968,
      meanEntities: 8.24,
      badgeClass: "badge-core",
      description: "Lowongan kerja dengan profil okupasi homogen dan kepadatan semantik tinggi pada 41 klaster alami HDBSCAN."
    },
    {
      category: "Niche / Ultra-Specialized",
      totalJobs: 3319,
      pctOfTotal: 33.19,
      meanSalary: 103840,
      medianSalary: 93000,
      meanEntropy: 0.0226,
      meanConfidence: 0.9920,
      meanEntities: 8.50,
      badgeClass: "badge-niche",
      description: "Peran keahlian langka/spesifik (misal: bioinformatika, aktuaria forensik). Bukan derau rusak, melainkan klaster mikro berdensitas rendah."
    },
    {
      category: "Hybrid / Cross-Functional",
      totalJobs: 14,
      pctOfTotal: 0.14,
      meanSalary: 120532,
      medianSalary: 107930,
      meanEntropy: 0.7135,
      meanConfidence: 0.5349,
      meanEntities: 15.21,
      badgeClass: "badge-hybrid",
      description: "Bukti empiris Multidisciplinary Premium! Menguasai keahlian lintas domain, kepadatan entitas teknis tertinggi, dan kompensasi median tertinggi di pasar."
    },
    {
      category: "Generic Staffing / Boilerplate",
      totalJobs: 8,
      pctOfTotal: 0.08,
      meanSalary: 94959,
      medianSalary: 72550,
      meanEntropy: 0.7373,
      meanConfidence: 0.5261,
      meanEntities: 2.38,
      badgeClass: "badge-generic",
      description: "Deskripsi rekrutmen massal/boilerplate dengan sedikit kualifikasi teknis dan kompensasi median terendah di pasar."
    }
  ],

  ablationStudy: [
    {
      config: "Baseline 1: Fitur Terstruktur Saja",
      dimensions: 70,
      mae: 24052.09,
      rmse: 32444.27,
      r2: 0.5229,
      description: "Atribut tabular dasar (pengalaman, senioritas, lokasi TE, kata kunci biner)"
    },
    {
      config: "Baseline 2: Terstruktur + Teks Lepas",
      dimensions: 604,
      mae: 20576.10,
      rmse: 28347.68,
      r2: 0.6357,
      description: "Baseline 1 + Embedding SBERT (384-D) + Leksikal TF-IDF SVD (150-D)"
    },
    {
      config: "Proposed: SkillGraph-AI Full Sequential Fusion",
      dimensions: 614,
      mae: 20511.52,
      rmse: 28454.97,
      r2: 0.6330,
      description: "Baseline 2 + 10 Fitur Sekuensial Task A (NER & Bridge Skills) & Task B (Cascade Clusters & Entropy)"
    }
  ],

  modelComparison: [
    { model: "Stacking Ensemble (XGB + LGBM + RidgeCV)", r2: 0.6638, mae: 19532, rmse: 27236, status: "Pemenang Utama (Best Generalization)" },
    { model: "XGBoost (Optuna Tuned)", r2: 0.6604, mae: 19713, rmse: 27370, status: "Peringkat 2 Base Learner" },
    { model: "LightGBM (Optuna Tuned)", r2: 0.6533, mae: 19804, rmse: 27655, status: "Peringkat 3 Base Learner" }
  ],

  quantileMetrics: {
    picp: 67.72,
    targetPicp: 80.0,
    mpiw: 59987.17,
    pinballP10: 0.05101,
    pinballP90: 0.05810,
    description: "Evaluasi koridor upah P10 (batas pengaman) hingga P90 (plafon kompetitif) sesuai PP 36/2021"
  },

  topShapDrivers: [
    { feature: "interact_sen_loc", name: "Interaksi Senioritas × Lokasi", shapLog: 0.077171, marginalUsd: 7220.41, type: "Interaction", desc: "Dampak pengganda jenjang jabatan pada hub metropolitan berbiaya hidup tinggi" },
    { feature: "location_te", name: "Lokasi Kerja Terkalibrasi (TE)", shapLog: 0.059166, marginalUsd: 5485.63, type: "Geographic", desc: "Premi regional kota-kota teknologi utama (misal: Bay Area, New York)" },
    { feature: "tfidf_5", name: "Leksikal Arsitektur Sistem Lanjut", shapLog: 0.051133, marginalUsd: 4721.62, type: "Lexical", desc: "Istilah perancangan sistem terdistribusi, scalability, & arsitektur enterprise" },
    { feature: "tfidf_1", name: "Leksikal Rekayasa Komputasi & Data", shapLog: 0.039335, marginalUsd: 3610.74, type: "Lexical", desc: "Istilah rekayasa algoritma, big data pipelines, & komputasi awan" },
    { feature: "industry_te", name: "Sektor Industri Terkalibrasi (TE)", shapLog: 0.031388, marginalUsd: 2869.33, type: "Industry", desc: "Premi kompensasi sektor FinTech, SaaS, dan Bioteknologi" },
    { feature: "seniority_x_cluster_te", name: "Senioritas × Klaster Okupasi", shapLog: 0.030818, marginalUsd: 2816.42, type: "Interaction", desc: "Kenaikan upah jenjang karir lebih curam pada klaster rekayasa teknologi" },
    { feature: "interact_exp_ind", name: "Pengalaman × Industri", shapLog: 0.030131, marginalUsd: 2752.51, type: "Interaction", desc: "Spesialisasi pengalaman mendalam pada industri dengan barrier-to-entry tinggi" },
    { feature: "years_exp_req", name: "Tahun Pengalaman Kerja (per Tahun)", shapLog: 0.018459, marginalUsd: 1676.60, type: "Experience", desc: "Nilai tambah marjinal empiris untuk setiap 1 tahun pengalaman kerja tambahan" },
    { feature: "sbert_dim_142", name: "Vektor Kontekstual SBERT #142", shapLog: 0.016540, marginalUsd: 1501.20, type: "Semantic", desc: "Fitur semantik peranan kepemimpinan teknis dan inovasi produk" },
    { feature: "has_bridge_project_mgmt", name: "Kepemilikan Bridge Skill (Project Mgmt)", shapLog: 0.015210, marginalUsd: 1380.45, type: "Bridge Skill", desc: "Premi keahlian bridging yang menghubungkan teknologi dan eksekusi bisnis" },
    { feature: "ner_cert_count", name: "Kepemilikan Sertifikasi Profesional (CERT)", shapLog: 0.014890, marginalUsd: 1351.10, type: "Credential", desc: "Kredensial berstandar industri (misal: PMP, AWS, CISSP, CPA)" },
    { feature: "gmm_cluster_prob_2", name: "Probabilitas Klaster GMM #2 (Cloud/DevOps)", shapLog: 0.014120, marginalUsd: 1280.90, type: "Cluster", desc: "Afinitas lowongan pada domain arsitektur infrastruktur awan" },
    { feature: "cascade_entropy", name: "Entropi Shannon Cascade (Multidisiplin)", shapLog: 0.013500, marginalUsd: 1224.30, type: "Cascade", desc: "Derajat hibridisasi kompetensi yang melahirkan premi multidisipliner" },
    { feature: "ner_skill_count", name: "Kepadatan Entitas Keahlian (SKILL Count)", shapLog: 0.012100, marginalUsd: 1096.50, type: "Entity", desc: "Kelengkapan portofolio keahlian praktis yang dipersyaratkan" },
    { feature: "company_size_encoded", name: "Skala Ukuran Perusahaan", shapLog: 0.011800, marginalUsd: 1069.20, type: "Firm", desc: "Perusahaan skala enterprise memberikan paket remunerasi lebih tinggi" }
  ],

  clusterProfiles: [
    { id: 0, name: "Data Science & Advanced Analytics", medianSalary: 118000, meanEntities: 14.8, topSkills: ["Python", "Machine Learning", "SQL", "Statistics", "Computer Science"] },
    { id: 1, name: "Cloud Engineering & DevOps Infrastructure", medianSalary: 126000, meanEntities: 16.2, topSkills: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD", "Terraform"] },
    { id: 2, name: "Full-Stack Software Development", medianSalary: 112000, meanEntities: 13.5, topSkills: ["Java", "JavaScript", "React", "Node.js", "Git", "API Design"] },
    { id: 3, name: "Corporate Finance & Investment Banking", medianSalary: 104000, meanEntities: 11.2, topSkills: ["Accounting", "Financial Analysis", "Excel", "GAAP", "Valuation"] },
    { id: 4, name: "Enterprise Project & Product Management", medianSalary: 108000, meanEntities: 12.9, topSkills: ["Project Management", "Agile", "Scrum", "Roadmap", "Leadership"] },
    { id: 5, name: "Sales Strategy & Account Management", medianSalary: 82000, meanEntities: 8.7, topSkills: ["Sales", "CRM", "Negotiation", "B2B", "Client Relations"] },
    { id: 6, name: "Healthcare & Clinical Operations", medianSalary: 88000, meanEntities: 9.4, topSkills: ["Patient Care", "Healthcare Systems", "Compliance", "EMR", "Clinical"] },
    { id: 7, name: "Customer Support & Administrative Operations", medianSalary: 56000, meanEntities: 5.8, topSkills: ["Customer Service", "Data Entry", "Microsoft Office", "Communication"] }
  ],

  simulatorDefaults: {
    industries: [
      { id: "tech", name: "Information Technology & Services", teVal: 1.15, baseMid: 98000 },
      { id: "fintech", name: "Financial Services & Banking", teVal: 1.18, baseMid: 102000 },
      { id: "healthcare", name: "Healthcare & Life Sciences", teVal: 1.05, baseMid: 88000 },
      { id: "manufacturing", name: "Engineering & Manufacturing", teVal: 1.02, baseMid: 84000 },
      { id: "retail", name: "Retail, Wholesale & E-commerce", teVal: 0.92, baseMid: 72000 },
      { id: "consulting", name: "Management & Strategic Consulting", teVal: 1.14, baseMid: 96000 }
    ],
    seniorities: [
      { id: 0, name: "Entry Level (0-2 thn)", multiplier: 0.72, label: "Entry Level" },
      { id: 1, name: "Associate (2-4 thn)", multiplier: 0.85, label: "Associate" },
      { id: 2, name: "Mid-Senior Level (4-8 thn)", multiplier: 1.00, label: "Mid-Senior" },
      { id: 3, name: "Director / Principal (8-12 thn)", multiplier: 1.28, label: "Director" },
      { id: 4, name: "Executive / C-Suite (12+ thn)", multiplier: 1.55, label: "Executive" }
    ],
    locations: [
      { id: "sf_ny", name: "Tier 1 Hubs (Bay Area, New York, London)", mult: 1.25 },
      { id: "tier2", name: "Tier 2 Metropolitan (Austin, Seattle, Singapore, Sydney)", mult: 1.10 },
      { id: "tier3", name: "Standard Metropolitan (Dallas, Chicago, Berlin, Tokyo)", mult: 1.00 },
      { id: "remote", name: "Fully Remote / Global Distributed", mult: 0.95 },
      { id: "emerging", name: "Emerging Markets (Jakarta, Bangalore, Manila)", mult: 0.78 }
    ],
    skillCatalog: [
      { id: "pm", name: "Project Management", category: "bridge", premiumUsd: 6500, type: "KNOWLEDGE", isBridge: true },
      { id: "comm", name: "Communication Skills", category: "bridge", premiumUsd: 4200, type: "SKILL", isBridge: true },
      { id: "python", name: "Python Programming", category: "tech", premiumUsd: 5800, type: "SKILL" },
      { id: "sql", name: "SQL & Data Warehousing", category: "tech", premiumUsd: 4900, type: "SKILL" },
      { id: "ml", name: "Machine Learning / PyTorch", category: "tech", premiumUsd: 7200, type: "KNOWLEDGE" },
      { id: "aws", name: "AWS Cloud Infrastructure", category: "tech", premiumUsd: 6800, type: "KNOWLEDGE" },
      { id: "docker", name: "Docker & Kubernetes", category: "tech", premiumUsd: 5500, type: "SKILL" },
      { id: "arch", name: "Software / Enterprise Architecture", category: "tech", premiumUsd: 8400, type: "KNOWLEDGE" },
      { id: "sales", name: "B2B Sales & Business Development", category: "business", premiumUsd: 5100, type: "KNOWLEDGE" },
      { id: "accounting", name: "Accounting & Financial Modeling", category: "business", premiumUsd: 4600, type: "KNOWLEDGE" },
      { id: "excel", name: "Advanced Excel Modeling", category: "business", premiumUsd: 2800, type: "KNOWLEDGE" },
      { id: "cert_pmp", name: "PMP (Project Management Professional)", category: "cert", premiumUsd: 9200, type: "CERT" },
      { id: "cert_aws", name: "AWS Certified Solutions Architect", category: "cert", premiumUsd: 8500, type: "CERT" },
      { id: "cert_cissp", name: "CISSP (Cybersecurity Certification)", category: "cert", premiumUsd: 9800, type: "CERT" },
      { id: "cert_cpa", name: "CPA (Certified Public Accountant)", category: "cert", premiumUsd: 8900, type: "CERT" }
    ]
  }
};

window.SKILLGRAPH_DATA = SKILLGRAPH_DATA;
console.log("SkillGraph-AI Master Data loaded successfully.");
