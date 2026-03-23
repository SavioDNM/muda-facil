# MudaFácil

> Arraste seus móveis, escolha o caminhão e mude sem estresse.

Monte visualmente a carga da sua mudança com drag & drop, compare tamanhos de caminhão em tempo real e receba cotações instantâneas de transportadoras avaliadas.

## Stack

- **Next.js 16** (App Router) — Framework full-stack
- **TypeScript** (strict) — Tipagem
- **Tailwind CSS 4** — Estilização
- **shadcn/ui** — Componentes UI
- **Prisma 6** — ORM + PostgreSQL
- **Auth.js v5** — Autenticação (Google OAuth + Magic Link)
- **Stripe** — Pagamentos
- **TanStack Query** — Data fetching
- **Zod** — Validação
- **Sonner** — Toasts
- **Resend** — Emails transacionais
- **Storybook** — Design System documentation

## Setup

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd workshop-teste
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Preencha todas as variáveis no `.env`:

| Variável | Onde conseguir |
|---|---|
| `DATABASE_URL` | [Neon](https://neon.tech) — criar banco PostgreSQL |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google Cloud Console — criar OAuth credentials |
| `AUTH_RESEND_KEY` / `RESEND_API_KEY` | Resend — criar API key |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` / `STRIPE_PRICE_ID_PRO` | Stripe Dashboard |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` (local) |

### 3. Configurar banco de dados

```bash
npx prisma generate
npx prisma db push
```

### 4. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`.

### 5. Stripe webhooks (local)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### 6. Storybook

```bash
npm run storybook
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run tokens` | Gerar CSS a partir dos design tokens |
| `npm run tokens:check` | Verificar se CSS está sincronizado |
| `npm run storybook` | Rodar Storybook |
| `npm run db:generate` | Gerar Prisma client |
| `npm run db:push` | Push schema para banco |
| `npm run db:studio` | Abrir Prisma Studio |

## Planos

| Feature | FREE | TRIAL (14 dias) | PRO (R$ 29,90/mês) |
|---|---|---|---|
| Mudanças ativas | 1 | Ilimitadas | Ilimitadas |
| Itens no canvas | 15 | Ilimitados | Ilimitados |
| Cotações/mudança | 3 | Ilimitadas | Ilimitadas |
| Filtros avançados | Não | Sim | Sim |

## Cores

- **Primária:** `#2563EB` (azul confiança)
- **Fundo:** `#F8FAFC` (cinza quase branco)
- **Acento:** `#F59E0B` (amarelo/âmbar — remete a caminhão de mudança)
