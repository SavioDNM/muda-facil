import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  GripVertical,
  SlidersHorizontal,
  Package,
  Gauge,
  Check,
  ArrowRight,
  Star,
  Shield,
  Zap,
  Users,
  Quote,
} from "lucide-react";

const FEATURES = [
  {
    icon: GripVertical,
    title: "Canvas de carga interativo",
    description:
      "Arraste ícones de móveis para dentro de um container virtual. Cada item tem dimensão proporcional real e encaixa visualmente no espaço disponível.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Truck,
    title: "Seletor de caminhão",
    description:
      "Compare visualmente 4 tamanhos (Fiorino, HR, 3/4, Baú) com barra de ocupação em tempo real conforme você adiciona itens.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: SlidersHorizontal,
    title: "Filtros de cotação",
    description:
      "Filtre transportadoras por preço, nota, data disponível, seguro incluso e tipo de veículo. Ordene e compare lado a lado.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Package,
    title: "Catálogo visual de itens",
    description:
      "Biblioteca com 40+ ícones categorizados (quarto, cozinha, sala, escritório, caixas) com peso e volume pré-estimados.",
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    icon: Gauge,
    title: "Resumo inteligente da carga",
    description:
      "Painel lateral com volume total, peso estimado, percentual de ocupação do caminhão e alerta se estiver acima da capacidade.",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: Shield,
    title: "Transportadoras avaliadas",
    description:
      "Todas as transportadoras são verificadas e avaliadas por outros usuários. Veja notas, comentários e histórico antes de contratar.",
    color: "bg-teal-500/10 text-teal-600",
  },
];

const STATS = [
  { value: "2.500+", label: "Mudanças planejadas" },
  { value: "40+", label: "Itens no catálogo" },
  { value: "4.8", label: "Nota média", icon: Star },
  { value: "98%", label: "Clientes satisfeitos" },
];

const TESTIMONIALS = [
  {
    name: "Marina Silva",
    role: "Mudou de SP para RJ",
    quote:
      "Consegui planejar toda a minha mudança em uma tarde. O canvas interativo me ajudou a escolher o caminhão ideal e economizei R$400!",
    rating: 5,
  },
  {
    name: "Carlos Mendes",
    role: "3 mudanças feitas",
    quote:
      "A comparação de transportadoras é incrível. Já usei o MudaFácil 3 vezes e sempre encontro as melhores opções de preço e qualidade.",
    rating: 5,
  },
  {
    name: "Ana Beatriz",
    role: "Mudou para apartamento novo",
    quote:
      "Eu tinha medo de que o sofá não coubesse no caminhão. Com o simulador visual, vi exatamente como ficaria antes de contratar.",
    rating: 5,
  },
];

const FREE_FEATURES = [
  "1 mudança ativa",
  "Até 15 itens no canvas",
  "3 cotações por mudança",
];

const PRO_FEATURES = [
  "Mudanças ilimitadas",
  "Itens ilimitados no canvas",
  "Cotações ilimitadas",
  "Filtros avançados",
  "Suporte prioritário",
];

const btnBase =
  "inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";
const btnPrimary = `${btnBase} bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 h-10 gap-2 px-5`;
const btnOutline = `${btnBase} border border-border bg-background hover:bg-muted hover:text-foreground hover:-translate-y-0.5 h-10 gap-2 px-5`;
const btnGhost = `${btnBase} hover:bg-muted hover:text-foreground h-9 gap-1.5 px-3 text-sm`;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b bg-card/80 glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              MudaFácil
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">
              Funcionalidades
            </a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">
              Depoimentos
            </a>
            <a href="#pricing" className="hover:text-foreground transition-colors">
              Planos
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className={btnGhost}>
              Entrar
            </Link>
            <Link href="/login" className={`${btnPrimary} !h-9 !px-4`}>
              Começar grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <Badge
            variant="outline"
            className="text-sm px-4 py-1.5 border-primary/30 text-primary bg-primary/5 animate-scale-in"
          >
            <Zap className="h-3.5 w-3.5 mr-1.5" />
            Planejamento visual de mudanças
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
            Arraste seus móveis, escolha o caminhão e{" "}
            <span className="text-primary relative">
              mude sem estresse
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-accent/60"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 8 Q50 0 100 6 Q150 12 200 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Monte visualmente a carga da sua mudança com drag &amp; drop,
            compare tamanhos de caminhão em tempo real e receba cotações
            instantâneas de transportadoras avaliadas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/login" className={btnPrimary}>
              Começar grátis <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
            <Link href="#features" className={btnOutline}>
              Ver funcionalidades
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            14 dias grátis com acesso total. Sem cartão de crédito.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-y bg-muted/20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 stagger-children">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center space-y-1 animate-fade-in"
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-foreground">
                  {stat.value}
                </span>
                {stat.icon && (
                  <stat.icon className="h-5 w-5 text-accent fill-accent" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-sm px-3 py-1">
              Funcionalidades
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
              Tudo que você precisa para planejar sua mudança
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Do planejamento visual à contratação da transportadora, tudo em um
              só lugar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {FEATURES.map((feature) => (
              <Card
                key={feature.title}
                className="group border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              >
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`h-12 w-12 rounded-xl ${feature.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Users className="h-3.5 w-3.5 mr-1.5" />
              Depoimentos
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Quem usou, recomenda
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.name}
                className="border-border/50 hover:shadow-md transition-all duration-300 animate-fade-in-up"
              >
                <CardContent className="p-6 space-y-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <p className="text-sm leading-relaxed text-foreground/80">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-accent fill-accent"
                      />
                    ))}
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="text-sm px-3 py-1">
              Planos
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Planos simples e transparentes
            </h2>
            <p className="text-muted-foreground text-lg">
              Comece grátis, faça upgrade quando precisar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <Card className="relative hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-2">
                <CardTitle>
                  <span className="text-lg">Grátis</span>
                </CardTitle>
                <div className="mt-3">
                  <span className="text-4xl font-bold">R$ 0</span>
                  <span className="text-muted-foreground ml-1">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Para quem está planejando a primeira mudança
                </p>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                <ul className="space-y-3">
                  {FREE_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-muted-foreground" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`${btnOutline} w-full justify-center`}
                >
                  Começar grátis
                </Link>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="relative border-primary/50 ring-2 ring-primary/20 shadow-xl shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground shadow-sm px-4 py-1">
                  Mais popular
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle>
                  <span className="text-lg">PRO</span>
                </CardTitle>
                <div className="mt-3">
                  <span className="text-4xl font-bold">R$ 29,90</span>
                  <span className="text-muted-foreground ml-1">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Para quem muda com frequência ou quer o melhor planejamento
                </p>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                <ul className="space-y-3">
                  {PRO_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`${btnPrimary} w-full justify-center`}
                >
                  Começar trial de 14 dias{" "}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Pronto para uma mudança sem estresse?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Junte-se a milhares de pessoas que já planejaram suas mudanças com o
            MudaFácil. Comece agora — é grátis.
          </p>
          <Link href="/login" className={btnPrimary}>
            Começar grátis <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Truck className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">MudaFácil</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">
                Funcionalidades
              </a>
              <a href="#pricing" className="hover:text-foreground transition-colors">
                Planos
              </a>
              <a href="#testimonials" className="hover:text-foreground transition-colors">
                Depoimentos
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} MudaFácil
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
