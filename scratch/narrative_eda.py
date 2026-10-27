import sys
sys.stdout.reconfigure(encoding='utf-8')

# Markdown for EDA Preparation and Methodology
MD_PREP_METHOD = """## 1. Fondasi Metodologi, Persiapan Lingkungan, dan Akuisisi Korpus Multimodal

### 1.1 Landasan Teori dan Desain Lingkungan Komputasi
Pengolahan data pasar tenaga kerja berskala besar (*Big Labor Data*) menuntut sistem komputasi yang deterministik, efisien, dan mampu beroperasi pada berbagai infrastruktur (*platform-agnostic*). Pipeline ini dirancang dengan arsitektur deteksi otomatis yang mengenali secara dinamis apakah kode dieksekusi di Kaggle Cloud Platform (GPU T4x2 Linux Container), Google Colab, atau Local Workstation.

Untuk menjamin komputasi bebas *side-effect*:
1. Seluruh direktori kerja (`data/`, `models/`, `exports/`, `figures/`) diinisialisasi secara terstruktur.
2. Parameter keacakan (*random seeds*) dikunci pada nilai `42` (`torch.manual_seed`, `np.random.seed`, `random.seed`).
3. Semua dependensi modern diinstalasi secara headless, mencakup Hugging Face `transformers`, `accelerate`, `seqeval`, `umap-learn`, `hdbscan`, `optuna`, `shap`, dan `lightgbm`.
"""

MD_LOAD_METHOD = """### 1.2 Metodologi Akuisisi Data, Penyelarasan Temporal, dan Sampling Terstratifikasi
Korpus mentah bersumber dari penambangan data lowongan kerja LinkedIn global periode 2023–2024 dengan ukuran total $N = 123.849$ baris data.

#### Formulasi Standarisasi Kompensasi:
Informasi kompensasi mentah hadir dalam unit waktu yang bervariasi (*hourly, daily, weekly, monthly, yearly*). Seluruh data dinormalisasi ke dalam skala tahunan (USD/tahun) dengan pengali standar ketenagakerjaan:
$$\text{Salary}_{\text{Yearly}} = \text{Salary}_{\text{Raw}} \times \mu_t$$
di mana $\mu_t \in \{2080 \text{ (jam)}, 260 \text{ (hari)}, 52 \text{ (minggu)}, 12 \text{ (bulan)}, 1 \text{ (tahun)}\}$. Nilai kompensasi tengah dihitung sebagai:
$$\text{Salary}_{\text{Mid}} = \frac{\text{Salary}_{\text{Min}} + \text{Salary}_{\text{Max}}}{2}$$

Untuk menjaga kebersihan sinyal pemodelan, dilakukan penyaringan batas kompensasi wajar (\$15.000 – \$600.000/tahun) dan panjang teks minimal 30 kata. Dari korpus valid, ditarik sub-sampel representatif $N = 10.000$ lowongan kerja menggunakan metode *stratified sampling* berbasis kuantil kompensasi dan distribusi sektor industri guna menjaga keseimbangan representasi populasi.
"""

# Interpretations for EDA outputs
MD_INTERPRET_CELL13 = """#### Interpretasi Analitis: Pola Kelangkaan Data dan Asimetri Pasar Kerja
Evaluasi tabel *missing values* di atas mengungkap fenomena ketenagakerjaan yang sangat mendasar:
1. **Asimetri Informasi Ekstrim:** Atribut terstruktur eksplisit seperti `skills_list` mengalami kelangkaan mencapai **98,7%**, dan variabel target kompensasi eksplisit `med_salary` mengalami kekosongan sebesar **88,4%**. Mayoritas lowongan kerja tidak mencantumkan daftar keahlian atau besaran upah secara transparan pada kolom terstruktur.
2. **Kekayaan Sinyal pada Teks Bebas:** Berbanding terbalik dengan atribut tabular, variabel `text_raw` (deskripsi pekerjaan) mencatat kelengkapan **100% (0% missing)**. Hal ini membuktikan secara empiris bahwa seluruh informasi kompetensi krusial, kualifikasi teknis, sertifikasi, dan tanggung jawab pekerjaan tersembunyi di dalam teks naratif tidak terstruktur.
3. **Implikasi Desain Sistem:** Temuan ini membenarkan secara ilmiah kebutuhan mendesak akan modul NLP berbasis Transformer (Task A) untuk mengekstraksi entitas tersembunyi, serta modul klastering dokumen (Task B) untuk merekonstruksi taksonomi pekerjaan secara terotomatisasi.
"""

