import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

nb_path = 'notebook/GEMATIK_VI_SkillGraph_AI_Final.ipynb'
py_path = 'notebook/GEMATIK_VI_SkillGraph_AI_Final.py'

with open(nb_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

py_lines = []
for cell in nb['cells']:
    if cell['cell_type'] == 'code':
        code = "".join(cell.get('source', []))
        if code.strip():
            py_lines.append(code.strip())
            py_lines.append("\n\n")

with open(py_path, 'w', encoding='utf-8') as f:
    f.write("".join(py_lines))

print(f"Exported clean Python script: {py_path}")
