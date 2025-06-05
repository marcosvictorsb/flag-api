import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .max(80, 'Nome deve ter no máximo 50 caracteres'),
    description: z.string().max(200).optional()
  })
});
