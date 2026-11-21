# Leogrow Premium — setup (about 20 minutes)

Do these steps once. Keep every key secret: paste keys **only into Netlify**, never into chat or GitHub.
Start in Stripe **Test mode** (the switch at the top of Stripe), check that buying works, then repeat steps 3–5 in Live mode.

## 1. Supabase: make the Premium table
1. Open supabase.com → your Leogrow project → **SQL Editor** → **New query**.
2. Paste everything from `supabase-premium.sql` and click **Run**.
3. Go to **Project Settings → API Keys**. Copy the **secret** key (called `service_role` on older projects). You need it in step 6.

## 2. Stripe: create your account
1. Go to stripe.com and sign up. Country: **Poland**.
2. Fill in your details and your bank account, so Stripe can pay you.

## 3. Stripe: switch on BLIK and Przelewy24
1. **Settings → Payment methods**.
2. Turn on **Cards**, **BLIK**, **Przelewy24**, **Apple Pay** and **Google Pay**.

## 4. Stripe: copy the secret key
1. **Developers → API keys**.
2. Next to **Secret key** click **Reveal** and copy it (starts with `sk_test_` or `sk_live_`).

## 5. Stripe: tell Stripe where to report payments
1. **Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://leogrow.netlify.app/.netlify/functions/stripe-webhook`
3. Click **Select events** and tick these four:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Click **Add endpoint**. On the next page, under **Signing secret**, click **Reveal** and copy it (starts with `whsec_`).
5. **Settings → Billing → Customer portal** → click **Activate** (this lets learners cancel the monthly plan themselves).

## 6. Netlify: paste the three keys
1. app.netlify.com → **leogrow** → **Site configuration → Environment variables → Add a variable**.
2. Add these three, one at a time:

| Key | Value |
|---|---|
| `STRIPE_SECRET_KEY` | the `sk_…` key from step 4 |
| `STRIPE_WEBHOOK_SECRET` | the `whsec_…` secret from step 5 |
| `SUPABASE_SERVICE_ROLE_KEY` | the Supabase secret key from step 1 |

3. **Deploys → Trigger deploy → Deploy site**.

## 7. Try it
1. Open the site, log in, open a ⭐ Premium lesson and pick a plan.
2. In Test mode pay with card `4242 4242 4242 4242`, any future date, any CVC.
3. You come back to Leogrow and see "⭐ Premium is on".

When the test works, switch Stripe to **Live mode**, repeat steps 3, 4 and 5 there, and replace `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in Netlify with the live ones. Trigger a deploy again.

## What is free and what is Premium
- **Free:** placement test, the whole A0 level in both courses, the first lesson of every other unit, review lessons, up to 3 different lessons a day.
- **Premium:** every lesson and unit test, no daily limit. 24,99 zł a month (card, Apple Pay, Google Pay; cancel anytime) or 149 zł for a year (one payment; BLIK, card, Przelewy24).
- **Trial:** only the monthly plan: the first 7 days are free (card needed; cancel within 7 days and nothing is charged). No free trial on sign-up.
- Settings are at the top of `src/premium.js` (`freeLevels`, `freeLessonsPerUnit`, `dailyFree`, `trialDays`). Prices are in `netlify/lib/leogrow.mjs` (in grosze) and the labels in `src/premium.js`.
