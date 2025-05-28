import { Request, Response, Router } from 'express';
import * as factories from '../factories';
import { validateSchema } from '@middlewares/validate.schema';
import { createFeatureFlagSchema } from '../schemas';

const { createFeatureFlagController } = factories;

const router = Router();

router.post(
  '/',
  validateSchema(createFeatureFlagSchema),
  (request: Request, response: Response) =>
    createFeatureFlagController.createFeatureFlags(request, response)
);

export default router;
