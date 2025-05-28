import { IPresenter } from '@protocols/presenter';
import { HttpResponse } from '@protocols/http';
import {
  CreateFeatureFlagInteractorDependencies,
  ICreateFeatureFlagGateway,
  InputCreateFeatureFlags
} from '@domains/api/feature_flags';

export class CreateFeatureFlagInteractor {
  protected gateway: ICreateFeatureFlagGateway;
  protected presenter: IPresenter;

  constructor(params: CreateFeatureFlagInteractorDependencies) {
    this.gateway = params.gateway;
    this.presenter = params.presenter;
  }

  async execute(input: InputCreateFeatureFlags): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo('Iniciando criação de feature flag', {
        requestTxt: JSON.stringify(input)
      });

      const existingFlag = await this.gateway.findFeatureFlag({
        name: input.name,
        id_user: input.id_user,
        id_project: input.id_project
      });
      if (existingFlag) {
        this.gateway.loggerError('Feature flag já existe', {
          requestTxt: JSON.stringify(input)
        });
        return this.presenter.conflict('Feature flag já existe');
      }
      const featureFlag = await this.gateway.createFeatureFlag(input);
      this.gateway.loggerInfo('Feature flag criada com sucesso', {
        requestTxt: JSON.stringify(featureFlag)
      });
      return this.presenter.created(featureFlag);
    } catch (error) {
      if (error?.errors[0].message) {
        this.gateway.loggerError('Erro ao criar a feature flag', {
          error: error?.errors[0].message
        });
        return this.presenter.serverError('Erro ao criar a feature flag');
      }
      this.gateway.loggerError('Erro ao criar a feature flag', { error });
      return this.presenter.serverError('Erro ao criar a feature flag');
    }
  }
}
