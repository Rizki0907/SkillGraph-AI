# AGENTS.md — Single Source of Truth: Proyek GEMATIK VI 2026

Dokumen ini merupakan ringkasan eksekutif, pedoman metodologi, dan repositori data empiris resmi untuk proyek **SkillGraph-AI** dalam rangka **Kompetisi Nasional GEMATIK VI 2026 Cabang Data Science**. Seluruh data, angka metrik, dan parameter di bawah ini bersumber langsung dari hasil eksekusi aktual pada notebook `GEMATIK_VI_SkillGraph_AI_Final.ipynb` di Kaggle Cloud Platform (Akselerator Dual GPU T4 x 2).

---

## 1. Identitas Riset, Tim, dan Kompetisi

| Parameter | Informasi Resmi |
|---|---|
| **Nama Kompetisi** | Kompetisi Nasional GEMATIK VI 2026 — Cabang Data Science |
| **Penyelenggara** | Fakultas Teknik dan Ilmu Komputer, Universitas Teknokrat Indonesia |
| **Tema Lomba** | *"Empowering Global Innovators for an Intelligent Future"* |
| **Judul Penelitian** | **SkillGraph-AI: Arsitektur Multi-Task NLP Sekuensial Berbasis Self-Trained JobBERT NER, Two-Stage HDBSCAN-GMM Cascade Clustering, Analisis Topologi Graf Kompetensi, dan Explainable Quantile Stacking Ensemble untuk Intelijen Pasar Kerja Global** |
| **Nama Tim** | **Ditantang Habib** |
| **Ketua / Peneliti 1** | **Rizki Piji Fathoni** (NIM: 24031554029) |
| **Anggota / Peneliti 2** | **Rahmawati Dian Pratiwi** (NIM: 24031554183) |
| **Institusi** | Program Studi S1 Sains Data, Fakultas Matematika dan Ilmu Pengetahuan Alam, Universitas Negeri Surabaya (UNESA) |
| **Kriteria Penilaian** | 1. Keaslian Gagasan (20%)<br>2. Kebaruan Dataset & Metode (20%)<br>3. Manfaat / Dampak Nyata (20%)<br>4. Kejelasan & Sistematika (20%)<br>5. Kelengkapan Karya (20%) |

---

## 2. Penyelarasan SDGs dan Regulasi Nasional

1. **SDG 4 (Pendidikan Berkualitas):**  
   Menjembatani *curriculum-market mismatch* dengan mengungkap *Bridge Skills* lintas disiplin melalui analisis sentralitas graf PMI. Pendidikan vokasi dan kurikulum tinggi dapat mengintegrasikan keahlian jembatan ini guna memaksimalkan daya serap lulusan.
2. **SDG 8 (Pekerjaan Layak dan Pertumbuhan Ekonomi):**  
   Menyediakan estimasi rentang kompensasi objektif ($P_{10}, P_{50}, P_{90}$) dan valuasi marjinal per keahlian (USD/tahun), selaras dengan mandat penyusunan **Struktur dan Skala Upah Objektif** sesuai **Peraturan Pemerintah (PP) No. 36 Tahun 2021 tentang Pengupahan** dan UU Ketenagakerjaan.
3. **SDG 9 (Industri, Inovasi, dan Infrastruktur):**  
   Modernisasi taksonomi okupasi dan profil kompetensi nasional (penyempurnaan Klasifikasi Baku Jabatan Indonesia / KBJI) berbasis penambangan data lowongan kerja teks bebas secara terotomatisasi.
4. **SDG 17 (Kemitraan untuk Mencapai Tujuan):**  
   Membangun transparansi informasi pasar tenaga kerja yang dapat diakses oleh pemerintah, perguruan tinggi, industri perekrut, dan pencari kerja guna mereduksi asimetri informasi ketenagakerjaan.

---

## 3. Dataset dan Korpus Multimodal

* **Sumber Primer:** LinkedIn Job Postings 2023–2024 Corpus ($N = 123.849$ baris data mentah).
* **Sampel Baseline Representatif:** $N = 10.000$ lowongan kerja representatif terstratifikasi dengan teks deskripsi $\ge 30$ kata dan validasi kompensasi USD (\$15.000 – \$600.000/tahun).
* **Anotasi Token Emas (Gold-Standard):** 1.000 kalimat manual menggunakan Label Studio berstandar token BIO sertifikasi (`O`, `B-CERT`, `I-CERT`).
* **Pseudo-Labeling Self-Training:** 5.000 kalimat tambahan dari unlabeled pool pada confidence threshold $\tau = 0.85$.
* **Total Entitas Terstruktur Terpapar:** **221.630 span entitas** terbagi ke dalam 3 kelas ontologi (`SKILL`, `KNOWLEDGE`, `CERT`).

