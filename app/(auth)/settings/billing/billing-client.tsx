"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plan } from "@prisma/client";
import {
  Check,
  X,
  CreditCard,
  Zap,
  ArrowRight,
  Loader2,
  Shield,
} from "lucide-react";

interface BillingClientProps {
  plan: Plan;
  isTrial: boolean;
  isActive: boolean;
  isPro: boolean;
  daysLeft: number;
  hasStripeCustomer: boolean;
  periodEnd: string | null;
}

const FREE_FEATURES = [
  { text: "1 mudança ativa", included: true },
  { text: "Até 15 itens no canvas", included: true },
  { text: "3 cotações por mudança", included: true },
  { text: "Filtros avançados", included: false },
  { text: "Suporte prioritário", included: false },
];

const PRO_FEATURES = [
  { text: "Mudanças ilimitadas", included: true },
  { text: "Itens ilimitados no canvas", included: true },
  { text: "Cotações ilimitadas", included: true },
  { text: "Filtros avançados", included: true },
  { text: "Suporte prioritário", included: true },
];

export function BillingClient({
  plan,
  isTrial,
  isActive,
  isPro,
  daysLeft,
  hasStripeCustomer,
  periodEnd,
}: BillingClientProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleManage = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const progressPercent = isTrial
    ? Math.max(0, Math.min(100, ((14 - daysLeft) / 14) * 100))
    : 0;

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-fade-in">
      {/* Current plan card */}
      <Card className="overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Plano atual</CardTitle>
                <CardDescription className="mt-0.5">
                  {isTrial &&
                    `Seu trial expira em ${daysLeft} dia${daysLeft !== 1 ? "s" : ""}.`}
                  {isPro &&
                    periodEnd &&
                    `Próxima renovação: ${new Date(periodEnd).toLocaleDateString("pt-BR")}`}
                  {!isActive &&
                    plan === "FREE" &&
                    "Você está no plano gratuito com funcionalidades limitadas."}
                  {!isActive &&
                    plan === "TRIAL" &&
                    "Seu trial expirou. Faça upgrade para continuar."}
                </CardDescription>
              </div>
            </div>
            <Badge
              variant={isPro ? "default" : isTrial ? "secondary" : "outline"}
              className={`text-sm px-3 py-1 ${
                isPro
                  ? "bg-primary"
                  : isTrial
                  ? "bg-accent/10 text-accent border-accent/30"
                  : ""
              }`}
            >
              {plan}
            </Badge>
          </div>

          {isTrial && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progresso do trial</span>
                <span>
                  {daysLeft} dia{daysLeft !== 1 ? "s" : ""} restante
                  {daysLeft !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 animate-progress-fill ${
                    daysLeft <= 3 ? "bg-destructive" : "bg-accent"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isPro && hasStripeCustomer ? (
            <Button
              onClick={handleManage}
              disabled={isLoading}
              variant="outline"
              className="h-11"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Shield className="mr-2 h-4 w-4" />
              )}
              Gerenciar assinatura
            </Button>
          ) : (
            <Button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="h-11 bg-accent text-accent-foreground hover:bg-accent/90 shadow-md shadow-accent/25"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Zap className="mr-2 h-4 w-4" />
              )}
              Fazer upgrade — R$ 29,90/mês
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Plan comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-lg">Grátis</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">R$ 0</span>
              <span className="text-muted-foreground ml-1">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm">
                  {f.included ? (
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                      <X className="h-3 w-3 text-muted-foreground/50" />
                    </div>
                  )}
                  <span
                    className={
                      f.included ? "" : "text-muted-foreground line-through"
                    }
                  >
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="relative border-primary/30 ring-2 ring-primary/10 shadow-lg shadow-primary/5">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-accent text-accent-foreground shadow-sm px-4 py-1">
              Recomendado
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-lg">PRO</CardTitle>
            <div className="mt-2">
              <span className="text-3xl font-bold">R$ 29,90</span>
              <span className="text-muted-foreground ml-1">/mês</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {PRO_FEATURES.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="font-medium">{f.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
