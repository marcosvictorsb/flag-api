import { Request, Response } from 'express';
import { DeleteProjectInteractor } from '@domains/api/projects/usecases/delete.project.interactor';
import { DeleteProjectControllerDependencies } from '@domains/api/projects/interfaces';

interface IDeleteProjectController {
  deleteProject(request: Request, response: Response): Promise<Response>;
}

export class DeleteProjectController implements IDeleteProjectController {
  protected interactor: DeleteProjectInteractor;

  constructor(params: DeleteProjectControllerDependencies) {
    this.interactor = params.interactor;
  }

  public async deleteProject(
    request: Request,
    response: Response
  ): Promise<Response> {
    const result = await this.interactor.execute(request.body);
    return response.status(result.status).json(result.body);
  }
}
