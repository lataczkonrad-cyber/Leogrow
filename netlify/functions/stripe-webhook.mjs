// Stripe calls this after a payment or a subscription change, and we write the result to Supabase (public.premium).
// Events to send: checkout.session.completed, checkout.session.async_payment_succeeded,
//                 customer.subscription.updated, customer.subscription.deleted
import { PLANS, json, stripe, verifyStripe, getPremium, savePremium } from '../lib/leogrow.mjs';

const iso = sec => new Date(sec * 1000).toISOString();
const periodEnd = sub => sub.current_period_end || (sub.items && sub.items.data && sub.items.data[0] && sub.items.data[0].current_period_end) || 0;

async function saveSubscription(sub, userId) {
  userId = userId || (sub.metadata && sub.metadata.user_id);
  if (!userId) return;
  const live = ['active', 'trialing', 'past_due'].includes(sub.status);
  await savePremium(userId, {
    stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer && sub.customer.id,
    stripe_subscription_id: sub.id,
    sub_status: sub.status,
    sub_until: live ? iso(periodEnd(sub)) : new Date().toISOString(),
  });
}

async function addYear(session) {
  const userId = session.client_reference_id || (session.metadata && session.metadata.user_id);
  if (!userId || session.payment_status !== 'paid') return;
  const row = await getPremium(userId);
  // the same payment must never count twice (Stripe can resend events)
  if (row && row.last_payment === session.id) return;
  const from = Math.max(Date.now(), row && row.paid_until ? Date.parse(row.paid_until) : 0);
  await savePremium(userId, {
    stripe_customer_id: session.customer || (row && row.stripe_customer_id) || null,
    paid_until: new Date(from + PLANS.year.days * 864e5).toISOString(),
    last_payment: session.id,
  });
}

export default async req => {
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);
  const payload = await req.text();
  let ok = false;
  try { ok = verifyStripe(payload, req.headers.get('stripe-signature')); } catch (e) { console.error(e); return json({ error: e.message }, 500); }
  if (!ok) return json({ error: 'Bad signature' }, 400);
  const ev = JSON.parse(payload), o = ev.data.object;
  try {
    switch (ev.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        if (o.mode === 'payment') await addYear(o);
        else if (o.mode === 'subscription' && o.subscription)
          await saveSubscription(await stripe('GET', 'subscriptions/' + o.subscription), o.client_reference_id);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await saveSubscription(o);
        break;
    }
    return json({ received: true });
  } catch (e) {
    console.error(e);
    return json({ error: e.message }, 500); // Stripe retries later
  }
};
