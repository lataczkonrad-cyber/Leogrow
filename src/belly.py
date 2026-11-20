"""Replace the round chest badge on the brand-mark Leo with a soft, furry belly patch (works on the 1024px icon)."""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
CX,CY=390.,652.   # badge centre in the 1024px icon
def furry_belly(img):
    im=img.convert('RGBA'); s=im.size[0]/1024.
    a=np.asarray(im).astype(np.float32); H,W=a.shape[:2]
    yy,xx=np.mgrid[0:H,0:W].astype(np.float32); cx,cy=CX*s,CY*s
    # egg shape: wider at the chest, narrower at the bottom, with a ragged fur edge
    t=np.clip((yy-cy)/(125*s),-1.5,1.5)
    ax=(112-24*t)*s; ay=132*s
    th=np.arctan2(yy-cy,xx-cx)
    edge=1+0.045*np.sin(23*th)+0.03*np.sin(37*th+1.3)+0.02*np.sin(61*th+0.4)
    r=np.sqrt(((xx-cx)/ax)**2+((yy-cy)/ay)**2)/edge
    alpha=np.clip((1.0-r)/0.26,0,1); alpha=alpha*alpha*(3-2*alpha)          # soft edge, no outline
    # soft fur texture: random noise smeared downwards into fine strands
    rng=np.random.default_rng(7); n=rng.random((H,W)).astype(np.float32)
    k=max(3,int(14*s)); n=np.cumsum(np.vstack([np.zeros((1,W),np.float32),n]),axis=0); n=(n[k:]-n[:-k])/k
    n=np.vstack([n,np.repeat(n[-1:],H-n.shape[0],axis=0)]); n=(n-n.mean())/(n.std()+1e-6)
    # cream in the middle, fading into the body colour at the edges
    body=np.array([236,224,210],np.float32); cream=np.array([251,240,218],np.float32)
    g=np.clip(1-r/0.9,0,1)[...,None]; g=g*g*(3-2*g)
    fur=body*(1-g)+cream*g
    fur=fur*(1+0.035*n[...,None])
    fur*=1-0.07*np.clip((yy-cy)/(130*s),0,1)[...,None]                       # a touch of shade towards the bottom
    out=a.copy(); al=alpha[...,None]
    out[...,:3]=a[...,:3]*(1-al)+fur*al
    res=Image.fromarray(np.clip(out,0,255).astype(np.uint8),'RGBA')
    # a few tiny curved fur strokes
    lay=Image.new('RGBA',res.size,(0,0,0,0)); d=ImageDraw.Draw(lay); w=max(2,int(3.2*s))
    for (x,y,rr,a0,a1) in [(-18,-20,30,205,255),(40,0,28,285,335),(0,44,30,205,255),(46,70,26,285,335)]:
        box=[(cx+x*s-rr*s),(cy+y*s-rr*s),(cx+x*s+rr*s),(cy+y*s+rr*s)]
        d.arc(box,a0,a1,fill=(198,180,156,140),width=w)
    lay=lay.filter(ImageFilter.GaussianBlur(1.1*s))
    return Image.alpha_composite(res,lay)
if __name__=='__main__':
    import sys
    out=furry_belly(Image.open(sys.argv[1])); out.save(sys.argv[2])
