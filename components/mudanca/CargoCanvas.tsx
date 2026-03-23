"use client";

import { useState, useCallback } from "react";
import { CatalogItem } from "@/lib/items-catalog";
import { TruckSpec } from "@/lib/trucks";
import { X, RotateCw, Move, ZoomIn, ZoomOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface CanvasItem {
  instanceId: string;
  item: CatalogItem;
  x: number;
  y: number;
  rotacao: number;
}

interface CargoCanvasProps {
  items: CanvasItem[];
  selectedTruck: TruckSpec | null;
  onRemoveItem: (instanceId: string) => void;
  onUpdateItem: (instanceId: string, updates: Partial<CanvasItem>) => void;
}

const CANVAS_SCALE = 3;

export function CargoCanvas({
  items,
  selectedTruck,
  onRemoveItem,
  onUpdateItem,
}: CargoCanvasProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const canvasWidth = selectedTruck
    ? selectedTruck.comprimentoCm * CANVAS_SCALE
    : 600;
  const canvasHeight = selectedTruck
    ? selectedTruck.larguraCm * CANVAS_SCALE
    : 400;

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent,
      instanceId: string,
      itemX: number,
      itemY: number
    ) => {
      e.preventDefault();
      const rect = (
        e.currentTarget.parentElement as HTMLElement
      ).getBoundingClientRect();
      setDraggingId(instanceId);
      setDragOffset({
        x: e.clientX - rect.left - itemX * CANVAS_SCALE,
        y: e.clientY - rect.top - itemY * CANVAS_SCALE,
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggingId) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(
        0,
        (e.clientX - rect.left - dragOffset.x) / CANVAS_SCALE
      );
      const y = Math.max(
        0,
        (e.clientY - rect.top - dragOffset.y) / CANVAS_SCALE
      );
      onUpdateItem(draggingId, { x, y });
    },
    [draggingId, dragOffset, onUpdateItem]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Move className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {selectedTruck
              ? selectedTruck.nome
              : "Selecione um caminhão"}
          </span>
          {selectedTruck && (
            <Badge variant="outline" className="text-xs">
              {selectedTruck.comprimentoCm}x{selectedTruck.larguraCm}cm
            </Badge>
          )}
        </div>
        <Badge
          variant="secondary"
          className="text-xs"
        >
          {items.length} {items.length === 1 ? "item" : "itens"}
        </Badge>
      </div>

      {/* Canvas */}
      <div className="p-3 overflow-auto bg-muted/10">
        <div
          className="relative border-2 border-dashed border-border/60 rounded-lg mx-auto transition-colors"
          style={{
            width: canvasWidth,
            height: canvasHeight,
            minHeight: 200,
            cursor: draggingId ? "grabbing" : "default",
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 29px, oklch(0.922 0.004 247 / 0.4) 29px, oklch(0.922 0.004 247 / 0.4) 30px), repeating-linear-gradient(90deg, transparent, transparent 29px, oklch(0.922 0.004 247 / 0.4) 29px, oklch(0.922 0.004 247 / 0.4) 30px)",
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {items.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center">
                <Package className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Nenhum item adicionado
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  Clique em itens do catálogo para adicionar
                </p>
              </div>
            </div>
          )}

          {items.map((canvasItem) => {
            const isRotated =
              canvasItem.rotacao === 90 || canvasItem.rotacao === 270;
            const displayW = isRotated
              ? canvasItem.item.profundidadeCm
              : canvasItem.item.larguraCm;
            const displayH = isRotated
              ? canvasItem.item.larguraCm
              : canvasItem.item.profundidadeCm;
            const isDragging = draggingId === canvasItem.instanceId;

            return (
              <div
                key={canvasItem.instanceId}
                className={`absolute group rounded-md flex items-center justify-center cursor-grab select-none transition-all duration-150 ${
                  isDragging
                    ? "ring-2 ring-primary shadow-xl shadow-primary/20 z-20 scale-[1.02]"
                    : "border-2 border-primary/30 hover:border-primary hover:shadow-md z-10"
                }`}
                style={{
                  left: canvasItem.x * CANVAS_SCALE,
                  top: canvasItem.y * CANVAS_SCALE,
                  width: displayW * CANVAS_SCALE,
                  height: displayH * CANVAS_SCALE,
                  backgroundColor: isDragging
                    ? "oklch(0.546 0.245 264 / 0.2)"
                    : "oklch(0.546 0.245 264 / 0.1)",
                  minWidth: 24,
                  minHeight: 24,
                }}
                onMouseDown={(e) =>
                  handleMouseDown(
                    e,
                    canvasItem.instanceId,
                    canvasItem.x,
                    canvasItem.y
                  )
                }
              >
                <span className="text-sm font-medium text-primary truncate px-1 pointer-events-none">
                  {canvasItem.item.icone}
                </span>

                {/* Controls */}
                <div className="absolute -top-3 -right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateItem(canvasItem.instanceId, {
                        rotacao: (canvasItem.rotacao + 90) % 360,
                      });
                    }}
                    className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 shadow-md transition-transform hover:scale-110"
                  >
                    <RotateCw className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(canvasItem.instanceId);
                    }}
                    className="h-6 w-6 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/80 shadow-md transition-transform hover:scale-110"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>

                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-30 pointer-events-none">
                  <span className="text-xs bg-foreground text-background px-2 py-1 rounded-md shadow-lg">
                    {canvasItem.item.nome}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Package(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
}
