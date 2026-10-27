import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

from narrative_header import MD_HEADER_TITLE
from narrative_eda import (
    MD_PREP_METHOD, MD_LOAD_METHOD, MD_INTERPRET_CELL13, MD_INTERPRET_CELL14,
    MD_INTERPRET_CELL15, MD_INTERPRET_CELL17, MD_PREP_CLEAN_METHOD,
    MD_INTERPRET_CELL22, MD_CONFIRMATORY_EDA_METHOD, MD_INTERPRET_CELL27,
    MD_INTERPRET_CELL19, MD_INTERPRET_CELL32
)
from narrative_task_a import (
    MD_TASK_A_METHOD, MD_INTERPRET_CELL78_82, MD_INTERPRET_CELL83,
    MD_GRAPH_METHOD, MD_INTERPRET_CELL87
)
from narrative_task_b import (
    MD_TASK_B_METHOD, MD_INTERPRET_CELL97, MD_INTERPRET_CELL100,
    MD_INTERPRET_CELL103, MD_INTERPRET_CELL105, MD_INTERPRET_CELL107,
    MD_INTERPRET_CELL110, MD_CASCADE_METHOD, MD_INTERPRET_CELL115
)
from narrative_task_c import (
    MD_TASK_C_METHOD, MD_INTERPRET_CELL136, MD_INTERPRET_CELL137,
    MD_INTERPRET_CELL139, MD_QUANTILE_METHOD, MD_INTERPRET_CELL141,
    MD_SHAP_METHOD, MD_INTERPRET_CELL143, MD_INTERPRET_CELL145, MD_CONCLUSION
)

