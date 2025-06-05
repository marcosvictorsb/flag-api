import { z } from 'zod';

export const findFeatureFlagSchema = z.object({
  params: z.object({
    env: z.enum(['sandbox', 'production'])
  })
});

export const headersSchema = z.object({
  authorization: z.string()
});
