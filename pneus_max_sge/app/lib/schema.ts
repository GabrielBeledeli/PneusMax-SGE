import { z } from "zod";

const MEDIDA_REGEX = /^\d{3}\/\d{2}R\d{2}$/;

export const pneuSchema = z.object({
  marca: z.string().min(2, "A marca é obrigatória."),
  modelo: z.string().min(2, "O modelo é obrigatório."),
  medida: z
    .string()
    .min(1, "A medida é obrigatória.")
    .regex(MEDIDA_REGEX, "Formato inválido. Use o padrão 235/60R16."),

  largura: z.string().min(1, "A largura é obrigatória."),
  perfil: z.string().min(1, "O perfil é obrigatório."),

  aro: z.coerce.number().min(10, "Aro inválido.").max(40, "Aro inválido."),

  indice_peso: z.string().min(1, "O índice de peso é obrigatório."),
  indice_velocidade: z.string().min(1, "O índice de velocidade é obrigatório."),
  tipo_construcao: z.string().min(1, "O tipo de construção é obrigatório."),

  tipo_terreno: z.string().min(1, "O tipo de terreno é obrigatório."),
  desenho: z.string().min(1, "O desenho do pneu é obrigatório."),

  preco: z
    .string()
    .min(1, "O preço é obrigatório.")
    .transform((val) => Number(val.replace(",", ".")))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Insira um preço válido maior que zero.",
    }),

  quantidade: z.coerce
    .number()
    .min(0, "A quantidade não pode ser negativa."),
});

export type PneuFormData = z.infer<typeof pneuSchema>;
