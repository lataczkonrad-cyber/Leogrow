// Starts a Stripe Checkout for a logged-in learner. Body: { plan: 'month' | 'year', lang: 'en' | 'pl' }
import { PLANS, json, siteUrl, stripe, userFromToken, getPremium, bearer } from '../lib/leogrow.mjs';

export default async req => {
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  try {
    const user = await userFromToken(bearer(req));
    if (!user) return json({ error: 'Please log in first.' }, 401);
    const { plan, lang } = await req.json().catch(() => ({}));
    const P = PLANS[plan];
    if (!P) return json({ error: 'Unknown plan.' }, 400);
    const pl = lang === 'pl';
    const row = await getPremium(user.id);
    if (plan === 'month' && row && row.stripe_subscription_id && ['active', 'trialing', 'past_due'].includes(row.sub_status))
      return json({ error: pl ? 'Masz już aktywną subskrypcję.' : 'You already have an active subscription.' }, 409);

    const site = siteUrl(req);
    const params = {
      client_reference_id: user.id,
      metadata: { user_id: user.id, plan },
      success_url: site + '/?premium=ok',
      cancel_url: site + '/?premium=cancel',
      locale: pl ? 'pl' : 'en',
      // Leogrow sells as itself (BLIK, Przelewy24, lower fees), not through Stripe Managed Payments
      managed_payments: { enabled: false },
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'pln',
          unit_amount: P.amount,
          product_data: { name: pl ? P.namePl : P.name },
          ...(plan === 'month' ? { recurring: { interval: 'month' } } : {}),
        },
      }],
    };
    if (row && row.stripe_customer_id) params.customer = row.stripe_customer_id;
    else params.customer_email = user.email;
    if (plan === 'month') {
      params.mode = 'subscription';
      params.subscription_data = { metadata: { user_id: user.id } };
      // 7 days free on the first monthly subscription only (card needed; cancel in time and nothing is charged)
      if (!(row && row.stripe_subscription_id)) params.subscription_data.trial_period_days = 7;
    } else {
      // one payment for a year: works with BLIK, Przelewy24 and cards (whatever is switched on in Stripe)
      params.mode = 'payment';
      params.payment_intent_data = { metadata: { user_id: user.id, plan } };
      if (!params.customer) params.customer_creation = 'always';
    }
    const s = await stripe('POST', 'checkout/sessions', params);
    return json({ url: s.url });
  } catch (e) {
    console.error(e);
    return json({ error: e.message }, 500);
  }
};
