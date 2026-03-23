import { z } from "zod";

export const createMudancaSchema = z.object({
  enderecoOrigem: z.string().min(5, "Endereço de origem é obrigatório"),
  enderecoDestino: z.string().min(5, "Endereço de destino é obrigatório"),
  dataDesejada: z.string().optional(),
});

export const updateMudancaSchema = createMudancaSchema.partial();

export const addItemToCanvasSchema = z.object({
  mudancaId: z.string(),
  itemId: z.string(),
  x: z.number().min(0),
  y: z.number().min(0),
  rotacao: z.number().min(0).max(360).default(0),
});

export const updateCargaLayoutSchema = z.object({
  mudancaId: z.string(),
  caminhaoId: z.string(),
  itensPosicionados: z.array(
    z.object({
      itemId: z.string(),
      x: z.number(),
      y: z.number(),
      rotacao: z.number(),
    })
  ),
  ocupacaoPercentual: z.number().min(0).max(100),
});

export const cotacaoFilterSchema = z.object({
  precoMin: z.number().optional(),
  precoMax: z.number().optional(),
  notaMinima: z.number().min(0).max(5).optional(),
  dataDisponivel: z.string().optional(),
  seguroIncluso: z.boolean().optional(),
  tipoCaminhao: z.string().optional(),
  ordenarPor: z.enum(["preco", "nota", "data"]).default("preco"),
});

export type CreateMudancaInput = z.infer<typeof createMudancaSchema>;
export type UpdateMudancaInput = z.infer<typeof updateMudancaSchema>;
export type AddItemToCanvasInput = z.infer<typeof addItemToCanvasSchema>;
export type UpdateCargaLayoutInput = z.infer<typeof updateCargaLayoutSchema>;
export type CotacaoFilterInput = z.infer<typeof cotacaoFilterSchema>;
