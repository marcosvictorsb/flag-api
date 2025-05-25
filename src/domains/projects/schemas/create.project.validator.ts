import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .max(80, 'Nome deve ter no máximo 50 caracteres'),
    description: z.string().max(200).optional(),
    id_user: z
      .number()
      .int('id_user deve ser um número inteiro')
      .positive('id_user deve ser um número positivo')
      .nonnegative('id_user deve ser um número não negativo')
  })
});
