"""Put the emoji pictures the lesson really shows (keys.json from walk.js) inside the file."""
import sys, json, base64, os, re
html_path, emoji_dir, keys_path = sys.argv[1:4]
html = open(html_path).read()
used = set(json.load(open(keys_path)))
files = json.loads(re.search(r'const EMOJI_KEYS=(\[.*?\]);', html).group(1))
ed = {}
for f in files:
    k = f.rsplit('.', 1)[0]
    if k in used:
        ed[k] = 'data:%s;base64,%s' % ('image/webp' if f.endswith('.webp') else 'image/svg+xml', base64.b64encode(open(os.path.join(emoji_dir, f), 'rb').read()).decode())
assert html.count('const EMOJI_DATA={};') == 1
html = html.replace('const EMOJI_DATA={};', 'const EMOJI_DATA=' + json.dumps(ed) + ';')
open(html_path, 'w').write(html)
print('emoji pictures inside:', len(ed), '| size', round(len(html) / 1e6, 2), 'MB')
