"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaywallGateProps {
  children: React.ReactNode;
  isAllowed: boolean;
  feature?: string;
  limit?: number;
}

export function PaywallGate({
  children,
  isAllowed,
  feature,
  limit,
}: PaywallGateProps) {
  if (isAllowed) return <>{children}</>;

  return (
    <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="text-center relative">
        <div className="flex justify-center mb-3">
          <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center">
            <Lock className="h-7 w-7 text-accent" />
          </div>
        </div>
        <CardTitle className="text-xl">Recurso PRO</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {feature
            ? `Você atingiu o limite de ${limit ?? ""} ${feature} no plano gratuito.`
            : "Este recurso está disponível apenas no plano PRO."}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-3 relative">
        <Link
          href="/settings/billing"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-accent text-accent-foreground hover:bg-accent/90 shadow-md shadow-accent/25 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          )}
        >
          <Zap className="h-4 w-4 mr-2" />
          Fazer upgrade — R$ 29,90/mês
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
        <p className="text-xs text-muted-foreground">
          14 dias grátis. Cancele quando quiser.
        </p>
      </CardContent>
    </Card>
  );
}