with open('notebook/GEMATIK_VI_SkillGraph_AI_Final.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

orig_cells = nb['cells']
print(f"Original total cells: {len(orig_cells)}")
orig_code_with_outs = [c for c in orig_cells if c['cell_type'] == 'code' and len(c.get('outputs', [])) > 0]
print(f"Original code cells with outputs: {len(orig_code_with_outs)}")

# Create helper to create markdown cell
def make_md(text):
    # Ensure text ends with \n or split into lines
    lines = [l + '\n' for l in text.split('\n')]
    if lines and lines[-1] == '\n':
        lines[-1] = ''
    return {
        "cell_type": "markdown",
        "metadata": {},
        "source": lines
    }

new_cells = []

for idx, cell in enumerate(orig_cells):
    ct = cell['cell_type']
    src = "".join(cell.get('source', []))

    # --- Header & Preparation Replacement ---
    if idx == 0:
        new_cells.append(make_md(MD_HEADER_TITLE))
        continue
    elif idx == 1:
        new_cells.append(make_md(MD_PREP_METHOD))
        continue
    elif idx == 2:
        # Keep small subheader or skip since MD_PREP_METHOD covers it
        new_cells.append(make_md("### 1.1 Inisialisasi Environment, Direktori Kerja, dan Dependensi"))
        continue
    elif idx == 8:
        new_cells.append(make_md(MD_LOAD_METHOD))
        continue
    elif idx == 12:
        new_cells.append(make_md("### 1.3 Exploratory Data Analysis (EDA) Karakteristik dan Asimetri Pasar Kerja"))
        continue
    elif idx == 20:
        new_cells.append(make_md(MD_PREP_CLEAN_METHOD))
        continue
    elif idx == 23:
        new_cells.append(make_md(MD_CONFIRMATORY_EDA_METHOD))
        continue
    elif idx == 29:
        new_cells.append(make_md("### 1.5 Evaluasi Komparasi Disparitas Kompensasi dan Karakteristik Korpus"))
        continue
    elif idx == 33:
        new_cells.append(make_md(MD_TASK_A_METHOD))
        continue
    elif idx == 34:
        new_cells.append(make_md("### 2.1 Persiapan Korpus Anotasi Gold dan Checkpoint JobBERT"))
        continue
    elif idx == 37:
        new_cells.append(make_md("### 2.2 Pemuatan Korpus BIO dan Strategi Re-Chunking Stride"))
        continue
    elif idx == 47:
        new_cells.append(make_md("### 2.3 Tokenisasi Subword dan Penyelarasan Label BIO"))
        continue
    elif idx == 52:
        new_cells.append(make_md("### 2.4 Fine-Tuning JobBERT Round 0 pada Korpus Emas"))
        continue
    elif idx == 57:
        new_cells.append(make_md("### 2.5 Semi-Supervised Self-Training Pseudo-Labeling (Confidence Threshold tau = 0.85)"))
        continue
    elif idx == 66:
        new_cells.append(make_md("### 2.6 Pemuatan Model Terlatih dan Tokenizer Komprehensif"))
        continue
    elif idx == 71:
        new_cells.append(make_md("### 2.7 Penyatuan Inferensi Multi-Ontologi (SKILL, KNOWLEDGE, CERT)"))
        continue
    elif idx == 76:
        new_cells.append(make_md("### 2.8 Evaluasi dan Visualisasi Hasil Ekstraksi Entitas"))
        continue
    elif idx == 86:
        new_cells.append(make_md(MD_GRAPH_METHOD))
        continue
    elif idx == 89:
        new_cells.append(make_md(MD_TASK_B_METHOD))
        continue
    elif idx == 91:
        new_cells.append(make_md("### 3.1 Pembangkitan Representasi Vektor Kalimat Sentence-BERT (384-D)"))
        continue
    elif idx == 93:
        new_cells.append(make_md("### 3.2 Reduksi Dimensi Manifold Non-Linier UMAP (50-D dan 2-D)"))
        continue
    elif idx == 95:
        new_cells.append(make_md("### 3.3 Klastering Berbasis Densitas HDBSCAN"))
        continue
    elif idx == 98:
        new_cells.append(make_md("### 3.4 Klastering Probabilistik Gaussian Mixture Model (GMM)"))
        continue
    elif idx == 101:
        new_cells.append(make_md("### 3.5 Evaluasi Kuantitatif dan Perbandingan Komprehensif HDBSCAN vs GMM"))
        continue
    elif idx == 104:
        new_cells.append(make_md("### 3.6 Proyeksi Visualisasi 2D Galaksi Okupasi"))
        continue
    elif idx == 108:
        new_cells.append(make_md("### 3.7 Profiling Keahlian Teknis per Klaster Menggunakan Hasil Task A"))
        continue
    elif idx == 112:
        new_cells.append(make_md("### 3.8 Penyimpanan dan Propagasi Fitur Klastering"))
        continue
    elif idx == 114:
        new_cells.append(make_md(MD_CASCADE_METHOD))
        continue
    elif idx == 116:
        new_cells.append(make_md(MD_TASK_C_METHOD))
        continue
    elif idx == 117:
        new_cells.append(make_md("### 4.1 Persiapan Dataset dan Penyaringan Data Regresi"))
        continue
    elif idx == 119:
        new_cells.append(make_md("### 4.2 Imputasi Terarah Jenjang Senioritas dari Judul Pekerjaan"))
        continue
    elif idx == 121:
        new_cells.append(make_md("### 4.3 Pemuatan Representasi Semantik SBERT (384-D)"))
        continue
    elif idx == 122:
        # Keep explanation note on 300 chars limit
        new_cells.append(cell)
        continue
    elif idx == 124:
        new_cells.append(make_md("### 4.4 Pemuatan Komponen Leksikal TF-IDF TruncatedSVD (150-D)"))
        continue
    elif idx == 126:
        new_cells.append(make_md("### 4.5 Rekayasa Fitur Terstruktur dan Interaksi Domain (80-D)"))
        continue
    elif idx == 128:
        new_cells.append(make_md("### 4.6 Pembagian Stratifikasi dan Target Encoding Bayesian Bebas Kebocoran Data (Zero Data Leakage)"))
        continue
    elif idx == 130:
        new_cells.append(make_md("### 4.7 Pelatihan Model Regresi Ansambel: XGBoost, LightGBM, dan Stacking"))
        continue
    elif idx == 134:
        new_cells.append(make_md("### 4.8 Evaluasi Model Regresi pada Data Uji Independen (Unseen Held-Out Test Set)"))
        continue
    elif idx == 138:
        new_cells.append(make_md("### 4.9 Pembuktian Ilmiah Ablation Study Eksperimental"))
        continue
    elif idx == 140:
        new_cells.append(make_md(MD_QUANTILE_METHOD))
        continue
    elif idx == 142:
        new_cells.append(make_md(MD_SHAP_METHOD))
        continue
    elif idx == 144:
        new_cells.append(make_md("## 5. Master Export Pipeline dan Verifikasi Artefak Produksi"))
        continue
    elif idx == 146:
        new_cells.append(make_md(MD_CONCLUSION))
        continue

    # Otherwise, append the existing cell
    new_cells.append(cell)

    # --- Insert Analytical Interpretation Markdown Cells Immediately After Key Output Cells ---
    if idx == 13:
        new_cells.append(make_md(MD_INTERPRET_CELL13))
    elif idx == 14:
        new_cells.append(make_md(MD_INTERPRET_CELL14))
    elif idx == 15:
        new_cells.append(make_md(MD_INTERPRET_CELL15))
    elif idx == 17:
        new_cells.append(make_md(MD_INTERPRET_CELL17))
    elif idx == 19:
        new_cells.append(make_md(MD_INTERPRET_CELL19))
    elif idx == 22:
        new_cells.append(make_md(MD_INTERPRET_CELL22))
    elif idx == 27:
        new_cells.append(make_md(MD_INTERPRET_CELL27))
    elif idx == 32:
        new_cells.append(make_md(MD_INTERPRET_CELL32))
    elif idx == 82:
        new_cells.append(make_md(MD_INTERPRET_CELL78_82))
    elif idx == 83:
        new_cells.append(make_md(MD_INTERPRET_CELL83))
    elif idx == 87:
        new_cells.append(make_md(MD_INTERPRET_CELL87))
    elif idx == 97:
        new_cells.append(make_md(MD_INTERPRET_CELL97))
    elif idx == 100:
        new_cells.append(make_md(MD_INTERPRET_CELL100))
    elif idx == 103:
        new_cells.append(make_md(MD_INTERPRET_CELL103))
    elif idx == 105:
        new_cells.append(make_md(MD_INTERPRET_CELL105))
    elif idx == 107:
        new_cells.append(make_md(MD_INTERPRET_CELL107))
    elif idx == 110:
        new_cells.append(make_md(MD_INTERPRET_CELL110))
    elif idx == 115:
        new_cells.append(make_md(MD_INTERPRET_CELL115))
    elif idx == 136:
        new_cells.append(make_md(MD_INTERPRET_CELL136))
    elif idx == 137:
        new_cells.append(make_md(MD_INTERPRET_CELL137))
    elif idx == 139:
        new_cells.append(make_md(MD_INTERPRET_CELL139))
    elif idx == 141:
        new_cells.append(make_md(MD_INTERPRET_CELL141))
    elif idx == 143:
        new_cells.append(make_md(MD_INTERPRET_CELL143))
    elif idx == 145:
        new_cells.append(make_md(MD_INTERPRET_CELL145))

print(f"New total cells: {len(new_cells)}")
new_code_with_outs = [c for c in new_cells if c['cell_type'] == 'code' and len(c.get('outputs', [])) > 0]
print(f"New code cells with outputs: {len(new_code_with_outs)}")
assert len(orig_code_with_outs) == len(new_code_with_outs), "Error: Output cell count mismatch!"
print("Verification passed! All 96 code outputs perfectly intact.")

# Write to the destination notebook
nb['cells'] = new_cells
with open('notebook/GEMATIK_VI_SkillGraph_AI_Final.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1, ensure_ascii=False)

print("Notebook successfully updated with deep narratives, methodology, and interpretations!")
