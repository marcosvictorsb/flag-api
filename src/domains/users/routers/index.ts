import { Request, Response, Router } from 'express';
import * as factories from '../factories';
import { validateSchema } from '../../../middlewares/validate.schema';
import { createUserSchema } from '../schemas/';

const { createUserController } = factories;

const router = Router();

router.post(
  '/',
  validateSchema(createUserSchema),
  (request: Request, response: Response) =>
    createUserController.createUser(request, response)
);

export default router;
