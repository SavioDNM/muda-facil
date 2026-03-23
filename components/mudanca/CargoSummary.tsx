"use client";

import { CanvasItem } from "./CargoCanvas";
import { TruckSpec } from "@/lib/trucks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Package, Weight, Ruler, Percent, Truck } from "lucide-react";

interface CargoSummaryProps {
  items: CanvasItem[];
  selectedTruck: TruckSpec | null;
}

export function CargoSummary({ items, selectedTruck }: CargoSummaryProps) {
  const totalVolume = items.reduce((acc, ci) => acc + ci.item.volumeM3, 0);
  const totalWeight = items.reduce((acc, ci) => acc + ci.item.pesoKg, 0);
  const totalItems = items.length;

  const volumePercent = selectedTruck
    ? Math.round((totalVolume / selectedTruck.capacidadeM3) * 100)
    : 0;
  const weightPercent = selectedTruck
    ? Math.round((totalWeight / selectedTruck.capacidadeKg) * 100)
    : 0;

  const isOverVolume = selectedTruck
    ? totalVolume > selectedTruck.capacidadeM3
    : false;
  const isOverWeight = selectedTruck
    ? totalWeight > selectedTruck.capacidadeKg
    : false;
  const isOver = isOverVolume || isOverWeight;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <Package className="h-4 w-4 text-primary" />
          </div>
          Resumo da carga
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={<Ruler className="h-3.5 w-3.5" />}
            label="Volume total"
            value={`${totalVolume.toFixed(2)} m³`}
          />
          <StatCard
            icon={<Weight className="h-3.5 w-3.5" />}
            label="Peso estimado"
            value={`${totalWeight.toFixed(0)} kg`}
          />
          <StatCard
            icon={<Package className="h-3.5 w-3.5" />}
            label="Itens"
            value={String(totalItems)}
          />
          <StatCard
            icon={<Percent className="h-3.5 w-3.5" />}
            label="Ocupação"
            value={selectedTruck ? `${volumePercent}%` : "—"}
            alert={isOver}
          />
        </div>

        {selectedTruck && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground pb-1">
              <Truck className="h-3.5 w-3.5" />
              {selectedTruck.nome}
            </div>

            <ProgressBar
              label="Volume"
              percent={volumePercent}
              isOver={isOverVolume}
            />
            <ProgressBar
              label="Peso"
              percent={weightPercent}
              isOver={isOverWeight}
            />
          </div>
        )}

        {isOver && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-destructive/10 text-destructive text-sm animate-scale-in">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              {isOverVolume && isOverWeight
                ? "Volume e peso excedem a capacidade do caminhão!"
                : isOverVolume
                ? "Volume excede a capacidade do caminhão!"
                : "Peso excede a capacidade do caminhão!"}
              {" "}Considere um caminhão maior ou remova itens.
            </p>
          </div>
        )}

        {!selectedTruck && (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center">
              <Truck className="h-5 w-5 text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground">
              Selecione um caminhão na aba &quot;Caminhões&quot;
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatCard({
  icon,
  label,
  value,
  alert,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  alert?: boolean;
}) {
  return (
    <div className="rounded-xl bg-muted/40 p-3 space-y-1.5">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className={`text-lg font-bold ${alert ? "text-destructive" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function ProgressBar({
  label,
  percent,
  isOver,
}: {
  label: string;
  percent: number;
  isOver: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className={isOver ? "text-destructive font-semibold" : "text-muted-foreground"}>
          {percent}%
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out animate-progress-fill ${
            isOver
              ? "bg-destructive"
              : percent > 80
              ? "bg-accent"
              : "bg-primary"
          }`}
          style={{ width: `${Math.min(100, percent)}%` }}
        />
      </div>
    </div>
  );
}
