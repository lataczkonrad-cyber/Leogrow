// Speaking practice: turns a learner's short recording into text with ElevenLabs Speech to Text.
// The browser sends the raw recording (webm / mp4 / ogg) as the request body; we answer { text }.
// Netlify → Site configuration → Environment variables must hold:
//   ELEVEN_STT_KEY   an ElevenLabs API key with the "Speech to Text" permission (starts with sk_)
// The key stays on the server and is never sent to the browser.
const MAX_BYTES = 1_500_000;   // about 30 s of compressed audio; speaking items are a few seconds

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export default async req => {
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const key = process.env.ELEVEN_STT_KEY;
  if (!key) return json({ error: 'not_set_up' }, 503);
  try {
    const type = (req.headers.get('content-type') || 'audio/webm').split(';')[0];
    if (!/^audio\/|^video\/(webm|mp4)$/.test(type)) return json({ error: 'Send audio.' }, 415);
    const buf = await req.arrayBuffer();
    if (!buf.byteLength) return json({ error: 'Empty recording.' }, 400);
    if (buf.byteLength > MAX_BYTES) return json({ error: 'Recording too long.' }, 413);
    const ext = type.includes('mp4') ? 'mp4' : type.includes('ogg') ? 'ogg' : type.includes('wav') ? 'wav' : 'webm';
    const form = new FormData();
    form.append('model_id', 'scribe_v1');
    form.append('language_code', 'en');
    form.append('tag_audio_events', 'false');
    form.append('file', new Blob([buf], { type }), 'speech.' + ext);
    const r = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST', headers: { 'xi-api-key': key }, body: form,
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('stt', r.status, JSON.stringify(d).slice(0, 300));
      return json({ error: r.status === 401 ? 'not_set_up' : 'stt_failed' }, r.status === 401 ? 503 : 502);
    }
    return json({ text: String(d.text || '').trim() });
  } catch (e) {
    console.error(e);
    return json({ error: 'stt_failed' }, 500);
  }
};
