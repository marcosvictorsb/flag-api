import { Request, Response } from 'express';
import { CreateProjectInteractor } from '@domains/api/projects/usecases/create.project.interactor';
import { CreateProjectControllerDependencies } from '@domains/api/projects/interfaces/create.project.interface';

interface ICreateProjectController {
  createProject(request: Request, response: Response): Promise<Response>;
}

export class CreateProjectController implements ICreateProjectController {
  protected interactor: CreateProjectInteractor;

  constructor(params: CreateProjectControllerDependencies) {
    this.interactor = params.interactor;
  }

  public async createProject(
    request: Request,
    response: Response
  ): Promise<Response> {
    const result = await this.interactor.execute(request.body);
    return response.status(result.status).json(result.body);
  }
}
