#!/usr/bin/env python3
"""Generate Leogrow voice clips with an ElevenLabs cloned voice.

Usage (from the repo root):
    ELEVEN_KEY=... ELEVEN_VOICE=... python3 tools/voice_gen.py          # only missing lines
    ELEVEN_KEY=... ELEVEN_VOICE=... python3 tools/voice_gen.py --redo   # remake every line
    ELEVEN_KEY=... ELEVEN_VOICE=... python3 tools/voice_gen.py --fix    # remake phrases + clips that fail the check
    python3 tools/voice_gen.py --polish                                  # only re-trim/level existing clips (no API)

Reads src/voice/lines.json, writes src/voice/<id>.mp3 and src/voice/index.json.
The API key is only read from the environment and never written to disk.

For smooth, natural clips every line is:
  * sent as a proper sentence (capital letter, final punctuation) so the
    intonation ends naturally instead of trailing off or being cut;
  * generated with steady voice settings at a slightly calm speed;
  * checked: if the speech is far too long or too short for its text, or has an
    odd pause inside, a new take is made (up to 3 takes, best one kept);
  * trimmed of silence, loudness-normalised (all clips equally loud), and given
    a short lead-in and tail so phones don't swallow the first or last sound.
Needs ffmpeg and numpy.
"""
import hashlib, json, os, subprocess, sys, tempfile, time, urllib.request, urllib.error
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
VDIR = os.path.join(HERE, '..', 'src', 'voice')
KEY = os.environ.get('ELEVEN_KEY', '').strip()
VOICE = os.environ.get('ELEVEN_VOICE', '').strip()
MODEL = os.environ.get('ELEVEN_MODEL', 'eleven_multilingual_v2')
TAG = '-v3'        # bump when clips are remade, so browsers/CDN fetch the new files
REDO = '--redo' in sys.argv
FIX = '--fix' in sys.argv
POLISH = '--polish' in sys.argv
if not POLISH and (not KEY or not VOICE):
    sys.exit('Set ELEVEN_KEY and ELEVEN_VOICE first.')

SETTINGS = {'stability': 0.6, 'similarity_boost': 0.85, 'style': 0.0,
            'use_speaker_boost': True, 'speed': 0.9}
PHRASE_SPEED = 0.85   # sentences a little calmer so no word gets swallowed


def norm(t):
    return ' '.join(t.strip().lower().split())


def clip_id(t):
    return hashlib.sha1(norm(t).encode()).hexdigest()[:12] + TAG


def prep(t):
    """Make the line read like a finished sentence."""
    t = ' '.join(t.strip().replace('\u2026', '...').split())
    if t[:1].islower():
        t = t[0].upper() + t[1:]
    if t[-1:] not in '.!?':
        t += '.'
    return t


def pcm(path):
    b = subprocess.run(['ffmpeg', '-v', 'quiet', '-i', path, '-f', 's16le', '-ac', '1', '-ar', '16000', '-'],
                       capture_output=True).stdout
    return np.frombuffer(b, np.int16).astype(float) / 32768


