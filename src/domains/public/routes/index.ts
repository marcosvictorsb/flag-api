import { Request, Response, Router } from 'express';
import * as factories from '../factories';
import { validateSchema } from '@middlewares/validate.schema';
import { findFeatureFlagSchema } from '../schemas';
import { ValideApiKey } from '@middlewares/auth.key.middlewares';

const { findFeatureFlagController } = factories;

const router = Router();

router.get(
  '/v1/:env/flags',
  ValideApiKey,
  validateSchema(findFeatureFlagSchema),
  (request: Request, response: Response) =>
    findFeatureFlagController.findFeatureFlags(request, response)
);

export default router;
