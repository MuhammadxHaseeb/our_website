"""
frames-bands.py: for each frame of a capture, describe the horizontal bands down the screen (which rows are coloured,
which are dark), to measure "opening" transitions (a band of colour or of black growing from a line).

Usage: python scripts/frames-bands.py <capture-name> [--col 0.5]
Reads research/raw/<name>/frames/*.jpg, prints one line per frame: scroll y, then runs of rows as
  C top-bottom (coloured: saturation > 0.25 and value > 0.2), D (dark: value < 0.12), M (anything else, e.g. paper),
plus the mean colour of the biggest coloured run. Rows are sampled across the middle 60% of the width.
"""
import sys, os, glob, colorsys
from PIL import Image

name = sys.argv[1]
d = os.path.join(os.path.dirname(__file__), '..', 'research', 'raw', name, 'frames')
for f in sorted(glob.glob(os.path.join(d, 'f-*.jpg'))):
    y = int(os.path.basename(f)[2:7])
    im = Image.open(f).convert('RGB')
    w, h = im.size
    x0, x1 = int(w * 0.2), int(w * 0.8)
    small = im.crop((x0, 0, x1, h)).resize((40, h))
    rows = []
    for r in range(h):
        px = [small.getpixel((c, r)) for c in range(40)]
        R = sum(p[0] for p in px) / 40; G = sum(p[1] for p in px) / 40; B = sum(p[2] for p in px) / 40
        hh, s, v = colorsys.rgb_to_hsv(R / 255, G / 255, B / 255)
        k = 'C' if s > 0.25 and v > 0.2 else 'D' if v < 0.12 else 'M'
        rows.append((k, (R, G, B)))
    runs = []
    start = 0
    for r in range(1, h + 1):
        if r == h or rows[r][0] != rows[start][0]:
            if r - start >= 4 or not runs:
                runs.append([rows[start][0], start, r - 1])
            else:
                runs[-1][2] = r - 1
            start = r
    # merge neighbours of the same kind
    merged = []
    for k, a, b in runs:
        if merged and merged[-1][0] == k: merged[-1][2] = b
        else: merged.append([k, a, b])
    cs = [m for m in merged if m[0] == 'C']
    col = ''
    if cs:
        big = max(cs, key=lambda m: m[2] - m[1])
        seg = [rows[r][1] for r in range(big[1], big[2] + 1)]
        col = '#%02X%02X%02X' % tuple(int(sum(c[i] for c in seg) / len(seg)) for i in range(3))
    print(f'{y:5d}  ' + '  '.join(f'{k} {a}-{b}' for k, a, b in merged) + (f'   C mean {col}' if col else ''))
