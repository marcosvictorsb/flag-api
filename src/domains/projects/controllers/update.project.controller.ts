import { Request, Response } from 'express';
import { UpdateProjectInteractor } from '../usecases/update.project.interactor';
import { UpdateProjectControllerDependencies } from '../interfaces/';

interface IUpdateProjectController {
  updateProject(request: Request, response: Response): Promise<Response>;
}

export class UpdateProjectController implements IUpdateProjectController {
  protected interactor: UpdateProjectInteractor;

  constructor(params: UpdateProjectControllerDependencies) {
    this.interactor = params.interactor;
  }

  public async updateProject(
    request: Request,
    response: Response
  ): Promise<Response> {
    const result = await this.interactor.execute(request.body);
    return response.status(result.status).json(result.body);
  }
}
