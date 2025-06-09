import { Request, Response, Router } from 'express';
import * as factories from '@domains/api/projects/factories';
import { validateSchema } from '@middlewares/validate.schema';
import { createProjectSchema } from '@domains/api/projects/schemas/';
import { authMiddleware } from '@middlewares/auth.jwt.middlewares';
import { CustomRequest } from '@protocols/http';

const {
  createProjectController,
  findProjectController,
  updateProjectController,
  deleteProjectController
} = factories;

const router = Router();

router.post(
  '/',
  authMiddleware,
  validateSchema(createProjectSchema),
  (request: Request, response: Response) =>
    createProjectController.createProject(request, response)
);

router.get('/', authMiddleware, (request: Request, response: Response) =>
  findProjectController.findProjects(
    request as unknown as CustomRequest,
    response
  )
);

router.put('/', (request: Request, response: Response) =>
  updateProjectController.updateProject(request, response)
);

router.delete('/', (request: Request, response: Response) =>
  deleteProjectController.deleteProject(request, response)
);

export default router;
