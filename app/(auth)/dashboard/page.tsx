"use client";

import { useState, useCallback } from "react";
import { signOut } from "next-auth/react";
import { CatalogItem } from "@/lib/items-catalog";
import { TruckSpec } from "@/lib/trucks";
import { ItemCatalog } from "@/components/mudanca/ItemCatalog";
import { TruckSelector } from "@/components/mudanca/TruckSelector";
import { CargoCanvas, CanvasItem } from "@/components/mudanca/CargoCanvas";
import { CargoSummary } from "@/components/mudanca/CargoSummary";
import { QuoteFilters, Quote } from "@/components/mudanca/QuoteFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Truck,
  Package,
  FileText,
  Settings,
  LogOut,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

// Demo quotes for display
const DEMO_QUOTES: Quote[] = [
  {
    id: "q1",
    transportadora: {
      nome: "TransLog Express",
      notaMedia: 4.7,
      totalAvaliacoes: 234,
      cidade: "São Paulo, SP",
    },
    precoCentavos: 85000,
    dataDisponivel: new Date(Date.now() + 3 * 86400000).toISOString(),
    seguroIncluso: true,
    tipoCaminhao: "3/4",
  },
  {
    id: "q2",
    transportadora: {
      nome: "Mudanças Rápidas",
      notaMedia: 4.2,
      totalAvaliacoes: 156,
      cidade: "São Paulo, SP",
    },
    precoCentavos: 65000,
    dataDisponivel: new Date(Date.now() + 5 * 86400000).toISOString(),
    seguroIncluso: false,
    tipoCaminhao: "HR",
  },
  {
    id: "q3",
    transportadora: {
      nome: "Frete Fácil",
      notaMedia: 4.9,
      totalAvaliacoes: 89,
      cidade: "Campinas, SP",
    },
    precoCentavos: 92000,
    dataDisponivel: new Date(Date.now() + 2 * 86400000).toISOString(),
    seguroIncluso: true,
    tipoCaminhao: "Baú",
  },
  {
    id: "q4",
    transportadora: {
      nome: "JM Transportes",
      notaMedia: 3.8,
      totalAvaliacoes: 312,
      cidade: "Guarulhos, SP",
    },
    precoCentavos: 55000,
    dataDisponivel: new Date(Date.now() + 7 * 86400000).toISOString(),
    seguroIncluso: false,
    tipoCaminhao: "HR",
  },
];

export default function DashboardPage() {
  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [selectedTruck, setSelectedTruck] = useState<TruckSpec | null>(null);

  const totalVolume = canvasItems.reduce(
    (acc, ci) => acc + ci.item.volumeM3,
    0
  );
  const totalWeight = canvasItems.reduce(
    (acc, ci) => acc + ci.item.pesoKg,
    0
  );

  const handleAddItem = useCallback((item: CatalogItem) => {
    const instanceId = `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setCanvasItems((prev) => [
      ...prev,
      { instanceId, item, x: 10, y: 10, rotacao: 0 },
    ]);
  }, []);

  const handleRemoveItem = useCallback((instanceId: string) => {
    setCanvasItems((prev) =>
      prev.filter((ci) => ci.instanceId !== instanceId)
    );
  }, []);

  const handleUpdateItem = useCallback(
    (instanceId: string, updates: Partial<CanvasItem>) => {
      setCanvasItems((prev) =>
        prev.map((ci) =>
          ci.instanceId === instanceId ? { ...ci, ...updates } : ci
        )
      );
    },
    []
  );

  const handleSelectTruck = useCallback((truck: TruckSpec) => {
    setSelectedTruck(truck);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 glass sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Truck className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight hidden sm:block">
                MudaFácil
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-primary/10 text-primary"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="hidden sm:flex text-xs border-accent/50 text-accent bg-accent/5"
            >
              TRIAL
            </Badge>
            <Link
              href="/settings/billing"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Assinatura</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors outline-none">
                <Settings className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuItem
                  onClick={() => {
                    window.location.href = "/settings/billing";
                  }}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Assinatura
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair da conta
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Planejar mudança
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Adicione itens, escolha o caminhão e compare cotações
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>
              {canvasItems.length} {canvasItems.length === 1 ? "item" : "itens"}{" "}
              adicionado{canvasItems.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up">
          {/* Left sidebar: Item Catalog */}
          <div className="lg:col-span-3 lg:h-[calc(100vh-13rem)]">
            <div className="bg-card rounded-xl border shadow-sm p-4 h-full flex flex-col">
              <h2 className="font-semibold text-sm mb-3 flex items-center gap-2 text-foreground">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                Catálogo de itens
              </h2>
              <ItemCatalog onAddItem={handleAddItem} />
            </div>
          </div>

          {/* Center: Canvas + Tabs */}
          <div className="lg:col-span-6 space-y-4">
            <Tabs defaultValue="canvas">
              <TabsList className="w-full bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="canvas" className="flex-1 rounded-lg">
                  <Package className="h-4 w-4 mr-2" />
                  Canvas de carga
                </TabsTrigger>
                <TabsTrigger value="trucks" className="flex-1 rounded-lg">
                  <Truck className="h-4 w-4 mr-2" />
                  Caminhões
                </TabsTrigger>
                <TabsTrigger value="quotes" className="flex-1 rounded-lg">
                  <FileText className="h-4 w-4 mr-2" />
                  Cotações
                  <Badge
                    variant="secondary"
                    className="ml-1.5 h-5 px-1.5 text-[10px]"
                  >
                    {DEMO_QUOTES.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="canvas" className="mt-4">
                <CargoCanvas
                  items={canvasItems}
                  selectedTruck={selectedTruck}
                  onRemoveItem={handleRemoveItem}
                  onUpdateItem={handleUpdateItem}
                />
              </TabsContent>

              <TabsContent value="trucks" className="mt-4">
                <TruckSelector
                  selectedTruckId={selectedTruck?.id ?? null}
                  onSelectTruck={handleSelectTruck}
                  currentVolumeM3={totalVolume}
                  currentWeightKg={totalWeight}
                />
              </TabsContent>

              <TabsContent value="quotes" className="mt-4">
                <QuoteFilters quotes={DEMO_QUOTES} filtrosAvancados={true} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right sidebar: Summary */}
          <div className="lg:col-span-3 space-y-4">
            <CargoSummary
              items={canvasItems}
              selectedTruck={selectedTruck}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
