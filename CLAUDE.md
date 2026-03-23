@AGENTS.md

# MudaFácil — Convenções

## Stack
Next.js 16, TypeScript strict, Tailwind CSS 4, Prisma 6, Auth.js v5, Stripe, shadcn/ui, TanStack Query, Zod, Sonner, Resend.

## Design System
- Source of truth: `design-system/tokens.ts`
- Gerar CSS: `npm run tokens`
- Verificar: `npm run tokens:check`
- NUNCA usar hex hardcoded nos componentes. Usar tokens semânticos (`bg-primary`, `text-foreground`, etc).

## Cores
- Primária: #2563EB (azul confiança) → `bg-primary`, `text-primary`
- Fundo: #F8FAFC → `bg-background`
- Acento: #F59E0B (amarelo/âmbar) → `bg-accent`, `text-accent`

## Auth
- Auth.js v5 com prefixo `AUTH_`
- Middleware leve: check cookie direto, sem import de Auth.js
- Primeiro login → TRIAL 14 dias

## Pagamentos
- Stripe com lazy init (proxy pattern)
- Upgrade durante trial é imediato (sem trial_period_days no checkout)
- Stripe SDK v20: usar `invoice.period_end` em vez de `current_period_end`

## Planos
- FREE: 1 mudança, 15 itens, 3 cotações, sem filtros avançados
- TRIAL (14d): tudo ilimitado
- PRO (R$29,90/mês): tudo ilimitado

## Prisma
- Versão 6 (não 7)
- `npx prisma generate` e `npx prisma db push`

## Toast
- Usar `sonner` (toast do shadcn/ui foi depreciado)
