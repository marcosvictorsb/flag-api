import { Request, Response } from 'express';
import { CreateFeatureFlagInteractor } from '@domains/api/feature_flags/usecases/create.feature.flag.interactor';
import { CreateFeatureFlagControllerDependencies } from '@domains/api/feature_flags/interfaces/create.feature.flag.interface';

interface ICreateFeatureFlagController {
  createFeatureFlags(request: Request, response: Response): Promise<Response>;
}

export class CreateFeatureFlagController
  implements ICreateFeatureFlagController
{
  protected interactor: CreateFeatureFlagInteractor;

  constructor(params: CreateFeatureFlagControllerDependencies) {
    this.interactor = params.interactor;
  }

  public async createFeatureFlags(
    request: Request,
    response: Response
  ): Promise<Response> {
    const result = await this.interactor.execute(request.body);
    return response.status(result.status).json(result.body);
  }
}
