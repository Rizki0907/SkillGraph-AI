import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('notebook/GEMATIK_VI_SkillGraph_AI_Final.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

print(f"Current total cells: {len(nb['cells'])}")
code_with_outputs = [i for i, c in enumerate(nb['cells']) if c['cell_type'] == 'code' and len(c.get('outputs', [])) > 0]
print(f"Total code cells with outputs: {len(code_with_outputs)}")
print(f"Indices: {code_with_outputs}")
