import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

nb_path = 'notebook/GEMATIK_VI_SkillGraph_AI_Final.ipynb'
with open(nb_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

for i, cell in enumerate(nb['cells']):
    if cell['cell_type'] == 'code' and len(cell.get('outputs', [])) > 0:
        outs = cell['outputs']
        types = [o.get('output_type', '') for o in outs]
        has_img = any('image/png' in o.get('data', {}) for o in outs if o.get('output_type') == 'display_data')
        
        # Grab text preview
        text_preview = ""
        for o in outs:
            if o.get('output_type') == 'stream':
                text_preview += "".join(o.get('text', []))
            elif o.get('output_type') == 'execute_result':
                data = o.get('data', {})
                if 'text/plain' in data:
                    text_preview += "".join(data['text/plain'])
        text_preview = text_preview.strip().replace('\n', ' ')[:100]
        first_line = "".join(cell.get('source', [])).strip().split('\n')[0][:50]
        print(f"Cell {i:03d} | Img: {str(has_img):<5} | Types: {','.join(types):<30} | First: {first_line:<40} | Text: {text_preview[:80]}")
