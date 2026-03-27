import { z } from "zod";

export const pneuSchema = z.object({
  marca: z.string().min(2, "A marca é obrigatória."),
  modelo: z.string().min(2, "O modelo é obrigatório."),
  medida: z.string().min(2, "A medida é obrigatória (ex: 235/60R16)."),
  
  largura: z.string().min(1, "A largura é obrigatória."),
  perfil: z.string().min(1, "O perfil é obrigatório."),
  
  // Usando coerce simples
  aro: z.coerce.number().min(10, "Aro inválido.").max(40, "Aro inválido."),
  
  indicePeso: z.string().min(1, "O índice de peso é obrigatório."),
  indiceVelocidade: z.string().min(1, "O índice de velocidade é obrigatório."),
  tipoConstrucao: z.string().min(1, "O tipo de construção é obrigatório."),
  
  tipoTerreno: z.string().min(1, "O tipo de terreno é obrigatório."),
  desenho: z.string().min(1, "O desenho do pneu é obrigatório."),
  
  // Transforma a vírgula em ponto e converte para número
  preco: z.string()
    .min(1, "O preço é obrigatório.")
    .transform((val) => Number(val.replace(',', '.')))
    .refine((val) => !isNaN(val) && val > 0, { message: "Insira um preço válido maior que zero." }),
    
  quantidade: z.coerce.number().min(0, "A quantidade não pode ser negativa."),
});

export type PneuFormData = z.infer<typeof pneuSchema>;