"use client";

import { X, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface TrialBannerProps {
  daysLeft: number;
}

export function TrialBanner({ daysLeft }: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const progressPercent = Math.max(0, Math.min(100, ((14 - daysLeft) / 14) * 100));
  const isUrgent = daysLeft <= 3;

  return (
    <div
      className={`px-4 py-2.5 text-center text-sm flex items-center justify-center gap-3 animate-fade-in ${
        isUrgent
          ? "bg-destructive/10 text-destructive"
          : "bg-primary text-primary-foreground"
      }`}
    >
      <Zap className="h-4 w-4 shrink-0" />

      <div className="flex items-center gap-3">
        <span>
          Seu trial expira em{" "}
          <strong>
            {daysLeft} dia{daysLeft !== 1 ? "s" : ""}
          </strong>
        </span>

        {/* Mini progress bar */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-20 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-white/60 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <Link
          href="/settings/billing"
          className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
            isUrgent
              ? "bg-destructive text-white hover:bg-destructive/90"
              : "bg-white/20 hover:bg-white/30"
          }`}
        >
          Fazer upgrade
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="ml-auto hover:opacity-70 transition-opacity shrink-0"
        aria-label="Fechar banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
