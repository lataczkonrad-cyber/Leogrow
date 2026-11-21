"""Split each Leo into layers so he can move: body (tail removed), tail (sways), and eye positions (for blinking).
Works on the 1024px brand icon after the chest badge is removed; positions are given in % of the square tile."""
import numpy as np
from PIL import Image, ImageFilter
import leo_age
ARM_CUT=300.; ARM_PIVOT=(292.,455.)   # shoulder
TAIL_PIVOT=(628.,955.)
EYES_1024=[(355,288,32,30),(466,292,36,33)]   # x, y, half-width, half-height of each eye (lid size)
def _mf(m,f,n): return np.asarray(Image.fromarray((m*255).astype(np.uint8)).filter(f(n)))>127
def _soft(m,r): return np.asarray(Image.fromarray((np.clip(m,0,1)*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))).astype(np.float32)/255.
def _navy(a):
    r,g,b=a[...,0],a[...,1],a[...,2]
    return (b>r+18)&(b>g+10)&(r<110)
def tail_mask(img):
    a=np.asarray(img.convert('RGBA')).astype(np.float32); H,W=a.shape[:2]; s=W/1024.
    yy,xx=np.mgrid[0:H,0:W]
    region=((yy<870*s)&(xx>700*s)|(yy<700*s)&(xx>648*s)|(yy>=870*s)&(xx>622*s))&(yy>460*s)&(a[...,3]>200)
    gold=(a[...,0]>140)&(a[...,1]>100)&(a[...,2]<110)&(a[...,0]>a[...,2]+60)
    m=region&~_navy(a)&~gold
    # keep only the tail (the piece connected to the middle of the tail)
    from collections import deque
    seen=np.zeros_like(m); q=deque([(int(650*s),int(800*s))]); seen[q[0]]=True
    while q:
        y,x=q.popleft()
        for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=y+dy,x+dx
            if 0<=ny<H and 0<=nx<W and m[ny,nx] and not seen[ny,nx]: seen[ny,nx]=True; q.append((ny,nx))
    core=Image.fromarray((seen*255).astype(np.uint8))
    tight=np.asarray(core.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1.0*s))).astype(np.float32)/255.
    wide=np.asarray(core.filter(ImageFilter.MaxFilter(29)).filter(ImageFilter.GaussianBlur(4.0*s))).astype(np.float32)/255.
    return tight,wide
