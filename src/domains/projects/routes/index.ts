import { Request, Response, Router } from 'express';
import * as factories from '../factories';
import { validateSchema } from '../../../middlewares/validate.schema';

const { createProjectController } = factories;

const router = Router();

router.post('/', (request: Request, response: Response) =>
  createProjectController.createProject(request, response)
);

export default router;
