"""Remove the round chest badge from the brand-mark Leo, leaving plain belly fur (works on the 1024px icon)."""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
CX,CY=390.,652.   # badge centre in the 1024px icon
def furry_belly(img,strokes=False):
    im=img.convert('RGBA'); s=im.size[0]/1024.
    a=np.asarray(im).astype(np.float32); H,W=a.shape[:2]
    yy,xx=np.mgrid[0:H,0:W].astype(np.float32); cx,cy=CX*s,CY*s
    # egg shape: wider at the chest, narrower at the bottom, with a ragged fur edge
    t=np.clip((yy-cy)/(125*s),-1.5,1.5)
    ax=(112-24*t)*s; ay=132*s
    th=np.arctan2(yy-cy,xx-cx)
    edge=1+0.05*np.sin(23*th)+0.035*np.sin(37*th+1.3)+0.025*np.sin(61*th+0.4)
    r=np.sqrt(((xx-cx)/ax)**2+((yy-cy)/ay)**2)/edge
    alpha=np.clip((1.0-r)/0.26,0,1); alpha=alpha*alpha*(3-2*alpha)          # soft edge, no outline
    # soft fur texture: random noise smeared downwards into fine strands
    rng=np.random.default_rng(7); n=rng.random((H,W)).astype(np.float32)
    k=max(3,int(14*s)); n=np.cumsum(np.vstack([np.zeros((1,W),np.float32),n]),axis=0); n=(n[k:]-n[:-k])/k
    n=np.vstack([n,np.repeat(n[-1:],H-n.shape[0],axis=0)]); n=(n-n.mean())/(n.std()+1e-6)
    # cream in the middle, fading into the body colour at the edges
    body=np.array([236,224,210],np.float32); cream=np.array([243,233,221],np.float32)
    g=np.clip(1-r/0.9,0,1)[...,None]; g=g*g*(3-2*g)
    fur=body*(1-g)+cream*g
    fur=fur*(1+0.04*n[...,None])
    fur*=1-0.07*np.clip((yy-cy)/(130*s),0,1)[...,None]                       # a touch of shade towards the bottom
    out=a.copy(); al=alpha[...,None]
    out[...,:3]=a[...,:3]*(1-al)+fur*al
    res=Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA')
    if not strokes: return res
    # a few tiny curved fur strokes
    lay=Image.new('RGBA',res.size,(0,0,0,0)); d=ImageDraw.Draw(lay); w=max(2,int(3.2*s))
    for (x,y,rr,a0,a1) in [(-18,-20,30,205,255),(40,0,28,285,335),(0,44,30,205,255),(46,70,26,285,335)]:
        box=[(cx+x*s-rr*s),(cy+y*s-rr*s),(cx+x*s+rr*s),(cy+y*s+rr*s)]
        d.arc(box,a0,a1,fill=(184,150,108,200),width=w)
    lay=lay.filter(ImageFilter.GaussianBlur(1.1*s))
    return Image.alpha_composite(res,lay)
def real_fur_belly(img):
    """The smooth belly from belly.furry_belly, but with the fine detail of Leo's real belly fur
    (small patches from just below the badge, quilted together) instead of drawn noise strands."""
    import leo_rig
    src=np.asarray(img.convert('RGBA')).astype(np.float32); H,W=src.shape[:2]; s=W/1024.
    sm=np.asarray(furry_belly(img)).astype(np.float32)
    yy,xx=np.mgrid[0:H,0:W].astype(np.float32); cx,cy=CX*s,CY*s
    t=np.clip((yy-cy)/(125*s),-1.5,1.5); ax=(112-24*t)*s; ay=132*s
    r=np.sqrt(((xx-cx)/ax)**2+((yy-cy)/ay)**2)
    alpha=np.clip((1.0-r)/0.3,0,1); alpha=(alpha*alpha*(3-2*alpha))[...,None]
    # detail layer from a real fur patch
    py0,py1,px0,px1=int(738*s),int(820*s),int(335*s),int(450*s)
    patch=src[py0:py1,px0:px1,:3]
    hf_p=patch-np.stack([leo_rig._fblur(patch[...,c],5*s) for c in range(3)],-1)
    PH,PW=hf_p.shape[:2]; ph=pw=int(36*s)
    rng=np.random.default_rng(3)
    acc=np.zeros((H,W,3),np.float32); wsum=np.zeros((H,W,1),np.float32)
    win=np.outer(np.hanning(ph),np.hanning(pw))[...,None].astype(np.float32)+1e-3
    y0,y1,x0,x1=int(cy-150*s),int(cy+150*s),int(cx-140*s),int(cx+140*s)
    for y in range(y0-ph//2,y1,ph//3):
        for x in range(x0-pw//2,x1,pw//3):
            y=y+int(rng.integers(-ph//4,ph//4)); x=x+int(rng.integers(-pw//4,pw//4))
            oy=int(rng.integers(0,PH-ph)); ox=int(rng.integers(0,PW-pw))
            q=hf_p[oy:oy+ph,ox:ox+pw]
            yy0,xx0=max(y,0),max(x,0); yy1,xx1=min(y+ph,H),min(x+pw,W)
            if yy1<=yy0 or xx1<=xx0: continue
            p=q if rng.random()<0.5 else q[:,::-1]
            acc[yy0:yy1,xx0:xx1]+=(p*win)[yy0-y:yy1-y,xx0-x:xx1-x]
            wsum[yy0:yy1,xx0:xx1]+=win[yy0-y:yy1-y,xx0-x:xx1-x]
    hf=acc/np.maximum(wsum,1e-3)
    base=np.stack([leo_rig._fblur(sm[...,c],5*s) for c in range(3)],-1)
    out=src.copy(); belly_rgb=base+hf*1.25
    out[...,:3]=sm[...,:3]*(1-alpha)+belly_rgb*alpha
    return Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA')
if __name__=='__main__':
    import sys
    out=furry_belly(Image.open(sys.argv[1])); out.save(sys.argv[2])
