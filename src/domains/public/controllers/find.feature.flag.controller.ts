import { Request, Response } from 'express';
import { FindFeatureFlagInteractor } from '@domains/api/feature_flags/usecases/';
import {
  FindFeatureFlagControllerDependencies,
  InputFindFeatureFlags
} from '@domains/api/feature_flags/interfaces/';
import { EnvironmentEntity, EnvironmentTypes } from '@domains/common';

interface IFindFeatureFlagController {
  findFeatureFlags(request: Request, response: Response): Promise<Response>;
}

export class FindFeatureFlagController implements IFindFeatureFlagController {
  protected interactor: FindFeatureFlagInteractor;

  constructor(params: FindFeatureFlagControllerDependencies) {
    this.interactor = params.interactor;
  }

  public async findFeatureFlags(
    request: Request,
    response: Response
  ): Promise<Response> {
    const input: InputFindFeatureFlags = {
      envType: request.params.env as EnvironmentTypes,
      key: request.headers.authorization?.replace('Bearer ', '') as string,
      featureName: request.query?.name_feature as string
    };
    const result = await this.interactor.execute(input);
    return response.status(result.status).json(result.body);
  }
}
