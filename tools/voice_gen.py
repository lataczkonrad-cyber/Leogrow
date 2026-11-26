#!/usr/bin/env python3
"""Generate Leogrow voice clips with an ElevenLabs cloned voice.

Usage (from the repo root):
    ELEVEN_KEY=... ELEVEN_VOICE=... python3 tools/voice_gen.py          # only missing lines
    ELEVEN_KEY=... ELEVEN_VOICE=... python3 tools/voice_gen.py --redo   # remake every line
    ELEVEN_KEY=... ELEVEN_VOICE=<owner voice> python3 tools/voice_gen.py --leo --redo   # Leo's lines
    ELEVEN_KEY=... ELEVEN_VOICE=... python3 tools/voice_gen.py --fix    # remake phrases + clips that fail the check
    python3 tools/voice_gen.py --polish                                  # only re-trim/level existing clips (no API)

Reads src/voice/lines.json (add new lesson lines first with: node tools/voice_lines.js), writes src/voice/<id>.mp3 and src/voice/index.json.
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
import hashlib, json, re, unicodedata, os, subprocess, sys, tempfile, time, urllib.request, urllib.error
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
VDIR = os.path.join(HERE, '..', 'src', 'voice')
KEY = os.environ.get('ELEVEN_KEY', '').strip()
VOICE = os.environ.get('ELEVEN_VOICE', '').strip()
MODEL = os.environ.get('ELEVEN_MODEL', 'eleven_multilingual_v2')
# Short lesson lines (1-3 words) go to a model that can be locked to English. The multilingual
# model guesses the language from the text, and on one word it can guess wrong (e.g. 'pilot' is
# also a Polish word, so it came out with a Polish accent).
SHORT_MODEL = os.environ.get('ELEVEN_SHORT_MODEL', 'eleven_turbo_v2_5')
TAG = '-v8'        # bump when clips are remade, so browsers/CDN fetch the new files
REDO = '--redo' in sys.argv
FIX = '--fix' in sys.argv
POLISH = '--polish' in sys.argv
LEO = '--leo' in sys.argv   # Leo's own lines (src/voice/leo_lines.json), usually in the owner's voice
SHORT = '--short' in sys.argv   # remake only the 1-3 word lesson lines
ONLY = next((a.split('=', 1)[1].split(',') for a in sys.argv if a.startswith('--only=')), None)  # --leo --only=win remakes one group
if not POLISH and (not KEY or not VOICE):
    sys.exit('Set ELEVEN_KEY and ELEVEN_VOICE first.')

SETTINGS = {'stability': 0.6, 'similarity_boost': 0.85, 'style': 0.0,
            'use_speaker_boost': True, 'speed': 0.9}
PHRASE_SPEED = 0.85   # sentences a little calmer so no word gets swallowed
# Leo's groups: how each kind of line should sound (overrides SETTINGS)
GROUP_SETTINGS = {
    'win': {'stability': 0.3, 'style': 0.7, 'speed': 1.0},      # end of lesson: really excited
    'praise': {'stability': 0.45, 'style': 0.4, 'speed': 1.0},  # upbeat
    'intro': {'stability': 0.4, 'similarity_boost': 0.8, 'style': 0.3, 'speed': 1.0},  # lesson intro on the first page: relaxed, natural
}


def norm(t):
    return ' '.join(t.strip().lower().split())


def clip_id(t):
    return ('leo-' if LEO else '') + hashlib.sha1(norm(t).encode()).hexdigest()[:12] + TAG


def prep(t):
    """Make the line read like a finished sentence."""
    t = t.replace('\u2026', '...').replace(' \u2014 ', ', ').replace('\u2014', ', ')
    # emoji and pictographs are shown on screen but not read aloud
    t = ''.join(ch for ch in t if not (unicodedata.category(ch) in ('So', 'Sk', 'Cf', 'Mn', 'Me') and ord(ch) > 0x2000))
    t = ' '.join(t.strip().replace('( ', '(').replace(' )', ')').replace('()', '').split())
    # Business phrase tables: patterns with gaps and notes, read as clean speech
    t = re.sub(r'\s*\+\s*-?ing\b.*$', '', t)                 # "I'd like to begin by + -ing"
    t = re.sub(r'\(=\s*([^)]*)\)', r', meaning \1', t)          # "obtain (= get)"
    t = re.sub(r'\(([A-Z][^)]*)\)\s*', '', t)                   # stage directions: "(Two days later)"
    t = t.replace('(', '').replace(')', '')                    # placeholders: "I work in (department)"
    t = re.sub(r'\bzł\b', 'zloty', t)
    t = re.sub(r'\s+([,;:.!?])', r'\1', t)                      # gaps left by "…": "Good morning, , speaking."
    t = re.sub(r',(\s*,)+', ',', t)
    t = re.sub(r'[\s,;:\-–]+$', '', t).strip()
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


def is_long(t):
    """Several sentences (Business dialogue lines, model emails): natural pauses between sentences are fine."""
    return not LEO and (len(t) > 90 or sum(t.count(c) for c in '.!?') >= 2)


def ok(t, path):
    sp, gap = measure(path)
    if is_long(t):
        r = sp / expected(prep(t))
        return 0.55 <= r <= 1.7 and gap <= 0.9
    if GROUP.get(t) == 'intro':   # natural reading: allow comma pauses, only reject odd gaps or a far-off pace
        r = sp / expected(prep(t))
        return 0.55 <= r <= 1.7 and gap <= 0.5
    r = sp / expected(prep(t))
    return 0.65 <= r <= 1.45 and gap <= 0.2


def score(t, speech, gap):
    """0 = perfect. Penalise speech far off its expected length and long pauses inside."""
    r = speech / expected(t)
    s = abs(np.log(max(r, 0.01)))
    lim = 0.9 if len(t) > 90 else 0.2
    if gap > lim:
        s += (gap - lim) * 4
    return s


def is_short(t):
    return not LEO and len(t.split()) <= 3


def tts(text, seed, speed, extra=None, multilingual=False):
    url = f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128'
    req_body = {'text': text, 'model_id': MODEL, 'seed': seed,
                'voice_settings': dict(SETTINGS, speed=speed, **(extra or {}))}
    if is_short(text) and not multilingual:
        req_body.update(model_id=SHORT_MODEL, language_code='en')
    elif is_short(text):
        req_body['previous_text'] = 'An English word:'   # nudge the multilingual model towards English
    body = json.dumps(req_body).encode()
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
        except (urllib.error.URLError, ConnectionError, TimeoutError, OSError) as e:   # network blip: wait and retry
            if attempt < 3:
                time.sleep(2 ** attempt * 3); continue
            raise RuntimeError(f'network: {e}')


def speech_end(path):
    """Seconds where the voice really ends. TTS voices often add a breath or sigh after the
    last word: a long, quiet (about 30-45 dB under the peak), noisy tail. Everything after the
    last frame within 28 dB of the peak is cut, keeping 60 ms so final consonants stay whole."""
    x = pcm(path)
    fr = x[:len(x) // 320 * 320].reshape(-1, 320)          # 20 ms frames at 16 kHz
    db = 20 * np.log10(np.sqrt((fr ** 2).mean(1)) + 1e-9)
    loud = np.where(db > db.max() - 28)[0]
    if not len(loud):
        return None
    return (loud[-1] + 1) * 0.02 + 0.06


def polish(src, dst):
    """Cut the trailing breath, trim silence, even loudness, soft edges, short lead-in and tail."""
    end = speech_end(src)
    cut = f'atrim=end={end:.3f},afade=t=out:st={max(end - 0.06, 0):.3f}:d=0.06,' if end else ''
    af = (cut +'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.02,'
          'areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05,areverse,'
          'loudnorm=I=-16:TP=-1.5:LRA=11,'
          'afade=t=in:d=0.01,areverse,afade=t=in:d=0.04,areverse,'
          'adelay=120,apad=pad_dur=0.3,asetpts=N/SR/TB')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-af', af, '-ar', '44100', '-ac', '1',
                    '-c:a', 'libmp3lame', '-b:a', '64k', dst], check=True)


GROUP = {}
if LEO:
    _groups = json.load(open(os.path.join(VDIR, 'leo_lines.json')))
    lines = [t for group in _groups.values() for t in group]
    GROUP = {t: g for g, ts in _groups.items() for t in ts}
    idx_path = os.path.join(VDIR, 'leo_index.json')
else:
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

if SHORT:
    todo = [t for t in lines if is_short(t)]
elif ONLY:
    todo = [t for t in lines if GROUP.get(t) in ONLY]
elif REDO:
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
    extra = dict(GROUP_SETTINGS.get(GROUP.get(t), {}))
    speed = extra.pop('speed', speed)
    best = None
    # short lines: 3 takes on the English-locked model, then 2 on the multilingual one if none was clean
    for take in range(5 if is_short(t) else 2 if is_long(t) else 3):   # long lines cost a lot: at most one retake
        raw = os.path.join(tmp, f'{n}_{take}.mp3')
        try:
            open(raw, 'wb').write(tts(text, 1000 + take * 7919 + n, speed, extra, multilingual=take >= 3))
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
