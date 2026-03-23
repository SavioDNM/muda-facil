import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasAccess, isTrialActive, daysLeftInTrial, isSubscribed } from "@/lib/subscription";
import { BillingClient } from "./billing-client";
import Link from "next/link";
import { Truck, ArrowLeft, LayoutDashboard } from "lucide-react";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      plan: true,
      trialEndsAt: true,
      stripeCustomerId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Truck className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight hidden sm:block">
                MudaFácil
              </span>
            </Link>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Assinatura</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie seu plano e informações de pagamento
          </p>
        </div>
        <BillingClient
          plan={user.plan}
          isTrial={isTrialActive(user)}
          isActive={hasAccess(user)}
          isPro={isSubscribed(user)}
          daysLeft={daysLeftInTrial(user)}
          hasStripeCustomer={!!user.stripeCustomerId}
          periodEnd={user.stripeCurrentPeriodEnd?.toISOString() ?? null}
        />
      </div>
    </div>
  );
}