---

## 4. Hasil Empiris Resmi per Milestone Metodologi (Ground Truth)

### A. Task A — Sequence Tagging & Analisis Topologi Graf PMI
* **Evaluasi JobBERT Token Classifier:**
  * Token-Level Validation F1 (Round 0): **0.4805**
  * Strict Span-Level Exact Match F1 (`seqeval`): **0.2727** (Precision: 0.2500, Recall: 0.3000 pada 60 gold test spans imbalanced).
* **Top 10 Bridge Skills (Betweenness Centrality Tertinggi pada Graf PMI):**
  1. `Project Management` — Betweenness: **0.28070** | PageRank: 0.02648 | Komunitas: 0 (Bridge Utama Lintas Disiplin)
  2. `Organized` — Betweenness: **0.25911** | PageRank: 0.02434 | Komunitas: 1
  3. `Sales` — Betweenness: **0.19163** | PageRank: 0.01981 | Komunitas: 2
  4. `Accounting` — Betweenness: **0.15250** | PageRank: 0.02514 | Komunitas: 1
  5. `Motivated` — Betweenness: **0.14170** | PageRank: 0.01824 | Komunitas: 1
  6. `Engineering` — Betweenness: **0.13090** | PageRank: 0.02469 | Komunitas: 0
  7. `Communication Skills` — Betweenness: **0.12821** | PageRank: 0.02536 | Komunitas: 1
  8. `Computer Science` — Betweenness: **0.12011** | PageRank: 0.02101 | Komunitas: 0
  9. `Microsoft Office` — Betweenness: **0.11201** | PageRank: 0.02992 | Komunitas: 2
  10. `Excel` — Betweenness: **0.08097** | PageRank: **0.03654** (Keahlian Ubiquitous dengan PageRank Tertinggi)

---

### B. Task B — Two-Stage HDBSCAN-GMM Cascade Clustering
* **Evaluasi Baseline Klastering:**
  * HDBSCAN: 41 Klaster | Silhouette: **0.5457** | Davies-Bouldin: **0.5815** | Calinski-Harabasz: **7354.18** | DBCV: **0.2056** | Cakupan: 66.6% (Noise: 33.4% / 3.341 data).
  * GMM: 8 Komponen Optimal (BIC: -2.019.337) | Silhouette: **0.4033** | Davies-Bouldin: **1.5831** | Cakupan: 100%.
* **Dekomposisi Ilmiah Titik Noise (Cascade Sub-types via Shannon Entropy):**
  * **Core Dense Clusters:** 6.659 lowongan | Gaji Median: \$90.000 | Entitas Teknis: 8,24 | Entropi: 0,0080
  * **Niche / Ultra-Specialized Roles:** 3.319 lowongan | Gaji Median: \$93.000 | Entitas Teknis: 8,50 | Entropi: 0,0226 | Confidence: 99,2%
  * **Hybrid / Cross-Functional Roles:** 14 lowongan | Gaji Median: **\$107.930** (Tertinggi!) | Entitas Teknis: **15,21** (Tertinggi!) | Entropi: 0,7135
  * **Generic Staffing / Boilerplate Postings:** 8 lowongan | Gaji Median: \$72.550 (Terendah) | Entitas Teknis: 2,38 (Terendah) | Entropi: 0,7373

---

### C. Task C — True Sequential Feature Fusion & Regresi Stacking Ensemble
* **Dimensi Matriks Representasi Terpadu:**
  * 80 Fitur Terstruktur & Domain (Task A + Task B) + 384 Dimensi SBERT + 150 Dimensi TF-IDF SVD = **614 Dimensi**.
  * Pembagian Data: Train = 6.807 baris, Validation = 1.459 baris, Test = 1.459 baris (Zero Data Leakage).
* **Evaluasi Model pada Unseen Held-out Test Set:**
  * **Stacking Ensemble (XGBoost + LightGBM + RidgeCV):** **$R^2 = 0.6638$** | **$\text{MAE} = \$19.532$** | **$\text{RMSE} = \$27.236$** (Pemenang Utama).
  * **XGBoost (Optuna Tuned):** $R^2 = 0.6604$ | $\text{MAE} = \$19.713$ | $\text{RMSE} = \$27.370$
  * **LightGBM (Optuna Tuned):** $R^2 = 0.6533$ | $\text{MAE} = \$19.804$ | $\text{RMSE} = \$27.655$
