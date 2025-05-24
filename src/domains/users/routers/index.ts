import { Request, Response, Router } from 'express';
import * as factories from '../factories';

const { createUserController } = factories;

const router = Router();

router.post('/', async (request, response) => {
  await createUserController.createUser(request, response);
});

export default router;