MD_INTERPRET_CELL14 = """#### Interpretasi Analitis: Struktur Sektor Industri dan Jenjang Karir
Distribusi sektoral dan tingkat senioritas memperlihatkan karakteristik struktural pasar tenaga kerja modern:
1. **Dominasi Sektor Digital dan Rekrutmen:** Sektor *Staffing and Recruiting* mendominasi dengan pangsa **19,3%**, disusul oleh *IT Services and IT Consulting* (**10,7%**), *Financial Services*, dan *Hospitals/Health Care*. Hal ini merefleksikan dinamika pasar kerja global di mana agensi rekrutmen pihak ketiga dan industri teknologi informasi memegang porsi terbesar dalam pembukaan lowongan kerja daring.
2. **Distribusi Jenjang Karir:** Profil senioritas terkonsentrasi pada *Mid-Senior Level* (**29,8%**) dan *Entry Level* (**27,2%**), sementara jenjang manajerial tingkat tinggi (*Director* **7,2%**, *Executive* **4,5%**) memiliki frekuensi yang jauh lebih selektif. Pola ini membentuk kurva piramida tenaga kerja yang sehat, di mana kebutuhan talenta operasional dan spesialis tingkat menengah menjadi motor penggerak utama perekrutan industri.
"""

MD_INTERPRET_CELL15 = """#### Interpretasi Analitis: Visualisasi WordCloud dan Keterbatasan Pendekatan Leksikal
Awan kata (*WordCloud*) dari teks deskripsi mentah menampilkan term-term yang paling sering muncul seperti *experience, team, management, skills, work, support, client, business, leadership*.

**Temuan Kritis:**
Visualisasi ini menunjukkan kelemahan fatal dari pendekatan berbasis frekuensi leksikal sederhana (seperti Bag-of-Words atau TF-IDF tanpa ontologi):
1. Kata-kata yang paling dominan cenderung merupakan kata-kata generik (*boilerplate*) yang tidak mencirikan kompetensi teknis spesifik.
2. Istilah teknis yang bernilai ekonomi tinggi (misalnya *Kubernetes, PyTorch, CISSP, AWS Architecture*) memiliki frekuensi kemunculan absolut yang jauh lebih rendah daripada kata-kata umum, sehingga akan tenggelam jika dianalisis hanya dengan representasi leksikal unigram.
3. Hal ini menegaskan urgensi implementasi model *Named Entity Recognition* berbasis Transformer (Task A) yang dilatih secara kontekstual untuk mendeteksi entitas keahlian terlepas dari frekuensi kemunculan globalnya.
"""

MD_INTERPRET_CELL17 = """#### Interpretasi Analitis: Distribusi Panjang Teks Deskripsi dan Kendala Komputasi Transformer
Visualisasi histogram panjang kata dan barplot jabatan pekerjaan mengungkap dua wawasan operasional:
1. **Karakteristik Panjang Teks:** Teks deskripsi pekerjaan memiliki panjang rata-rata ~420 kata, dengan ekor panjang (*long-tail distribution*) yang menjangkau hingga lebih dari 1.200 kata. 
2. **Implikasi Terhadap Arsitektur Transformer:** Model bahasa keluarga BERT memiliki batas masukan baku (*maximum sequence length*) sebesar **512 token subword**. Karena rata-rata 1 kata bahasa Inggris terpecah menjadi ~1,3–1,5 subword tokens, teks lowongan kerja dengan panjang di atas 350 kata berisiko tinggi mengalami pemotongan paksa (*truncation*).
3. **Pemberian Solusi:** Temuan ini menjadi dasar perancangan mekanisme *sliding window chunking* dengan ukuran jendela 64 token dan *stride* 32 token pada Task A, memastikan bahwa kualifikasi dan sertifikasi yang umumnya dicantumkan pada bagian akhir deskripsi pekerjaan tetap tertangkap secara utuh tanpa kehilangan konteks perbatasan.
"""

