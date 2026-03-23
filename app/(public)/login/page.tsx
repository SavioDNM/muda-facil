"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Truck, ArrowLeft, Check, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

const TRUST_SIGNALS = [
  "14 dias grátis com acesso total",
  "Sem cartão de crédito",
  "Cancele quando quiser",
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn("resend", { email, callbackUrl: "/dashboard" });
      setEmailSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 relative flex-col justify-between p-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <Link
          href="/"
          className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Voltar ao site</span>
        </Link>

        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <Truck className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold tracking-tight">MudaFácil</span>
          </div>

          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-bold">
              Planeje sua mudança de forma visual e inteligente
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Arraste seus móveis, compare caminhões e receba cotações — tudo em
              um só lugar.
            </p>
          </div>

          <ul className="space-y-3">
            {TRUST_SIGNALS.map((signal) => (
              <li key={signal} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm">{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} MudaFácil. Todos os direitos reservados.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[420px] animate-fade-in">
          {/* Mobile: back link + logo */}
          <div className="lg:hidden mb-8 space-y-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao site
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MudaFácil</span>
            </div>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
              <CardDescription>
                Entre na sua conta para gerenciar suas mudanças
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <Button
                variant="outline"
                className="w-full h-11 text-sm font-medium"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                Entrar com Google
              </Button>

              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  ou
                </span>
                <Separator className="flex-1" />
              </div>

              {emailSent ? (
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center space-y-2 animate-scale-in">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-semibold text-primary">E-mail enviado!</p>
                  <p className="text-sm text-muted-foreground">
                    Verifique sua caixa de entrada para o link mágico.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmailLogin} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Entrar com e-mail"
                    )}
                  </Button>
                </form>
              )}

              {/* Mobile trust signals */}
              <div className="lg:hidden pt-2 space-y-2">
                {TRUST_SIGNALS.map((signal) => (
                  <div
                    key={signal}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <Check className="h-3 w-3 text-primary" />
                    {signal}
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground pt-1">
                Ao entrar, você concorda com nossos termos de uso.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
