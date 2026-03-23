import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (!userId) break;

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const invoice = subscription.latest_invoice;
      let periodEnd: Date | undefined;

      if (typeof invoice === "string") {
        const inv = await stripe.invoices.retrieve(invoice);
        if (inv.period_end) {
          periodEnd = new Date(inv.period_end * 1000);
        }
      } else if (invoice && typeof invoice === "object" && "period_end" in invoice) {
        periodEnd = new Date((invoice as Stripe.Invoice).period_end * 1000);
      }

      await db.user.update({
        where: { id: userId },
        data: {
          plan: "PRO",
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: periodEnd,
        },
      });
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      // Stripe SDK v20: subscription is via parent.subscription_details
      const subscriptionId =
        invoice.parent?.subscription_details?.subscription ?? null;

      if (!subscriptionId) break;

      const periodEnd = invoice.period_end
        ? new Date(invoice.period_end * 1000)
        : undefined;

      await db.user.updateMany({
        where: { stripeSubscriptionId: subscriptionId as string },
        data: {
          stripeCurrentPeriodEnd: periodEnd,
        },
      });
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (!userId) break;

      const invoice = subscription.latest_invoice;
      let periodEnd: Date | undefined;

      if (typeof invoice === "string") {
        const inv = await stripe.invoices.retrieve(invoice);
        if (inv.period_end) {
          periodEnd = new Date(inv.period_end * 1000);
        }
      }

      await db.user.update({
        where: { id: userId },
        data: {
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: periodEnd,
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (!userId) break;

      await db.user.update({
        where: { id: userId },
        data: {
          plan: "FREE",
          stripePriceId: null,
          stripeSubscriptionId: null,
          stripeCurrentPeriodEnd: null,
        },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
