"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Shield,
  Calendar,
  DollarSign,
  SlidersHorizontal,
  Truck,
  ArrowRight,
} from "lucide-react";

export interface Quote {
  id: string;
  transportadora: {
    nome: string;
    logoUrl?: string;
    notaMedia: number;
    totalAvaliacoes: number;
    cidade: string;
  };
  precoCentavos: number;
  dataDisponivel: string;
  seguroIncluso: boolean;
  tipoCaminhao: string;
}

interface QuoteFiltersProps {
  quotes: Quote[];
  filtrosAvancados: boolean;
}

export function QuoteFilters({ quotes, filtrosAvancados }: QuoteFiltersProps) {
  const [sortBy, setSortBy] = useState<"preco" | "nota" | "data">("preco");
  const [minNota, setMinNota] = useState(0);
  const [seguroOnly, setSeguroOnly] = useState(false);

  const filtered = quotes
    .filter((q) => {
      if (filtrosAvancados) {
        if (q.transportadora.notaMedia < minNota) return false;
        if (seguroOnly && !q.seguroIncluso) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "preco") return a.precoCentavos - b.precoCentavos;
      if (sortBy === "nota")
        return b.transportadora.notaMedia - a.transportadora.notaMedia;
      return (
        new Date(a.dataDisponivel).getTime() -
        new Date(b.dataDisponivel).getTime()
      );
    });

  return (
    <div className="space-y-4">
      {filtrosAvancados && (
        <Card className="border-border/50 bg-muted/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
              </div>
              Filtros avançados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Nota mínima</Label>
              <Input
                type="number"
                min={0}
                max={5}
                step={0.5}
                value={minNota}
                onChange={(e) => setMinNota(Number(e.target.value))}
                className="h-9 bg-background"
              />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={seguroOnly}
                onChange={(e) => setSeguroOnly(e.target.checked)}
                className="rounded border-border accent-primary h-4 w-4"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Apenas com seguro incluso
              </span>
            </label>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium mr-1">Ordenar:</span>
        {(["preco", "nota", "data"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={sortBy === s ? "default" : "outline"}
            onClick={() => setSortBy(s)}
            className={`text-xs h-8 ${sortBy === s ? "" : "bg-transparent"}`}
          >
            {s === "preco" && (
              <>
                <DollarSign className="h-3 w-3 mr-1" />
                Preço
              </>
            )}
            {s === "nota" && (
              <>
                <Star className="h-3 w-3 mr-1" />
                Nota
              </>
            )}
            {s === "data" && (
              <>
                <Calendar className="h-3 w-3 mr-1" />
                Data
              </>
            )}
          </Button>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3 stagger-children">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center">
              <Truck className="h-7 w-7 text-muted-foreground/40" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Nenhuma cotação encontrada
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Ajuste os filtros ou aguarde novas cotações
              </p>
            </div>
          </div>
        ) : (
          filtered.map((quote) => {
            const isBestPrice =
              quote.precoCentavos ===
              Math.min(...filtered.map((q) => q.precoCentavos));
            const isBestRated =
              quote.transportadora.notaMedia ===
              Math.max(...filtered.map((q) => q.transportadora.notaMedia));

            return (
              <Card
                key={quote.id}
                className="group hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-fade-in-up"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <Truck className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                          {quote.transportadora.nome}
                          {isBestPrice && (
                            <Badge className="text-[10px] h-5 bg-emerald-500/10 text-emerald-600 border-emerald-200">
                              Melhor preço
                            </Badge>
                          )}
                          {isBestRated && !isBestPrice && (
                            <Badge className="text-[10px] h-5 bg-amber-500/10 text-amber-600 border-amber-200">
                              Mais bem avaliada
                            </Badge>
                          )}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {quote.transportadora.cidade}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-bold text-primary">
                        R${" "}
                        {(quote.precoCentavos / 100).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <Badge variant="outline" className="text-xs gap-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      {quote.transportadora.notaMedia.toFixed(1)} (
                      {quote.transportadora.totalAvaliacoes})
                    </Badge>
                    <Badge variant="outline" className="text-xs gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(quote.dataDisponivel).toLocaleDateString(
                        "pt-BR"
                      )}
                    </Badge>
                    {quote.seguroIncluso && (
                      <Badge className="text-xs gap-1 bg-emerald-500/10 text-emerald-600 border-emerald-200">
                        <Shield className="h-3 w-3" />
                        Seguro incluso
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs gap-1">
                      <Truck className="h-3 w-3" />
                      {quote.tipoCaminhao}
                    </Badge>
                  </div>

                  <div className="mt-4 pt-3 border-t flex justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs text-primary hover:text-primary hover:bg-primary/5"
                    >
                      Ver detalhes
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
