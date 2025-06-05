import { Request, Response } from 'express';
import { CreateProjectInteractor } from '@domains/api/projects/usecases/create.project.interactor';
import {
  CreateProjectControllerDependencies,
  InputCreateProject
} from '@domains/api/projects/interfaces/create.project.interface';

interface CustomRequest extends Request {
  userId?: number;
}

interface ICreateProjectController {
  createProject(request: CustomRequest, response: Response): Promise<Response>;
}

export class CreateProjectController implements ICreateProjectController {
  protected interactor: CreateProjectInteractor;

  constructor(params: CreateProjectControllerDependencies) {
    this.interactor = params.interactor;
  }

  public async createProject(
    request: CustomRequest,
    response: Response
  ): Promise<Response> {
    const input: InputCreateProject = {
      name: request.body.name,
      description: request.body.description,
      id_user: request.userId as number
    };
    const result = await this.interactor.execute(input);
    return response.status(result.status).json(result.body);
  }
}
