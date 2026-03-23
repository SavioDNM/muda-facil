"use client";

import { useState } from "react";
import { CATALOG_ITEMS, CATEGORIES, CatalogItem } from "@/lib/items-catalog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

interface ItemCatalogProps {
  onAddItem: (item: CatalogItem) => void;
  disabled?: boolean;
}

export function ItemCatalog({ onAddItem, disabled }: ItemCatalogProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesSearch = item.nome
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      !activeCategory || item.categoria === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar móvel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 bg-muted/50 border-transparent focus:border-primary/30 focus:bg-background transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge
          variant={activeCategory === null ? "default" : "outline"}
          className="cursor-pointer text-xs hover:opacity-80 transition-opacity"
          onClick={() => setActiveCategory(null)}
        >
          Todos
        </Badge>
        {CATEGORIES.map((cat) => (
          <Badge
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            className="cursor-pointer text-xs hover:opacity-80 transition-opacity"
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.icone} {cat.nome}
          </Badge>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-0.5 -mx-1 px-1">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            disabled={disabled}
            onClick={() => onAddItem(item)}
            className="w-full group flex items-center gap-3 p-2.5 rounded-lg hover:bg-primary/5 active:bg-primary/10 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="h-10 w-10 rounded-lg bg-muted/60 flex items-center justify-center text-xl shrink-0 group-hover:bg-primary/10 transition-colors">
              {item.icone}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                {item.nome}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.larguraCm}x{item.profundidadeCm}x{item.alturaCm}cm
                <span className="mx-1.5 text-border">|</span>
                {item.pesoKg}kg
                <span className="mx-1.5 text-border">|</span>
                {item.volumeM3}m³
              </p>
            </div>
            <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shrink-0">
              <Plus className="h-4 w-4 text-primary" />
            </div>
          </button>
        ))}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <Search className="h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground text-center">
              Nenhum item encontrado
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
