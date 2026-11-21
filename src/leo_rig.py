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
def _fblur(x,r):
    """float gaussian-ish blur (three box passes), no 8-bit rounding"""
    x=np.asarray(x,np.float32); k=max(1,int(round(r*0.9)))
    for _ in range(3):
        for ax in (0,1):
            c=np.cumsum(np.pad(x,[(k+1,k)] if x.ndim==1 else ([(k+1,k),(0,0)] if ax==0 else [(0,0),(k+1,k)])+([(0,0)] if x.ndim==3 else []),mode='edge'),axis=ax)
            x=(np.take(c,range(2*k+1,c.shape[ax]),axis=ax)-np.take(c,range(0,c.shape[ax]-2*k-1),axis=ax))/(2*k+1)
    return x
def _fill_from(a,mask,r):
    """colour of the background behind a region: average of nearby masked pixels"""
    m=mask.astype(np.float32); w=_fblur(m,r)+1e-6
    return np.stack([_fblur(a[...,c]*m,r)/w for c in range(3)],-1)
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
FD=np.array([-0.57,-0.82])             # fingers point this way (up and a little left)
FN=np.array([0.82,-0.57])              # across the fingers
# fingers along the clipped edge, as bands across (v = N . p) with how far each sticks out past the cut
FINGERS=[(-130.,-114.,9.),(-114.,-96.,15.),(-96.,-79.,19.),(-79.,-62.,15.)]
def add_fingers(a,hand,s=1.0):
    """a: HxWx4 float image, hand: bool mask of the hand as drawn. Returns (rgb, alpha) of new fingertips."""
    H,W=a.shape[:2]; yy,xx=np.mgrid[0:H,0:W].astype(np.float32)
    px,py=xx/s,yy/s
    v=FN[0]*px+FN[1]*py; u=FD[0]*px+FD[1]*py
    box=(px>70)&(px<150)&(py>250)&(py<392)&~hand
    # trace back against the finger direction to the hand edge
    hit=np.full((H,W),-1.0,np.float32); hx=np.zeros((H,W),np.float32); hy=np.zeros((H,W),np.float32)
    for k in range(0,40):
        qx=np.clip(np.round(xx-k*FD[0]*s),0,W-1).astype(int); qy=np.clip(np.round(yy-k*FD[1]*s),0,H-1).astype(int)
        h=hand[qy,qx]&(hit<0)&box
        hit[h]=k; hx[h]=xx[h]-(k+7)*FD[0]*s; hy[h]=yy[h]-(k+7)*FD[1]*s   # sample a little inside the hand
    rgb=np.zeros((H,W,3),np.float32); al=np.zeros((H,W),np.float32)
    for v0,v1,L in FINGERS:
        vc=(v0+v1)/2; r=(v1-v0)/2
        inb=box&(hit>=0)&(v>=v0)&(v<v1)
        if not inb.any(): continue
        # where this finger leaves the hand (median over its middle), so the tip is a clean round cap
        mid=inb&(np.abs(v-vc)<r*0.5)
        ub=np.median((u+0)[mid]-hit[mid]/s*1.0) if mid.any() else 0
        ext=u-ub                        # distance past the cut, along the finger
        cap=L-r+np.sqrt(np.clip(r*r-(v-vc)**2,0,None))
        inside=inb&(ext<=cap)
        edge=np.clip((cap-ext)/1.2,0,1)*np.clip((r-np.abs(v-vc))/1.2,0,1)
        al=np.where(inside,np.maximum(al,edge),al)
        qx=np.clip(hx,0,W-1.001); qy=np.clip(hy,0,H-1.001)
        samp=a[qy.astype(int),qx.astype(int),:3]
        shade=1-0.45*((v-vc)/r)**2-0.25*np.clip(ext/max(L,1),0,1)**2   # round across, a bit darker at the tip
        rgb=np.where(inside[...,None],samp*np.clip(shade,0.35,1)[...,None],rgb)
    # smooth away streaks from the ray sampling, keep the hand's dark tone, add a little fur grain
    Lm=rgb.mean(-1,keepdims=True); rgb=np.where(Lm>75,rgb*75/np.maximum(Lm,1),rgb)
    def g(x): return _fblur(x,0.9*s)
    m=(al>0).astype(np.float32); wm=g(m)+1e-3
    rgb=np.stack([g(rgb[...,c]*m)/wm for c in range(3)],-1)
    rng=np.random.default_rng(7); rgb=np.clip(rgb+rng.normal(0,3,(H,W,1)),0,255)
    return rgb,al
