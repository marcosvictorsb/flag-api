import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .max(80, 'Nome deve ter no máximo 50 caracteres'),
    email: z.string().email('E-mail inválido'),
    password_hash: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres')
  })
});
