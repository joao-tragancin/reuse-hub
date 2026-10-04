import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().trim().min(3, "Informe um título com pelo menos 3 caracteres."),
  description: z
    .string()
    .trim()
    .min(10, "A descrição deve ter pelo menos 10 caracteres."),
  category: z.string().trim().min(1, "Selecione uma categoria."),
  condition: z.string().trim().min(1, "Selecione o estado do item."),
  city: z.string().trim().min(2, "Informe a cidade."),
  contact: z.string().trim().min(5, "Informe um contato válido."),
  imageUrl: z
    .union([z.url("Informe uma URL válida."), z.literal("")])
    .optional()
    .transform((value) => value || null),
  status: z.enum(["DISPONIVEL", "DOADO"]).optional(),
});

export const statusSchema = z.object({
  status: z.enum(["DISPONIVEL", "DOADO"]),
});
