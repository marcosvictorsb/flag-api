import { z } from 'zod';

export const createFeatureFlagSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'O nome da feature flag é obrigatório'),
    description: z.string().optional(),
    type: z.enum(['boolean', 'percentage', 'variants']),
    status: z.enum(['enabled', 'disabled']).default('disabled'),
    rollout: z
      .number()
      .min(0, 'O valor de rollout deve ser entre 0 e 100')
      .max(100)
      .optional()
      .default(0),
    variants: z
      .array(
        z.object({
          name: z.string().min(1, 'O nome da variante é obrigatório'),
          weight: z
            .number()
            .min(0, 'O peso da variante deve ser maior ou igual a 0')
            .max(100, 'O peso da variante deve ser menor ou igual a 100')
            .optional()
        })
      )
      .optional(),
    targets: z
      .array(z.union([z.string(), z.number()]))
      .optional()
      .default([]),
    id_user: z.number().int().positive('O ID do usuário é obrigatório'),
    id_project: z.number().int().positive('O ID do projeto é obrigatório')
  })
});
