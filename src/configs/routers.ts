import { Request, Response, Router } from 'express';
import userRoutes from '@domains/api/users/routers';
import projectRoutes from '@domains/api/projects/routes';
import authRoutes from '@domains/api/authentication/routes';

const routers = Router();

routers.get('/healhcheck', (request: Request, response: Response) => {
  response.status(200).json({ message: 'API is running' });
});

routers.use('/users', userRoutes);
routers.use('/projects', projectRoutes);
routers.use('/authenticate', authRoutes);

// const notFound = (request: Request, response: Response) => {
//   response.status(404).json({ rota: 'Route does not exist' });
// }
// routers.use(notFound);

export default routers;
