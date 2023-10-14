import { z } from "zod";

export const ValidationLogin = z.object({
  name: z.string().min(1, { message: "O campo nome é obrigatorio" }),
  password: z.string().min(5, { message: "É obrigatório ter pelo menos 5 dígitos" }),
});
