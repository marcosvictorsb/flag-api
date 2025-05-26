import { Router } from 'express';
import * as factories from '../factories';

const { authenticationController } = factories;

const router = Router();

router.post('/', (request, response) =>
  authenticationController.authentication(request, response)
);

export default router;
