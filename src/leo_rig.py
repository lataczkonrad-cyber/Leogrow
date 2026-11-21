"""Split each Leo into layers so he can move: body (tail removed), tail (sways), and eye positions (for blinking).
Works on the 1024px brand icon after the chest badge is removed; positions are given in % of the square tile."""
import numpy as np
from PIL import Image, ImageFilter
import leo_age
ARM_CUT=300.; ARM_PIVOT=(292.,455.)   # shoulder
TAIL_PIVOT=(628.,955.)
EYES_1024=[(355,288,32,30),(466,292,36,33)]   # x, y, half-width, half-height of each eye (lid size)
REST_ROT=106.   # the resting arm hangs down: CSS turns the arm layer by -REST_ROT degrees
REST_HAND=(279.,548.,-4.)   # where the relaxed hand goes in the resting pose: wrist x, y, extra turn
REST_LONGER=(-30.,118.)
REST_ELBOW=(325.,470.,130.)  # where the stretch starts (x, y) and how long the forearm was below it     # the resting forearm is made this much longer (x, y in px), so it matches his other arm
def _mf(m,f,n): return np.asarray(Image.fromarray((m*255).astype(np.uint8)).filter(f(n)))>127
def _close(m,n): return _mf(_mf(m,ImageFilter.MaxFilter,n),ImageFilter.MinFilter,n)
def _open(m,n): return _mf(_mf(m,ImageFilter.MinFilter,n),ImageFilter.MaxFilter,n)
def _blob(m,seed=None):
    """the biggest connected piece of a mask (or the piece around seed), holes filled"""
    from collections import deque
    H,W=m.shape; lab=np.zeros(m.shape,np.int32); best=(0,0); k=0
    starts=[seed] if seed else zip(*np.nonzero(m))
    for y0,x0 in starts:
        if not m[y0,x0] or lab[y0,x0]: continue
        k+=1; lab[y0,x0]=k; q=deque([(y0,x0)]); n=0
        while q:
            y,x=q.popleft(); n+=1
            for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
                ny,nx=y+dy,x+dx
                if 0<=ny<H and 0<=nx<W and m[ny,nx] and not lab[ny,nx]: lab[ny,nx]=k; q.append((ny,nx))
        if n>best[0]: best=(n,k)
    b=lab==best[1]
    out=np.zeros_like(b); q=deque()   # fill holes: everything not reachable from the border
    for y in range(H):
        for x in (0,W-1):
            if not b[y,x] and not out[y,x]: out[y,x]=True; q.append((y,x))
    for x in range(W):
        for y in (0,H-1):
            if not b[y,x] and not out[y,x]: out[y,x]=True; q.append((y,x))
    while q:
        y,x=q.popleft()
        for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=y+dy,x+dx
            if 0<=ny<H and 0<=nx<W and not b[ny,nx] and not out[ny,nx]: out[ny,nx]=True; q.append((ny,nx))
    return ~out
def _sample(a,sx,sy):
    """bilinear lookup of image array a at float positions"""
    H,W=a.shape[:2]; sx=np.clip(sx,0,W-1.001); sy=np.clip(sy,0,H-1.001)
    x0=np.floor(sx).astype(int); y0=np.floor(sy).astype(int); fx=(sx-x0)[...,None]; fy=(sy-y0)[...,None]
    return a[y0,x0]*(1-fx)*(1-fy)+a[y0,x0+1]*fx*(1-fy)+a[y0+1,x0]*(1-fx)*fy+a[y0+1,x0+1]*fx*fy
