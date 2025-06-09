import { Request, Response } from 'express';
import { FindFeatureFlagInteractor } from '@domains/api/feature_flags/usecases/';
import {
  FindFeatureFlagControllerDependencies,
  InputFindFeatureFlags
} from '@domains/api/feature_flags/interfaces/';
import { EnvironmentEntity, EnvironmentTypes } from '@domains/common';
import { CustomRequest } from '@protocols/http';


interface IFindFeatureFlagController {
  findFeatureFlags(request: CustomRequest, response: Response): Promise<Response>;
}

export class FindFeatureFlagController implements IFindFeatureFlagController {
  protected interactor: FindFeatureFlagInteractor;

  constructor(params: FindFeatureFlagControllerDependencies) {
    this.interactor = params.interactor;
  }

  public async findFeatureFlags(
    request: CustomRequest,
    response: Response
  ): Promise<Response> {
    const input: InputFindFeatureFlags = {
      id_user: request.user?.id as unknown as number,
      identifierProject: request.params.indentifier
    };
    const result = await this.interactor.execute(input);
    return response.status(result.status).json(result.body);
  }
}
