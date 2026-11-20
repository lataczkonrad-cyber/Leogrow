#!/usr/bin/env python3
"""Generate Leogrow voice clips with an ElevenLabs cloned voice.

Usage (from the repo root):
    ELEVEN_KEY=... ELEVEN_VOICE=... python3 tools/voice_gen.py

Reads src/voice/lines.json, writes src/voice/<id>.mp3 and src/voice/index.json.
Already generated lines are skipped, so it is safe to run again.
The API key is only read from the environment and never written to disk.
"""
import hashlib, json, os, sys, time, urllib.request, urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
VDIR = os.path.join(HERE, '..', 'src', 'voice')
KEY = os.environ.get('ELEVEN_KEY', '').strip()
VOICE = os.environ.get('ELEVEN_VOICE', '').strip()
MODEL = os.environ.get('ELEVEN_MODEL', 'eleven_multilingual_v2')
if not KEY or not VOICE:
    sys.exit('Set ELEVEN_KEY and ELEVEN_VOICE first.')


def norm(t):
    return ' '.join(t.strip().lower().split())


def clip_id(t):
    return hashlib.sha1(norm(t).encode()).hexdigest()[:12]


lines = json.load(open(os.path.join(VDIR, 'lines.json')))
idx_path = os.path.join(VDIR, 'index.json')
index = json.load(open(idx_path)) if os.path.exists(idx_path) else {}
todo = [t for t in lines if norm(t) not in index]
chars = sum(len(t) for t in todo)
print(f'{len(todo)} clips to make ({chars} characters), {len(index)} already done.')

url = f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_64'
for n, t in enumerate(todo, 1):
    body = json.dumps({'text': t, 'model_id': MODEL,
                       'voice_settings': {'stability': 0.55, 'similarity_boost': 0.85}}).encode()
    req = urllib.request.Request(url, data=body, method='POST', headers={
        'xi-api-key': KEY, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg'})
    for attempt in range(4):
        try:
            audio = urllib.request.urlopen(req, timeout=60).read()
            break
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors='replace')[:300]
            if e.code in (429, 500, 502, 503) and attempt < 3:
                time.sleep(2 ** attempt * 2); continue
            json.dump(index, open(idx_path, 'w'), ensure_ascii=False, indent=1, sort_keys=True)
            sys.exit(f'Stopped at "{t}": HTTP {e.code} {msg}')
    cid = clip_id(t)
    open(os.path.join(VDIR, cid + '.mp3'), 'wb').write(audio)
    index[norm(t)] = cid + '.mp3'
    if n % 20 == 0:
        json.dump(index, open(idx_path, 'w'), ensure_ascii=False, indent=1, sort_keys=True)
    print(f'{n}/{len(todo)}  {t}')
json.dump(index, open(idx_path, 'w'), ensure_ascii=False, indent=1, sort_keys=True)
print('Done.')
