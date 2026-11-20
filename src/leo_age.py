"""Leo at different ages, made by warping the brand-mark icon (no new art needed).
Coordinates are in a 512x512 frame of brand/icon-rounded.png."""
import numpy as np
from PIL import Image
HEAD=(205.,140.); EYES=[(178.,145.),(236.,145.)]
def _w(r,R): t=np.clip(1-(r/R)**2,0,1); return t*t
def _inv(kernels,qx,qy):
    # one warp pass: kernel (source centre, output centre, (sx,sy), radius) moves and scales the area around it
    nx,ny=qx.copy(),qy.copy()
    for (cx,cy),(ox,oy),(sx,sy),R in kernels:
        dx,dy=qx-ox,qy-oy; w=_w(np.hypot(dx,dy),R)
        nx+=w*((cx-ox)+dx*(1/sx-1)); ny+=w*((cy-oy)+dy*(1/sy-1))
    return nx,ny
def warp(img,passes,size=512,keep_alpha=True):
    a=np.asarray(img.convert('RGBA').resize((size,size),Image.LANCZOS)).astype(np.float32)
    k=size/512.
    yy,xx=np.mgrid[0:size,0:size].astype(np.float32)
    qx,qy=xx/k,yy/k
    for ks in reversed(passes): qx,qy=_inv(ks,qx,qy)   # last pass sits closest to the output
    qx=np.clip(qx*k,0,size-1.001); qy=np.clip(qy*k,0,size-1.001)
    x0=np.floor(qx).astype(int); y0=np.floor(qy).astype(int); fx=(qx-x0)[...,None]; fy=(qy-y0)[...,None]
    p=lambda y,x:a[y,x]
    out=(p(y0,x0)*(1-fx)*(1-fy)+p(y0,x0+1)*fx*(1-fy)+p(y0+1,x0)*(1-fx)*fy+p(y0+1,x0+1)*fx*fy)
    if keep_alpha: out[...,3]=a[...,3]  # keep the rounded tile shape
    return Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA')
STAGE_ARGS={}
def stage(head_s,head_dy,eye_s,eye_sy,body_sy,tail_sy,body_sx=1.0):
    hx,hy=HEAD; nh=(hx,hy+head_dy)
    p1=[]
    if body_sy!=1 or body_sx!=1: p1.append(((215,370),(215,370),(body_sx,body_sy),170))
    if tail_sy!=1: p1.append(((405,385),(405,385+(tail_sy-1)*25),(1.0,tail_sy),105))
    p2=[(HEAD,nh,(head_s,head_s),165)]
    p3=[]
    for ex,ey in EYES:
        ne=(nh[0]+(ex-hx)*head_s, nh[1]+(ey-hy)*head_s)
        if eye_s!=1 or eye_sy!=1: p3.append((ne,ne,(eye_s,eye_s*eye_sy),26*head_s))
    return [p1,p2,p3]
def _st(name,*a):
    STAGE_ARGS[name]=a; return stage(*a)
STAGES={ # head scale, head shift down, eye scale, eye height factor, body stretch y, tail stretch y, body stretch x
 'baby':  _st('baby',1.36, 40,1.22,1.00,0.90,0.85,1.06),
 'little':_st('little',1.22, 26,1.14,1.00,0.92,0.92,1.05),
 'kid':   _st('kid',1.10, 12,1.07,1.00,0.97,0.97,1.02),
 'teen':  [],
 'adult': _st('adult',0.93,-12,1.00,0.88,1.05,1.10,0.95),
 'senior':_st('senior',0.85,-24,1.00,0.74,1.10,1.18,0.92),
}
def make(src):
    base=src if isinstance(src,Image.Image) else Image.open(src)
    return {n:warp(base,ps) for n,ps in STAGES.items()}
if __name__=='__main__':
    import sys
    ims=make(sys.argv[1]); W=Image.new('RGB',(260*len(ims),260),'white')
    for i,(n,im) in enumerate(ims.items()): W.paste(im.resize((256,256)),(i*260,0),im.resize((256,256)))
    W.save(sys.argv[2])
