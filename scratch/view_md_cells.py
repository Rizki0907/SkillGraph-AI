import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

nb_path = 'notebook/GEMATIK_VI_SkillGraph_AI_Final.ipynb'
with open(nb_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

for i, cell in enumerate(nb['cells']):
    if cell['cell_type'] == 'markdown':
        src = "".join(cell.get('source', []))
        print(f"--- Cell {i:03d} (len: {len(src)}) ---")
        lines = [line for line in src.split('\n') if line.strip()]
        for line in lines[:5]:
            print(f"    {line}")
