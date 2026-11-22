"""
frames-compare.py: two frame captures (scripts/frames.js) side by side at the same scroll positions.

Usage: python scripts/frames-compare.py <left-name> <right-name> <out.jpg> [y1,y2,...]
Each row: scroll position, left frame, right frame.
"""
import json, os, sys
from PIL import Image, ImageDraw

left, right, out = sys.argv[1], sys.argv[2], sys.argv[3]
ys = [int(v) for v in sys.argv[4].split(',')] if len(sys.argv) > 4 else None
base = os.path.join(os.path.dirname(__file__), '..', 'research', 'raw')
def frames(name):
    meta = json.load(open(os.path.join(base, name, 'frames', 'frames.json')))
    return {f['y']: os.path.join(base, name, 'frames', f['file']) for f in meta['frames']}
L, R = frames(left), frames(right)
ys = ys or sorted(set(L) & set(R))
W, H, LAB = 360, 225, 70
sheet = Image.new('RGB', (LAB + 2 * W + 10, 24 + len(ys) * (H + 6)), (24, 24, 24))
d = ImageDraw.Draw(sheet)
d.text((LAB, 6), left, fill=(220, 220, 220)); d.text((LAB + W + 10, 6), right, fill=(220, 220, 220))
for i, y in enumerate(ys):
    top = 24 + i * (H + 6)
    d.text((6, top + H // 2 - 6), f'{y}px', fill=(220, 220, 220))
    for j, src in enumerate((L, R)):
        if y in src: sheet.paste(Image.open(src[y]).convert('RGB').resize((W, H)), (LAB + j * (W + 10), top))
sheet.save(out, quality=80)
print('saved', out, len(ys), 'rows')
