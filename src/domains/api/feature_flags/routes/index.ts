import { Request, Response, Router } from 'express';
import * as factories from '../factories';
import { validateSchema } from '@middlewares/validate.schema';
import { createFeatureFlagSchema } from '../schemas';
import { authMiddleware } from '@middlewares/auth.jwt.middlewares';

const { createFeatureFlagController, findFeatureFlagController } = factories;

const router = Router();

router.post(
  '/',
  validateSchema(createFeatureFlagSchema),
  (request: Request, response: Response) =>
    createFeatureFlagController.createFeatureFlags(request, response)
);
router.get(
  '/:indentifier',
  authMiddleware,
  (request: Request, response: Response) =>
    findFeatureFlagController.findFeatureFlags(request, response)
);


export default router;
