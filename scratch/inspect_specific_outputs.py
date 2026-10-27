import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

nb_path = 'notebook/GEMATIK_VI_SkillGraph_AI_Final.ipynb'
with open(nb_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

cells_to_inspect = [13, 14, 18, 19, 22, 28, 30, 31, 32, 77, 83, 87, 88, 90, 96, 97, 99, 102, 109, 111, 113, 115, 118, 120, 127, 129, 131, 132, 133, 135, 137, 139, 141, 143, 145]

for idx in cells_to_inspect:
    c = nb['cells'][idx]
    first = "".join(c.get('source', [])).strip().split('\n')[0][:40]
    print(f"=== Cell {idx:03d}: {first} ===")
    for o in c.get('outputs', []):
        ot = o.get('output_type')
        if ot == 'stream':
            lines = "".join(o.get('text', [])).strip().split('\n')
            for line in lines[:8]:
                print(f"  [STREAM] {line}")
            if len(lines) > 8:
                print(f"  ... ({len(lines)} lines total)")
        elif ot == 'execute_result':
            data = o.get('data', {})
            if 'text/plain' in data:
                text = "".join(data['text/plain']).strip()
                print(f"  [EXEC] {text[:200]}")
        elif ot == 'display_data':
            print("  [DISPLAY_DATA (Image or HTML)]")