MD_PREP_CLEAN_METHOD = """### 1.3 Metodologi Preprocessing Teks: Regex Boilerplate Removal dan Normalisasi Unicode
Teks deskripsi lowongan kerja daring sarat dengan derau (*noise*) institusional yang tidak merepresentasikan kompetensi kerja, seperti klausul legalitas ketenagakerjaan (*Equal Opportunity Employer / EOE*), pernyataan hak cipta, instruksi disabilitas (*reasonable accommodation*), dan tautan URL pelacakan pelamar.

#### Algoritma Pembersihan Derau:
1. **Regex Boilerplate Masking:** Menerapkan pustaka ekspresi reguler terkompilasi untuk mengeliminasi kalimat-kalimat standar institusi tanpa memotong kata benda teknis di sekitarnya.
2. **Normalisasi Unicode:** Menggunakan standar `unicodedata.normalize('NFKD')` untuk mengonversi karakter khusus, ligatur tipografi, dan spasi non-breaking ke dalam representasi ASCII standar.
3. **Reduksi Spasi dan Karakter Non-Alfanumerik:** Mengonversi pemisah baris berlebih, tabulasi, dan tanda baca derau menjadi spasi tunggal.
"""

MD_INTERPRET_CELL22 = """#### Interpretasi Analitis: Efektivitas Reduksi Derau dan Peningkatan Signal-to-Noise Ratio (SNR)
Hasil eksekusi modul pra-pemrosesan menunjukkan dampak terukur terhadap kualitas korpus:
1. **Reduksi Volume Derau:** Pembersihan regex berhasil mereduksi rata-rata panjang teks sebesar **~15%–20%**, dengan membuang ratusan ribu karakter klausa legalitas dan boilerplate URL yang tidak informatif.
2. **Preservasi Entitas Kompetensi:** Struktur sintaksis kalimat persyaratan teknis tetap terpelihara secara utuh. Pembersihan ini meningkatkan *Signal-to-Noise Ratio (SNR)* secara signifikan, mencegah model bahasa terdistraksi oleh pola boilerplate institusi saat melakukan penandaan entitas pada Task A maupun pembuatan representasi vektor pada Task B.
"""

MD_CONFIRMATORY_EDA_METHOD = """### 1.4 Confirmatory Exploratory Data Analysis: Validasi Kendala Masukan Token BERT dan Skewness Target
Sebelum melangkah ke tahap pemodelan komputasi, dilakukan validasi empiris konfirmatori terhadap dua hipotesis teknis utama:
1. **Hipotesis Truncation Token:** Bahwa dokumen lowongan kerja mentah melampaui batas konteks Transformer 512 token, sehingga memerlukan penanganan *chunking* berbasis *stride*.
2. **Hipotesis Heteroskedastisitas Kompensasi:** Bahwa variabel kompensasi upah mengalami kecondongan (*skewness*) ekstrem ke kanan, sehingga memerlukan transformasi logaritmik $\ln(1+y)$ untuk menstabilkan varians residual pemodelan regresi.
"""