* **Ablation Study Empiris:**
  * Baseline 1 (Structured 70-D): $R^2 = 0.5229$ | $\text{MAE} = \$24.052$ | $\text{RMSE} = \$32.444$
  * Baseline 2 (Structured + Text 604-D): $R^2 = 0.6357$ | $\text{MAE} = \$20.576$ | $\text{RMSE} = \$28.348$
  * **Proposed SkillGraph-AI Full (614-D):** $R^2 = 0.6330$ | $\text{MAE} = \mathbf{\$20.511}$ | $\text{RMSE} = \$28.455$  
  *(Reduksi error sebesar **\$3.541/tahun (-14,7%)** dibandingkan Baseline 1).*
* **Quantile Regression ($P_{10}, P_{50}, P_{90}$):**
  * PICP Coverage: **67,72%** (Target: $\sim 80\%$)
  * Mean Prediction Interval Width (MPIW): **\$59.987,17/tahun**
  * Pinball Loss $\alpha=0.10$: **0.05101** | Pinball Loss $\alpha=0.90$: **0.05810**
* **SHAP Marginal Economic Valuation (Top Market Drivers dalam USD/tahun):**
  1. Interaksi Senioritas $\times$ Lokasi (`interact_sen_loc`): **+\$7.220,41/tahun**
  2. Lokasi Target-Encoded (`location_te`): **+\$5.485,63/tahun**
  3. Leksikal Arsitektur Tingkat Lanjut (`tfidf_5`): **+\$4.721,62/tahun**
  4. Leksikal Rekayasa Komputasi (`tfidf_1`): **+\$3.610,74/tahun**
  5. Sektor Industri Target-Encoded (`industry_te`): **+\$2.869,33/tahun**
  6. Interaksi Senioritas $\times$ Klaster Kerja (`seniority_x_cluster_te`): **+\$2.816,42/tahun**
  7. Interaksi Pengalaman $\times$ Industri (`interact_exp_ind`): **+\$2.752,51/tahun**
  8. Pengalaman Kerja per Tahun (`years_exp_req`): **+\$1.676,60/tahun**

---

## 5. Direktori dan Artefak Resmi Hasil Ekspor

Seluruh file di bawah ini dihasilkan secara otomatis dan tersimpan di dalam arsip master:
**`GEMATIK_VI_SkillGraph_All_Outputs.zip` (129,4 MB)**

1. **Tabel Evaluasi CSV (`exports/tables_csv/`):**
   * `ner_span_classification_report.csv` (Metrik span-level JobBERT).
   * `top_bridge_skills.csv` (10 Bridge skills sentralitas graf).
   * `full_ner_centrality.csv` (Sentralitas lengkap 40 entitas teknis).
   * `noise_cascade_summary.csv` (Ringkasan dekomposisi klaster cascade).
   * `table_ablation_study.csv` (Hasil komparasi 3 konfigurasi eksperimen).
   * `table_quantile_metrics.csv` (Metrik interval cakupan PICP & MPIW).
   * `table_shap_monetary_valuation.csv` (Valuasi marjinal per keahlian USD/thn).
   * `master_jobs_enriched.csv` & `.parquet` (Master dataset hasil prediksi & anotasi).
2. **Visualisasi Publikasi 300 DPI (`figures/` dan `exports/figures/`):**
   * `task_a_confusion_matrix.png` (Matriks konfusi token BIO).
   * `fig_ner_network.png` (Visualisasi topologi graf kompetensi PMI).
   * `fig_noise_cascade.png` (3-panel dekomposisi klaster cascade).
   * `fig_ablation_study.png` (Grafik komparasi MAE, RMSE, R2 ablation study).
   * `fig_quantile_intervals.png` (Grafik pita rentang negosiasi upah).
   * `fig_shap_beeswarm.png` & `fig_shap_monetary_bar.png` (Dampak ekonomi fitur).
3. **Visualisasi Interaktif Web Dashboard (`exports/plotly_html/`):**
   * `plotly_skill_network.html` (Grafik jaringan keahlian interaktif).
   * `plotly_job_galaxy_cascade.html` (Peta galaksi okupasi 2D UMAP interaktif).
   * `plotly_quantile_salary.html` (Simulator interaktif interval negosiasi gaji).
4. **Model Produksi Siap Pakai (`exports/models/`):**
   * `production_bundle.joblib` (Paket lengkap Stacking, XGB, LGBM, Quantile, Target Encoder, SVD, dan Feature Names).
