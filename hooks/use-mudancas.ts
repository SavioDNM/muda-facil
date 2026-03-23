"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMudancaInput } from "@/lib/validations";

export function useMudancas() {
  return useQuery({
    queryKey: ["mudancas"],
    queryFn: async () => {
      const res = await fetch("/api/mudancas");
      if (!res.ok) throw new Error("Failed to fetch mudancas");
      return res.json();
    },
  });
}

export function useMudanca(id: string) {
  return useQuery({
    queryKey: ["mudancas", id],
    queryFn: async () => {
      const res = await fetch(`/api/mudancas/${id}`);
      if (!res.ok) throw new Error("Failed to fetch mudanca");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateMudanca() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateMudancaInput) => {
      const res = await fetch("/api/mudancas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mudancas"] });
    },
  });
}

export function useDeleteMudanca() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/mudancas/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mudancas"] });
    },
  });
}
