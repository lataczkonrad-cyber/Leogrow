// Starts a Stripe Checkout for a logged-in learner. Body: { plan: 'month' | 'year', lang: 'en' | 'pl' }
import { PLANS, TRIAL_DAYS, json, siteUrl, stripe, userFromToken, getPremium, bearer } from '../lib/leogrow.mjs';

export default async req => {
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  try {
    const user = await userFromToken(bearer(req));
    if (!user) return json({ error: 'Please log in first.' }, 401);
    const { plan, lang, consent } = await req.json().catch(() => ({}));
    const P = PLANS[plan];
    if (!P) return json({ error: 'Unknown plan.' }, 400);
    const pl = lang === 'pl';
    // the learner must accept the terms and the immediate start (loss of the 14-day withdrawal right) in the app first
    if (consent !== true) return json({ error: pl ? 'Zaakceptuj Regulamin, aby kontynuować.' : 'Please accept the Terms to continue.' }, 400);
    const row = await getPremium(user.id);
    if (P.interval && row && row.stripe_subscription_id && ['active', 'trialing', 'past_due'].includes(row.sub_status))
      return json({ error: pl ? 'Masz już aktywną subskrypcję.' : 'You already have an active subscription.' }, 409);

    const site = siteUrl(req);
    const params = {
      client_reference_id: user.id,
      metadata: { user_id: user.id, plan, consent: 'terms+privacy+immediate_start', consent_at: new Date().toISOString() },
      success_url: site + '/?premium=ok',
      cancel_url: site + '/?premium=cancel',
      locale: pl ? 'pl' : 'en',
      // Leogrow sells as itself (BLIK, Przelewy24, lower fees), not through Stripe Managed Payments
      managed_payments: { enabled: false },
      custom_text: { submit: { message: pl
        ? 'Płacąc, akceptujesz Regulamin Leogrow i zgadzasz się na natychmiastowy dostęp do Premium – z chwilą rozpoczęcia tracisz prawo odstąpienia od umowy w ciągu 14 dni.'
        : 'By paying you accept the Leogrow Terms and ask for immediate access to Premium; once it starts you lose your 14-day right of withdrawal.' } },
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'pln',
          unit_amount: P.amount,
          product_data: { name: pl ? P.namePl : P.name },
          ...(P.interval ? { recurring: { interval: P.interval } } : {}),
        },
      }],
    };
    if (row && row.stripe_customer_id) params.customer = row.stripe_customer_id;
    else params.customer_email = user.email;
    if (P.interval) {
      params.mode = 'subscription';
      params.subscription_data = { metadata: { ...params.metadata } };
      // free days on the first subscription only (card needed; cancel in time and nothing is charged)
      if (!(row && row.stripe_subscription_id)) params.subscription_data.trial_period_days = TRIAL_DAYS;
    } else {
      // one payment for a year: works with BLIK, Przelewy24 and cards (whatever is switched on in Stripe)
      params.mode = 'payment';
      params.payment_intent_data = { metadata: { ...params.metadata } };
      if (!params.customer) params.customer_creation = 'always';
    }
    const s = await stripe('POST', 'checkout/sessions', params);
    return json({ url: s.url });
  } catch (e) {
    console.error(e);
    return json({ error: e.message }, 500);
  }
};
