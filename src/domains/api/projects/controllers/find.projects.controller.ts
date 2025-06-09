import { Response } from 'express';
import { FindProjectsInteractor } from '@domains/api/projects/usecases/find.projects.interactor';
import { FindProjectsControllerDependencies } from '@domains/api/projects/interfaces/find.projects.interface';
import { CustomRequest } from '@protocols/http';

interface IFindProjectsController {
  findProjects(request: CustomRequest, response: Response): Promise<Response>;
}

export class FindProjectsController implements IFindProjectsController {
  protected interactor: FindProjectsInteractor;

  constructor(params: FindProjectsControllerDependencies) {
    this.interactor = params.interactor;
  }

  public async findProjects(
    request: CustomRequest,
    response: Response
  ): Promise<Response> {
    const userId = request.user?.id as unknown as number;
    const result = await this.interactor.execute({ id_user: userId });
    return response.status(result.status).json(result.body);
  }
}
