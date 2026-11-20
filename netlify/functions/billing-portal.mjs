// Opens Stripe's page where a learner can cancel or change their monthly subscription.
import { json, siteUrl, stripe, userFromToken, getPremium, bearer } from '../lib/leogrow.mjs';

export default async req => {
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  try {
    const user = await userFromToken(bearer(req));
    if (!user) return json({ error: 'Please log in first.' }, 401);
    const { lang } = await req.json().catch(() => ({}));
    const row = await getPremium(user.id);
    if (!row || !row.stripe_customer_id) return json({ error: 'No subscription found.' }, 404);
    const s = await stripe('POST', 'billing_portal/sessions', { customer: row.stripe_customer_id, return_url: siteUrl(req) + '/', locale: lang === 'pl' ? 'pl' : 'en' });
    return json({ url: s.url });
  } catch (e) {
    console.error(e);
    return json({ error: e.message }, 500);
  }
};
