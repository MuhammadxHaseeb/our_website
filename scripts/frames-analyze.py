"""
frames-analyze.py: per-frame colour analysis + contact sheet for frames captured by scripts/frames.js.

Usage: python scripts/frames-analyze.py <out-name> [--cols 8] [--every 1]
Writes research/raw/<out-name>/frames/analysis.json (per frame: mean colour, the 3 dominant colours with their share,
light/dark share) and contact-sheet.jpg (thumbnails labelled with scrollY).
"""
import json, sys, os
from PIL import Image, ImageDraw

name = sys.argv[1]
cols = int(sys.argv[sys.argv.index('--cols') + 1]) if '--cols' in sys.argv else 8
every = int(sys.argv[sys.argv.index('--every') + 1]) if '--every' in sys.argv else 1
root = os.path.join(os.path.dirname(__file__), '..', 'research', 'raw', name, 'frames')
meta = json.load(open(os.path.join(root, 'frames.json')))
hexc = lambda c: '#%02X%02X%02X' % tuple(int(v) for v in c[:3])

out, thumbs = [], []
first = Image.open(os.path.join(root, meta['frames'][0]['file']))
TW, TH = (240, 150) if first.width >= first.height else (130, 282)  # keep the frames' shape (portrait for phones)
for f in meta['frames']:
    im = Image.open(os.path.join(root, f['file'])).convert('RGB')
    small = im.resize((96, 60))
    px = list(small.get_flattened_data()) if hasattr(small, 'get_flattened_data') else list(small.getdata())
    mean = tuple(sum(p[i] for p in px) / len(px) for i in range(3))
    q = small.quantize(colors=4, method=Image.Quantize.MEDIANCUT)
    pal = q.getpalette()[:12]
    counts = sorted(q.getcolors(), reverse=True)
    dom = [{'hex': hexc(pal[i * 3:i * 3 + 3]), 'share': round(n / len(px), 3)} for n, i in counts[:3]]
    lum = [0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2] for p in px]
    out.append({'y': f['y'], 'mean': hexc(mean), 'dominant': dom,
                'dark': round(sum(1 for l in lum if l < 40) / len(lum), 3), 'light': round(sum(1 for l in lum if l > 200) / len(lum), 3)})
    if len(out) % every == 0 or f is meta['frames'][-1]:
        t = im.resize((TW, TH)); d = ImageDraw.Draw(t)
        d.rectangle([0, 0, 64, 14], fill=(0, 0, 0)); d.text((3, 1), str(f['y']), fill=(255, 255, 255))
        thumbs.append(t)

json.dump(out, open(os.path.join(root, 'analysis.json'), 'w'), indent=1)
rows = (len(thumbs) + cols - 1) // cols
sheet = Image.new('RGB', (cols * TW, rows * TH), (40, 40, 40))
for i, t in enumerate(thumbs):
    sheet.paste(t, ((i % cols) * TW, (i // cols) * TH))
sheet.save(os.path.join(root, 'contact-sheet.jpg'), quality=72)
print(f'{len(out)} frames analysed, {len(thumbs)} on the sheet -> {root}')
for o in out:
    print(o['y'], o['mean'], ' '.join(f"{d['hex']}:{d['share']}" for d in o['dominant']), 'dark', o['dark'], 'light', o['light'])
