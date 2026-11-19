"""Trace a 2x2 sheet of ink-line scenes into SVG layers (dev tool, not part of the site build).
Usage: python3 scripts/trace-scenes.py SHEET.png OUT_DIR [CIRCLES.json]
Needs: pip install opencv-python-headless numpy
Per scene it writes scene-N.svg = white silhouette (so shirts stay white on the coral hero) + black ink layer,
and fits the hand-drawn coral circle to a clean animatable stroke path (circles.json: d, stroke width, length)."""
import cv2, numpy as np, json, math, os, sys
src=cv2.imread(sys.argv[1]); H,W=src.shape[:2]
out=sys.argv[2]; os.makedirs(out,exist_ok=True)
h2,w2=H//2,W//2
quads=[(0,0),(w2,0),(0,h2),(w2,h2)]
rng=np.random.default_rng(7)
meta=[]
def path_from(contours, scale):
    d=[]
    for c in contours:
        pts=c.reshape(-1,2)*scale
        if len(pts)<3: continue
        d.append("M"+"L".join(f"{x:.1f} {y:.1f}" for x,y in pts)+"Z")
    return "".join(d)
for i,(x0,y0) in enumerate(quads,1):
    q=src[y0:y0+h2, x0:x0+w2]
    b,g,r=[q[:,:,k].astype(int) for k in (0,1,2)]
    coral=((r>170)&((r-b)>45)&((r-g)>35)).astype(np.uint8)
    ink=((np.maximum(np.maximum(r,g),b)<130)).astype(np.uint8)
    # ink at 2x, smoothed, for clean contours
    big=cv2.resize(ink*255,(w2*2,h2*2),interpolation=cv2.INTER_CUBIC)
    big=cv2.GaussianBlur(big,(0,0),1.1); inkb=(big>127).astype(np.uint8)
    cs,hier=cv2.findContours(inkb,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE)
    keep=[cv2.approxPolyDP(c,1.1,True) for c in cs if cv2.contourArea(c)>14]
    ink_d=path_from(keep,0.5)
    # silhouette: close gaps, fill holes
    k=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(15,15)); cl=cv2.morphologyEx(inkb,cv2.MORPH_CLOSE,k)
    cs2,_=cv2.findContours(cl,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
    sil=[cv2.approxPolyDP(c,2.0,True) for c in cs2 if cv2.contourArea(c)>400]
    sil_d=path_from(sil,0.5)
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w2} {h2}" fill="none"><path fill="#fff" d="{sil_d}"/><path fill="#000" fill-rule="evenodd" d="{ink_d}"/></svg>'
    open(f'{out}/scene-{i}.svg','w').write(svg)
    # coral ring -> fitted ellipse
    ys,xs=np.nonzero(coral); pts=np.stack([xs,ys],1).astype(np.float32)
    (cx,cy),(MA,ma),ang=cv2.fitEllipse(pts)
    rx,ry=MA/2,ma/2; per=math.pi*(3*(rx+ry)-math.sqrt((3*rx+ry)*(rx+3*ry)))
    sw=max(3.0,min(7.0,len(pts)/per*1.0))
    # hand-drawn path with overshoot
    ph=rng.uniform(0,6.28); a=math.radians(ang); N=84; start=rng.uniform(0,6.28)
    P=[]
    for n in range(N+1):
        t=n/N; th=start+t*2*math.pi*1.07
        wob=1+0.022*math.sin(3*th+ph)+0.012*math.sin(5*th)+0.03*t  # drifts outward on the overshoot
        ex,ey=rx*wob*math.cos(th), ry*wob*math.sin(th)
        X=cx+ex*math.cos(a)-ey*math.sin(a); Y=cy+ex*math.sin(a)+ey*math.cos(a)
        P.append((X,Y))
    d="M"+"L".join(f"{x:.1f} {y:.1f}" for x,y in P)
    meta.append({"d":d,"sw":round(sw,1),"len":round(sum(math.dist(P[k],P[k+1]) for k in range(N)),0)})
    print(i,"ink",len(ink_d)//1024,"KB sil",len(sil_d)//1024,"KB circle c=",round(cx),round(cy),"r",round(rx),round(ry),"sw",round(sw,1))
json.dump(meta,open(sys.argv[3] if len(sys.argv)>3 else os.path.join(out,'circles.json'),'w'))
