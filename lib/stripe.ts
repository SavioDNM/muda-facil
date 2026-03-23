import Stripe from "stripe";

// Lazy initialization — avoids crash when STRIPE_SECRET_KEY is not set at build time
let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-02-25.clover",
      typescript: true,
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return Reflect.get(getStripe(), prop);
  },
});

export async function createCheckoutSession({
  userId,
  email,
  stripeCustomerId,
}: {
  userId: string;
  email: string;
  stripeCustomerId?: string | null;
}) {
  const s = getStripe();
  const session = await s.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: stripeCustomerId || undefined,
    customer_email: stripeCustomerId ? undefined : email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID_PRO!,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
    // NO trial_period_days — upgrade is immediate
    subscription_data: {
      metadata: {
        userId,
      },
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?canceled=true`,
  });

  return session;
}

export async function createCustomerPortalSession(stripeCustomerId: string) {
  const s = getStripe();
  const session = await s.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
  });

  return session;
}