def measure(path):
    """Speech length (s) and longest pause inside the speech (s)."""
    x = pcm(path)
    fr = x[:len(x) // 160 * 160].reshape(-1, 160)
    db = 20 * np.log10(np.sqrt((fr ** 2).mean(1)) + 1e-9)
    on = np.where(db > db.max() - 35)[0]
    if not len(on):
        return 0.0, 9.0
    a, b = on[0], on[-1]
    gap = run = 0
    for v in db[a:b]:
        run = run + 1 if v <= db.max() - 35 else 0
        gap = max(gap, run)
    return (b - a) / 100, gap / 100


def expected(t):
    return 0.3 + len(t) / 18.0


def is_phrase(t):
    return ' ' in t.strip()


def ok(t, path):
    sp, gap = measure(path)
    r = sp / expected(prep(t))
    return 0.65 <= r <= 1.45 and gap <= 0.2


def score(t, speech, gap):
    """0 = perfect. Penalise speech far off its expected length and long pauses inside."""
    r = speech / expected(t)
    s = abs(np.log(max(r, 0.01)))
    if gap > 0.2:
        s += (gap - 0.2) * 4
    return s


def tts(text, seed, speed):
    url = f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128'
    body = json.dumps({'text': text, 'model_id': MODEL, 'seed': seed,
                       'voice_settings': dict(SETTINGS, speed=speed)}).encode()
    req = urllib.request.Request(url, data=body, method='POST', headers={
        'xi-api-key': KEY, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg'})
    for attempt in range(4):
        try:
            return urllib.request.urlopen(req, timeout=60).read()
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors='replace')[:300]
            if e.code in (429, 500, 502, 503) and attempt < 3:
                time.sleep(2 ** attempt * 2); continue
            raise RuntimeError(f'HTTP {e.code} {msg}')


def polish(src, dst):
    """Trim silence, even loudness, soft edges, short lead-in and tail."""
    af = ('silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.02,'
          'areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05,areverse,'
          'loudnorm=I=-16:TP=-1.5:LRA=11,'
          'afade=t=in:d=0.01,areverse,afade=t=in:d=0.04,areverse,'
          'adelay=120,apad=pad_dur=0.3,asetpts=N/SR/TB')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-af', af, '-ar', '44100', '-ac', '1',
                    '-c:a', 'libmp3lame', '-b:a', '64k', dst], check=True)


lines = json.load(open(os.path.join(VDIR, 'lines.json')))
idx_path = os.path.join(VDIR, 'index.json')
index = json.load(open(idx_path)) if os.path.exists(idx_path) else {}
index = {k: v for k, v in index.items() if os.path.exists(os.path.join(VDIR, v))}


def save():
    json.dump(index, open(idx_path, 'w'), ensure_ascii=False, indent=1, sort_keys=True)


def store(t, src):
    """Polish src into this line's clip file and point the index at it."""
    cid = clip_id(t)
    dst = os.path.join(VDIR, cid + '.mp3')
    tmpdst = dst + '.tmp.mp3'
    polish(src, tmpdst)
    os.replace(tmpdst, dst)
    old = index.get(norm(t))
    if old and old != cid + '.mp3' and os.path.exists(os.path.join(VDIR, old)):
        os.remove(os.path.join(VDIR, old))
    index[norm(t)] = cid + '.mp3'


if POLISH:
    for t in lines:
        f = index.get(norm(t))
        if f and not f.endswith(TAG + '.mp3'):
            store(t, os.path.join(VDIR, f))
    save()
    sys.exit(f'Polished. {len(index)} clips.')

if REDO:
    todo = list(lines)
else:
    todo = [t for t in lines if norm(t) not in index]
    if FIX:
        todo += [t for t in lines if norm(t) in index and t not in todo and
                 (is_phrase(t) or not ok(t, os.path.join(VDIR, index[norm(t)])))]
print(f'{len(todo)} clips to make ({sum(len(t) for t in todo)} characters), {len(lines) - len(todo)} kept.')

tmp = tempfile.mkdtemp()
retakes = 0
for n, t in enumerate(todo, 1):
    text = prep(t)
    speed = PHRASE_SPEED if is_phrase(t) else SETTINGS['speed']
    best = None
    for take in range(3):
        raw = os.path.join(tmp, f'{n}_{take}.mp3')
        try:
            open(raw, 'wb').write(tts(text, 1000 + take * 7919 + n, speed))
        except RuntimeError as e:
            save()
            sys.exit(f'Stopped at "{t}": {e}')
        sp, gap = measure(raw)
        s = score(text, sp, gap)
        if best is None or s < best[0]:
            best = (s, raw, sp, gap)
        if ok(t, raw):
            break
        retakes += 1
    store(t, best[1])
    if n % 20 == 0:
        save()
    print(f'{n}/{len(todo)}  {best[2]:.2f}s pause {best[3]:.2f}s  score {best[0]:.2f}  {text}')
save()
print(f'Done. {retakes} extra takes.')
