import { Request, Response } from 'express';
import { FindProjectsInteractor } from '@domains/api/projects/usecases/find.projects.interactor';
import { FindProjectsControllerDependencies } from '@domains/api/projects/interfaces/find.projects.interface';

interface IFindProjectsController {
  findProjects(request: Request, response: Response): Promise<Response>;
}

export class FindProjectsController implements IFindProjectsController {
  protected interactor: FindProjectsInteractor;

  constructor(params: FindProjectsControllerDependencies) {
    this.interactor = params.interactor;
  }

  public async findProjects(
    request: Request,
    response: Response
  ): Promise<Response> {
    const result = await this.interactor.execute(request.body);
    return response.status(result.status).json(result.body);
  }
}
