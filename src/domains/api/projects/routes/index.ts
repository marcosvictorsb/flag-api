import { Request, Response, Router } from 'express';
import * as factories from '@domains/api/projects/factories';
import { validateSchema } from '@middlewares/validate.schema';
import { createProjectSchema } from '@domains/api/projects/schemas/';

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