def _soft(m,r): return np.asarray(Image.fromarray((np.clip(m,0,1)*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))).astype(np.float32)/255.
def rest_arm(img,arm):
    """The arm for the resting pose. Turning the waving arm down left its open palm sticking out sideways,
    which looked like a twisted wrist. Here the waving hand is swapped for a mirror copy of Leo's other,
    relaxed hand, so both hands hang naturally. Returned in the waving frame, so the same CSS turn applies."""
    a=np.asarray(img.convert('RGBA')).astype(np.float32); H,W=a.shape[:2]; s=W/1024.
    P=(ARM_PIVOT[0]*s,ARM_PIVOT[1]*s); yy,xx=np.mgrid[0:H,0:W]
    # 1) the arm as it hangs at rest, without the waving hand
    r=np.asarray(arm.rotate(REST_ROT,center=P,resample=Image.BICUBIC)).astype(np.float32)
    hand=(r[...,:3].mean(-1)<70)&(r[...,3]>60)&(yy>575*s)
    hand=_mf(_blob(_close(hand,9)),ImageFilter.MaxFilter,7)
    fore=r.copy(); fore[...,3]*=1-_soft(hand,1.5*s)
    fore[...,3]=np.where((yy>612*s)|((yy>560*s)&(xx<235*s)),0,fore[...,3])   # stray bits of the old hand
    # 2) Leo's other hand (it hangs relaxed), cut out and mirrored
    R,G,B,L=a[...,0],a[...,1],a[...,2],a[...,:3].mean(-1)
    m=((xx>575*s)&(xx<680*s)&(yy>700*s)&(yy<856*s)&~_navy(a)&~((R>140)&(G>100)&(B<110)&(R>B+60))&(L<95)&(a[...,3]>200))
    m=_blob(_close(_open(m,5),7))
    ys,xs=np.nonzero(m)
    hm=_soft(_mf(m,ImageFilter.MinFilter,3),1.0*s)*np.clip((yy-ys.min()-2)/(16*s),0,1)   # soft at the wrist
    h=a.copy(); h[...,3]=255*hm
    hi=Image.fromarray(h.astype(np.uint8)).crop((xs.min()-3,ys.min(),xs.max()+4,ys.max()+3)).transpose(Image.FLIP_LEFT_RIGHT)
    # 3) hang it from the wrist, under the fur of the forearm
    ex,ey=REST_LONGER[0]*s,REST_LONGER[1]*s
    cx,cy,turn=REST_HAND; cx=cx*s+ex; cy=cy*s+ey; w,hh=hi.size
    pad=Image.new('RGBA',(w*3,hh*3)); pad.paste(hi,(w,int(hh*1.5)))
    pad=pad.rotate(turn,center=(w*1.5,hh*1.5),resample=Image.BICUBIC)
    out=Image.new('RGBA',(W,H)); out.alpha_composite(pad,(int(cx-w*1.5),int(cy-hh*1.5)))
    # a longer forearm: stretch it along its length below the elbow, down to the new wrist
    L=np.hypot(ex,ey); dx,dy=ex/L,ey/L; ox,oy=REST_ELBOW[0]*s,REST_ELBOW[1]*s
    u=(xx-ox)*dx+(yy-oy)*dy; v=(xx-ox)*-dy+(yy-oy)*dx
    lw=REST_ELBOW[2]*s; k=(lw+L)/lw
    us=np.where(u>0,u/k,u); sx=ox+us*dx-v*dy; sy=oy+us*dy+v*dx
    fore=_sample(fore,sx,sy)
    out.alpha_composite(Image.fromarray(np.clip(fore,0,255).astype(np.uint8)))
    return out.rotate(-REST_ROT,center=P,resample=Image.BICUBIC)
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
    arm=a.copy(); arm[...,3]=a[...,3]*am
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
    cap=a.copy(); cap[...,3]=a[...,3]*capm
    to=lambda x:Image.fromarray(np.clip(x,0,255).astype(np.uint8),'RGBA')
    return to(body),to(tail),to(front),to(arm),to(cap),rest_arm(img,to(arm))
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
    body,tail,front,arm,cap,rest=split(src_img)
    rigs={}
    for name,passes in leo_age.STAGES.items():
        b=leo_age.warp(body,passes,size)
        t=leo_age.warp(tail,passes,size,keep_alpha=False)
        f=leo_age.warp(front,passes,size,keep_alpha=False)
        ar=leo_age.warp(arm,passes,size,keep_alpha=False); cp=leo_age.warp(cap,passes,size,keep_alpha=False); rs=leo_age.warp(rest,passes,size,keep_alpha=False)
        ta=np.asarray(t)[...,3]; ys,xs=np.nonzero(ta>128)
        low=ys>np.percentile(ys,92); px,py=xs[low].min(),ys[low].mean()   # tail base, low on the left, behind the leg
        rigs[name]=dict(body=b,tail=t,front=f,arm=ar,rest=rs,cap=cp,shoulder=_track(passes,ARM_PIVOT,size),pivot=(round(px/size*100,1),round(py/size*100,1)),eyes=stage_eyes(name))
    return rigs
