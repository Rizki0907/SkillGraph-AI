import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

nb_path = 'notebook/GEMATIK_VI_SkillGraph_AI_Final.ipynb'
with open(nb_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

print(f"Total cells: {len(nb['cells'])}")
code_cells = [i for i, c in enumerate(nb['cells']) if c['cell_type'] == 'code']
md_cells = [i for i, c in enumerate(nb['cells']) if c['cell_type'] == 'markdown']
output_cells = [i for i, c in enumerate(nb['cells']) if c['cell_type'] == 'code' and len(c.get('outputs', [])) > 0]
print(f"Code cells: {len(code_cells)}, with outputs: {len(output_cells)}")
print(f"Markdown cells: {len(md_cells)}")

for i, cell in enumerate(nb['cells']):
    ct = cell['cell_type']
    src = "".join(cell.get('source', []))
    first_line = src.strip().split('\n')[0] if src.strip() else "(empty)"
    first_line = first_line[:75]
    if ct == 'markdown':
        print(f"[{i:03d}] MD  : {first_line}")
    else:
        has_out = len(cell.get('outputs', [])) > 0
        out_types = [o.get('output_type', '') for o in cell.get('outputs', [])]
        print(f"[{i:03d}] CODE: {first_line} | Outs: {len(cell.get('outputs', []))} {out_types[:3]}")
