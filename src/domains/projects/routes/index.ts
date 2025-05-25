import { Request, Response, Router } from 'express';
import * as factories from '../factories';
import { validateSchema } from '../../../middlewares/validate.schema';
import { createProjectSchema } from '../schemas/create.project.validator';

const { createProjectController } = factories;

const router = Router();

router.post(
  '/',
  validateSchema(createProjectSchema),
  (request: Request, response: Response) =>
    createProjectController.createProject(request, response)
);

export default router;