def split(img):
    """returns (body without tail, tail layer) as RGBA images of the same size"""
    im=img.convert('RGBA'); a=np.asarray(im).astype(np.float32); m,mw=tail_mask(im)
    # fill where the tail was with the surrounding background (smooth push-pull fill)
    bg=(_navy(a)&(mw<0.01)).astype(np.float32)
    # smooth model of the navy background: a quadratic fit over nearby background pixels
    H,W=bg.shape; yy,xx=np.mgrid[0:H,0:W].astype(np.float32); X=xx/W; Y=yy/H
    near=(bg>0)&(X>0.5)&(Y>0.35)
    A=np.stack([np.ones_like(X),X,Y,X*X,X*Y,Y*Y],-1)
    fill=np.zeros_like(a[...,:3])
    for c in range(3):
        coef,*_=np.linalg.lstsq(A[near],a[...,c][near],rcond=None); fill[...,c]=A@coef
    dark=(a[...,:3].max(-1)<120).astype(np.float32)          # background and its dark halo, never the lemur's fur
    dark=np.asarray(Image.fromarray((dark*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5))).astype(np.float32)/255.
    hole=np.clip(np.maximum(m*1.1,mw*np.maximum(dark,_navy(a))),0,1)[...,None]
    body=a.copy(); body[...,:3]=a[...,:3]*(1-hole)+fill*hole
    tail=a.copy(); tail[...,3]=a[...,3]*m
    # the arm and leg next to the tail go on top, so the tail tucks in behind them as it sways
    H,W=m.shape; yy,xx=np.mgrid[0:H,0:W]; s=W/1024.
    band=((xx>540*s)&(xx<706*s)&(yy>440*s)).astype(np.float32)
    fr=(~_navy(a)&(m<0.5)&(a[...,:3].max(-1)>=120)).astype(np.float32)*band
    fr=np.asarray(Image.fromarray((fr*255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8*s))).astype(np.float32)/255.
    front=a.copy(); front[...,3]=a[...,3]*fr
    # ---- the waving arm: cut it off at the shoulder so it can hang down and wave ----
    isbg=(a[...,2]-a[...,0]>28)&(a[...,2]-a[...,1]>18)&(a[...,0]<95)
    gold=(a[...,0]>140)&(a[...,1]>100)&(a[...,2]<110)&(a[...,0]>a[...,2]+60)
    cand=(xx<ARM_CUT*s)&(yy>260*s)&(yy<570*s)&~isbg&~gold
    from collections import deque
    seen=np.zeros_like(cand); q=deque([(int(340*s),int(150*s))]); seen[q[0]]=True
    while q:
        y,x=q.popleft()
        for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=y+dy,x+dx
            if 0<=ny<H and 0<=nx<W and cand[ny,nx] and not seen[ny,nx]: seen[ny,nx]=True; q.append((ny,nx))
    seen=np.asarray(Image.fromarray((seen*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MinFilter(7)))>127
    # fill holes inside the arm (dark fur that looked like background)
    out=np.zeros_like(seen); q=deque()
    for y in range(H):
        for x in (0,W-1):
            if not seen[y,x]: out[y,x]=True; q.append((y,x))
    for x in range(W):
        for y in (0,H-1):
            if not seen[y,x] and not out[y,x]: out[y,x]=True; q.append((y,x))
    while q:
        y,x=q.popleft()
        for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=y+dy,x+dx
            if 0<=ny<H and 0<=nx<W and not seen[ny,nx] and not out[ny,nx] and nx<ARM_CUT*s+40: out[ny,nx]=True; q.append((ny,nx))
    seen=(~out)&(xx<ARM_CUT*s)
    am=Image.fromarray((seen*255).astype(np.uint8)).filter(ImageFilter.MinFilter(5))   # drop the white sticker rim
    am=np.asarray(am.filter(ImageFilter.GaussianBlur(0.8*s))).astype(np.float32)/255.*(xx<ARM_CUT*s)
    am=am*np.clip((ARM_CUT*s-xx)/(14*s),0,1)   # soft end at the shoulder so no seam shows
    # the arm reaches a little past the cut, over the untouched shoulder, so no seam line shows where they meet
    ARM_OVER=26.
    rows=(seen[:,int((ARM_CUT-3)*s)-2:int((ARM_CUT-3)*s)+1].any(1))[:,None]
    ext=rows&(xx>=(ARM_CUT-16)*s)&(xx<(ARM_CUT+ARM_OVER)*s)&~isbg&~gold&(mw<0.3)
    amx=np.asarray(Image.fromarray(((seen|ext)*255).astype(np.uint8)).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(0.8*s))).astype(np.float32)/255.
    amx=np.maximum(amx*np.clip(((ARM_CUT+ARM_OVER)*s-xx)/(ARM_OVER*s),0,1)*(xx>=(ARM_CUT-16)*s),am)
    # the hand: the drawing was clipped by a straight vertical cut at its left side, and a thin white
    # sticker rim shows along the fingers. Round the cut side into a natural curve and drop the rim.
    HX,HY0,HY1,HD=108.,292.,386.,16.
    hc=(HY0+HY1)/2; hh=(HY1-HY0)/2
    t=np.clip((yy/s-hc)/hh,-1,1); edge=HX+np.where(t<0,HD,5.)*(1-np.sqrt(1-t*t))+2.0
    inhand=(yy>=HY0*s-4)&(yy<=HY1*s+4)&(xx<(HX+40)*s)
    cut=np.clip((xx/s-edge)/1.6,0,1)
    amx=np.where(inhand,amx*cut,amx)
    rim=(xx<205*s)&(yy<372*s)&(a[...,:3].mean(-1)>140)
    rim|=(xx>160*s)&(xx<188*s)&(yy>318*s)&(yy<356*s)&(a[...,:3].mean(-1)>80)   # rim in the dip between thumb and fingers
    amx=amx*(1-_soft(_mf(rim,ImageFilter.MaxFilter,3),0.8*s))
    nb=(xx>150*s)&(xx<195*s)&(yy>312*s)&(yy<360*s)   # tidy the dip: drop thin strands, keep a smooth outline
    op=Image.fromarray((np.clip(amx,0,1)*255).astype(np.uint8)).filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(0.9*s))
    amx=np.where(nb,np.minimum(amx,np.asarray(op).astype(np.float32)/255.),amx)
    shade=np.where(inhand,np.clip(1-(xx/s-edge)/5.,0,1)*0.35,0)[...,None]   # a little shadow on the new edge
    arm=a.copy(); arm[...,:3]=arm[...,:3]*(1-shade); arm[...,3]=a[...,3]*amx
    aw=np.asarray(Image.fromarray((am*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(21)).filter(ImageFilter.GaussianBlur(3*s))).astype(np.float32)/255.*(xx<ARM_CUT*s+3)
    ah=np.clip(np.maximum(am*1.1,aw*(isbg|(a[...,:3].max(-1)<150))),0,1)[...,None]
    near=np.asarray(Image.fromarray((am*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(61))).astype(np.float32)/255.
    zone=((xx<(ARM_CUT-4)*s)&(yy>250*s)&(yy<556*s)&~gold).astype(np.float32)*near
    zone=np.asarray(Image.fromarray((zone*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2*s))).astype(np.float32)/255.
    ah=np.maximum(ah,zone[...,None])
    nearL=(isbg)&(xx<330*s)&(yy>150*s)&(yy<620*s)&(near<0.5)
    fillA=np.zeros_like(fill)
    for c in range(3):
        coef,*_=np.linalg.lstsq(A[nearL],a[...,c][nearL],rcond=None); fillA[...,c]=A@coef
    body[...,:3]=body[...,:3]*(1-ah)+fillA*ah
    d=np.hypot(xx-ARM_PIVOT[0]*s,yy-ARM_PIVOT[1]*s)
    capm=(~isbg&(am<0.5)&(d<130*s)&(xx>=(ARM_CUT-2)*s)&(mw<0.5)).astype(np.float32)
    capm=np.asarray(Image.fromarray((capm*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2*s))).astype(np.float32)/255.
    capm=capm*np.clip((xx-(ARM_CUT-2)*s)/(22*s),0,1)   # soft edge over the arm
    cap=a.copy(); cap[...,3]=a[...,3]*capm
    to=lambda x:Image.fromarray(np.clip(x,0,255).astype(np.uint8),'RGBA')
    return to(body),to(tail),to(front),to(arm),to(cap)
def stage_eyes(name):
    st=leo_age.STAGE_ARGS.get(name)
    out=[]
    for (x,y,rx,ry) in EYES_1024:
        if st:
            hs,hdy,es,esy=st[0],st[1],st[2],st[3]; hx,hy=leo_age.HEAD
            x5,y5=x/2,y/2; nx=hx+(x5-hx)*hs; ny=hy+hdy+(y5-hy)*hs
            out.append((nx/5.12,ny/5.12,rx/2*hs*es/5.12,ry/2*hs*es*esy/5.12))
        else: out.append((x/10.24,y/10.24,rx/10.24,ry/10.24))
    return [[round(v,2) for v in e] for e in out]
def _track(passes,pt,size):
    # where a point of the original ends up after the age warp
    im=Image.new('RGBA',(1024,1024),(0,0,0,0)); from PIL import ImageDraw
    ImageDraw.Draw(im).ellipse([pt[0]-10,pt[1]-10,pt[0]+10,pt[1]+10],fill=(255,255,255,255))
    w=np.asarray(leo_age.warp(im,passes,size,keep_alpha=False))[...,3].astype(np.float32)
    ys,xs=np.nonzero(w>60); return (round(xs.mean()/size*100,1),round(ys.mean()/size*100,1))
def make_rigs(src_img,size=512):
    body,tail,front,arm,cap=split(src_img)
    rigs={}
    for name,passes in leo_age.STAGES.items():
        b=leo_age.warp(body,passes,size)
        t=leo_age.warp(tail,passes,size,keep_alpha=False)
        f=leo_age.warp(front,passes,size,keep_alpha=False)
        ar=leo_age.warp(arm,passes,size,keep_alpha=False); cp=leo_age.warp(cap,passes,size,keep_alpha=False)
        ta=np.asarray(t)[...,3]; ys,xs=np.nonzero(ta>128)
        low=ys>np.percentile(ys,92); px,py=xs[low].min(),ys[low].mean()   # tail base, low on the left, behind the leg
        rigs[name]=dict(body=b,tail=t,front=f,arm=ar,cap=cp,shoulder=_track(passes,ARM_PIVOT,size),pivot=(round(px/size*100,1),round(py/size*100,1)),eyes=stage_eyes(name))
    return rigs