def clean_rim(img,width=3):
    im=img.convert('RGBA'); a=np.asarray(im).astype(np.float32)
    R,G,B,A=a[...,0],a[...,1],a[...,2],a[...,3]
    bg=((B-R>28)&(B-G>18)&(R<95)|_navy(a))&(A>200)
    gold=(R>140)&(G>100)&(B<110)&(R>B+60)
    L=a[...,:3].mean(-1); sat=a[...,:3].max(-1)-a[...,:3].min(-1)
    near=_mf(bg,ImageFilter.MaxFilter,2*width+1)&~bg&(A>200)
    rim=near&(L>95)&(sat<70)&~gold
    # background colour under the rim: average of nearby background pixels
    fgm=~bg&(A>200)
    halo=bg&_mf(fgm,ImageFilter.MaxFilter,7)          # background right next to Leo (often a light halo)
    far=bg&~_mf(fgm,ImageFilter.MaxFilter,13)
    rim=rim|halo
    H,W=bg.shape; yy,xx=np.mgrid[0:H,0:W]; sc=W/1024.
    rim&=~((xx>315*sc)&(xx<515*sc)&(yy>110*sc)&(yy<255*sc))   # leave the cap and its badge alone
    fill=_fill_from(a,far,10)
    k=_soft(rim,0.7)[...,None]
    out=a.copy(); out[...,:3]=a[...,:3]*(1-k)+fill*k
    # smooth the jagged cut-out edge: let the outermost pixel row fade into the background
    fg=~(bg|rim)&(A>200)
    edge=np.clip(_fblur(fg.astype(np.float32),1.1)*1.6-0.3,0,1)[...,None]
    keep=(gold|((xx>315*sc)&(xx<515*sc)&(yy>110*sc)&(yy<255*sc)))[...,None]
    e=np.where(keep|~fg[...,None],1.0,edge)
    out[...,:3]=out[...,:3]*e+fill*(1-e)
    return Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA'),rim
def split(img):
    """returns (body without tail, tail layer) as RGBA images of the same size"""
    im,_=clean_rim(img); a=np.asarray(im).astype(np.float32); m,mw=tail_mask(im)   # white sticker outline removed first
    # where the tail was cut from the fur next to it (straight vertical cuts), fade it in instead of a hard line
    H0,W0=m.shape; y0,x0=np.mgrid[0:H0,0:W0].astype(np.float32); s0=W0/1024.
    xc=np.where(y0<700*s0,648*s0,np.where(y0<870*s0,700*s0,622*s0))
    # the tail layer reaches a few px past the cut, under the fur in front of it, so no dark line shows there
    xi=np.clip(np.round(xc+3*s0).astype(int),0,W0-1)
    rowtail=m[np.arange(H0)[:,None].repeat(W0,1),xi]>0.5
    under=rowtail&(x0>=xc-20*s0)&(x0<xc+2*s0)&~_navy(np.asarray(im).astype(np.float32))&(np.asarray(im)[...,3]>200)
    mt=np.maximum(m,under.astype(np.float32))
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
    tail=a.copy(); tail[...,3]=a[...,3]*mt
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
    # the hand: a thin sticker rim shows in the dip between thumb and fingers; drop it
    rim=(xx<205*s)&(yy<372*s)&(a[...,:3].mean(-1)>140)
    rim|=(xx>160*s)&(xx<188*s)&(yy>318*s)&(yy<356*s)&(a[...,:3].mean(-1)>80)
    amx=amx*(1-_soft(_mf(rim,ImageFilter.MaxFilter,3),0.8*s))
    nb=(xx>150*s)&(xx<195*s)&(yy>312*s)&(yy<360*s)   # tidy the dip: drop thin strands, keep a smooth outline
    op=Image.fromarray((np.clip(amx,0,1)*255).astype(np.uint8)).filter(ImageFilter.MinFilter(7)).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(0.9*s))
    amx=np.where(nb,np.minimum(amx,np.asarray(op).astype(np.float32)/255.),amx)
    arm=a.copy(); arm[...,3]=a[...,3]*amx
    # the drawing cut the fingertips off with a straight line; grow them back
    hand=(amx>0.5)&(xx>100*s)&(xx<230*s)&(yy>280*s)&(yy<400*s)
    frgb,fal=add_fingers(arm,hand,s)
    arm[...,:3]=np.clip(arm[...,:3]*(1-fal[...,None])+frgb*fal[...,None],0,255)
    arm[...,3]=np.maximum(arm[...,3],255*fal)
    seam=((np.abs(xx/s-108)<4)&(yy/s>290)&(yy/s<388))|((np.abs(yy/s-292)<4)&(xx/s>104)&(xx/s<132))
    sm=_soft(seam,1.5*s)[...,None]
    bl=np.stack([np.asarray(Image.fromarray(np.clip(arm[...,c],0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.4*s))).astype(np.float32) for c in range(3)],-1)
    arm[...,:3]=arm[...,:3]*(1-sm)+bl*sm
    aw=np.asarray(Image.fromarray((am*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(21)).filter(ImageFilter.GaussianBlur(3*s))).astype(np.float32)/255.*(xx<ARM_CUT*s+3)
    ah=np.clip(np.maximum(am*1.1,aw*(isbg|(a[...,:3].max(-1)<150))),0,1)[...,None]
    near=np.asarray(Image.fromarray((am*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(61))).astype(np.float32)/255.
    zone=((xx<(ARM_CUT-4)*s)&(yy>250*s)&(yy<556*s)&~gold).astype(np.float32)*near
    zone=np.asarray(Image.fromarray((zone*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2*s))).astype(np.float32)/255.
    ah=np.maximum(ah,zone[...,None])
    nearL=(isbg)&(xx<330*s)&(yy>150*s)&(yy<620*s)&(near<0.5)
    fillA=_fill_from(a,isbg&(near<0.5)&(mw<0.01),40)   # same background tone as around it, so no box shows
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
