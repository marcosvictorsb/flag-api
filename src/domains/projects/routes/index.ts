import { Request, Response, Router } from 'express';
import * as factories from '../factories';
import { validateSchema } from '../../../middlewares/validate.schema';
import { createProjectSchema } from '../schemas/create.project.validator';

const {
  createProjectController,
  findProjectController,
  updateProjectController,
  deleteProjectController
} = factories;

const router = Router();

router.post(
  '/',
  validateSchema(createProjectSchema),
  (request: Request, response: Response) =>
    createProjectController.createProject(request, response)
);

router.get('/', (request: Request, response: Response) =>
  findProjectController.findProjects(request, response)
);

router.put('/', (request: Request, response: Response) =>
  updateProjectController.updateProject(request, response)
);

router.delete('/', (request: Request, response: Response) =>
  deleteProjectController.deleteProject(request, response)
);

export default router;
