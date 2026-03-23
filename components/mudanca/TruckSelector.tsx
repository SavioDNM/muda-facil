"use client";

import { TRUCKS, TruckSpec } from "@/lib/trucks";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Check, AlertTriangle } from "lucide-react";

interface TruckSelectorProps {
  selectedTruckId: string | null;
  onSelectTruck: (truck: TruckSpec) => void;
  currentVolumeM3: number;
  currentWeightKg: number;
}

export function TruckSelector({
  selectedTruckId,
  onSelectTruck,
  currentVolumeM3,
  currentWeightKg,
}: TruckSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Selecione o caminhão ideal para a sua mudança. As barras mostram a ocupação atual.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TRUCKS.map((truck) => {
          const isSelected = selectedTruckId === truck.id;
          const volumePercent = Math.min(
            100,
            (currentVolumeM3 / truck.capacidadeM3) * 100
          );
          const weightPercent = Math.min(
            100,
            (currentWeightKg / truck.capacidadeKg) * 100
          );
          const isOverVolume = currentVolumeM3 > truck.capacidadeM3;
          const isOverWeight = currentWeightKg > truck.capacidadeKg;
          const isOver = isOverVolume || isOverWeight;
          const fits = currentVolumeM3 > 0 && !isOver;

          return (
            <Card
              key={truck.id}
              className={`cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                isSelected
                  ? "ring-2 ring-primary border-primary shadow-lg shadow-primary/10"
                  : "hover:border-primary/40 hover:shadow-md"
              }`}
              onClick={() => onSelectTruck(truck)}
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-semibold">{truck.nome}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {truck.descricao}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${fits ? "border-emerald-200 bg-emerald-50 text-emerald-700" : ""}`}
                  >
                    {truck.capacidadeM3}m³
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {truck.capacidadeKg}kg
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {truck.comprimentoCm}x{truck.larguraCm}cm
                  </Badge>
                </div>

                {/* Volume bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Volume</span>
                    <span
                      className={
                        isOverVolume
                          ? "text-destructive font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      {currentVolumeM3.toFixed(1)} / {truck.capacidadeM3}m³
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out animate-progress-fill ${
                        isOverVolume
                          ? "bg-destructive"
                          : volumePercent > 80
                          ? "bg-accent"
                          : "bg-primary"
                      }`}
                      style={{ width: `${Math.min(100, volumePercent)}%` }}
                    />
                  </div>
                </div>

                {/* Weight bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Peso</span>
                    <span
                      className={
                        isOverWeight
                          ? "text-destructive font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      {currentWeightKg.toFixed(0)} / {truck.capacidadeKg}kg
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out animate-progress-fill ${
                        isOverWeight
                          ? "bg-destructive"
                          : weightPercent > 80
                          ? "bg-accent"
                          : "bg-primary"
                      }`}
                      style={{ width: `${Math.min(100, weightPercent)}%` }}
                    />
                  </div>
                </div>

                {isOver && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-medium">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    Capacidade excedida
                  </div>
                )}

                {fits && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-600 text-xs font-medium">
                    <Check className="h-3.5 w-3.5 shrink-0" />
                    Cabe na sua mudança
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