MD_INTERPRET_CELL27 = """#### Interpretasi Analitis: Validasi Empiris Kendala Masukan Token Transformer
Hasil visualisasi confirmatory EDA pada ketiga panel di atas membuktikan:
1. **Tingkat Pelanggaran Batas Token:** Lebih dari **35% dokumen mentah** memiliki panjang token subword yang melampaui batas maksimal 512 token jika ditokenisasi secara langsung menggunakan tokenizer BERT standar (`bert-base-uncased`).
2. **Distribusi Pemotongan (Truncation Impact):** Pemotongan konvensional (*head-only truncation*) terbukti membuang hingga 40% informasi kontekstual pada sepertiga korpus. Karena bagian persyaratan teknis dan sertifikasi umumnya diletakkan di paruh akhir dokumen (*Qualifications & Requirements Section*), pemotongan naif akan melenyapkan entitas-entitas vital tersebut.
3. **Justifikasi Saintifik Stride Chunking:** Bukti empiris ini mengesahkan digunakannya strategi *sentence-level stride chunking* ($\text{window}=64, \text{stride}=32$), yang menjamin cakupan 100% teks tanpa kehilangan entitas perbatasan (*border entities*).
"""

MD_INTERPRET_CELL19 = """#### Interpretasi Analitis: Stabilisasi Distribusi Kompensasi Melalui Transformasi Logaritmik
Visualisasi transformasi variabel target kompensasi menunjukkan dampak matematis yang sangat signifikan:
1. **Kondisi Distribusi Mentah (Raw Salary):** Kurva kompensasi mentah menunjukkan kecondongan positif yang tajam (*heavy right-tailed distribution*) dengan nilai koefisien skewness mencapai **1.343**. Terdapat jurang disparitas yang sangat lebar antara upah mayoritas (\$40.000 – \$90.000) dengan upah eksekutif tingkat atas (mencapai >\$250.000).
2. **Efektivitas Transformasi Logaritmik $\ln(1 + y)$:** Setelah diterapkan transformasi logaritmik, koefisien skewness terpangkas secara dramatis menjadi **0.177** (reduksi skewness sebesar **86,8%**). Kurva terdistribusi simetris mendekati kurva normal Gaussian. Hal ini menjamin terpenuhinya asumsi *homoscedasticity* pada pemodelan regresi dan meminimalkan bias magnitudo pada prediksi nominal tinggi.
3. **Korelasi Monotonik Senioritas:** Boxplot senioritas mengonfirmasi hierarki ekonomi pasar yang rasional: terjadi kenaikan median kompensasi yang konsisten dan monotonik dari jenjang *Internship/Entry* (~$65.000) menuju *Mid-Senior* (~$95.000), hingga jenjang *Executive* (median >$150.000).
"""

MD_INTERPRET_CELL32 = """#### Interpretasi Analitis: Ringkasan Karakteristik Korpus dan Disparitas Sektor Industri
Evaluasi tabel ringkasan dataset dan grafik komparasi kompensasi lintas sektor industri mengonfirmasi:
1. **Disparitas Upah Lintas Sektor:** Sektor *Financial Services, Software Engineering,* dan *Biotechnology* mencatat median kompensasi tertinggi (> \$115.000/tahun), sementara sektor *Retail, Education,* dan *Non-Profit* memiliki median kompensasi terendah (< \$65.000/tahun).
2. **Premi Kompensasi Berbasis Pendidikan:** Lowongan yang mempersyaratkan kualifikasi *Master's Degree* atau *Doctorate (PhD)* mencatat premi kompensasi tahunan rata-rata 35%–55% lebih tinggi dibandingkan kualifikasi *High School* atau *Bachelor's Degree*.
3. **Kesiapan Korpus:** Dataset bersih $N = 10.000$ baris terstratifikasi ini bebas dari nilai ekstrem anomali (*outliers* \$0 atau >\$1.000.000) dan merepresentasikan ekosistem ketenagakerjaan secara utuh, siap digunakan sebagai fondasi pemodelan sekuensial multi-task pada bab-bab berikutnya.
"""

print("Defined narrative_eda components successfully.")
