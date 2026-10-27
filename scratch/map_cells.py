import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

nb_path = 'notebook/GEMATIK_VI_SkillGraph_AI_Final.ipynb'
with open(nb_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

print(f"Total cells currently: {len(nb['cells'])}")
for idx, c in enumerate(nb['cells']):
    ct = c['cell_type']
    first_line = "".join(c.get('source', [])).strip().split('\n')[0][:60]
    num_outs = len(c.get('outputs', []))
    if ct == 'code' and num_outs > 0:
        print(f"[{idx:03d}] CODE (outputs: {num_outs:2d}): {first_line}")
    elif ct == 'markdown':
        print(f"[{idx:03d}] MD  : {first_line}")
