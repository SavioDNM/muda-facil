import { Plan } from "@prisma/client";

type UserWithPlan = {
  plan: Plan;
  trialEndsAt: Date | null;
  stripeCurrentPeriodEnd: Date | null;
};

export function isTrialActive(user: UserWithPlan): boolean {
  return (
    user.plan === "TRIAL" &&
    user.trialEndsAt !== null &&
    new Date(user.trialEndsAt) > new Date()
  );
}

export function isSubscribed(user: UserWithPlan): boolean {
  return (
    user.plan === "PRO" &&
    user.stripeCurrentPeriodEnd !== null &&
    new Date(user.stripeCurrentPeriodEnd) > new Date()
  );
}

export function hasAccess(user: UserWithPlan): boolean {
  return isTrialActive(user) || isSubscribed(user);
}

export function daysLeftInTrial(user: UserWithPlan): number {
  if (!user.trialEndsAt) return 0;
  const diff = new Date(user.trialEndsAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export const PLAN_LIMITS = {
  FREE: {
    maxMudancasAtivas: 1,
    maxItensCanvas: 15,
    maxCotacoesPorMudanca: 3,
    filtrosAvancados: false,
  },
  TRIAL: {
    maxMudancasAtivas: Infinity,
    maxItensCanvas: Infinity,
    maxCotacoesPorMudanca: Infinity,
    filtrosAvancados: true,
  },
  PRO: {
    maxMudancasAtivas: Infinity,
    maxItensCanvas: Infinity,
    maxCotacoesPorMudanca: Infinity,
    filtrosAvancados: true,
  },
} as const;

export type PlanLimitKey = keyof (typeof PLAN_LIMITS)["FREE"];

export function getPlanLimits(plan: Plan) {
  return PLAN_LIMITS[plan];
}

export function checkUsageLimit(
  plan: Plan,
  resource: PlanLimitKey,
  currentUsage: number
): { allowed: boolean; limit: number; remaining: number } {
  const limits = PLAN_LIMITS[plan];
  const limit = limits[resource] as number;
  const remaining = Math.max(0, limit - currentUsage);
  return {
    allowed: currentUsage < limit,
    limit,
    remaining,
  };
}
