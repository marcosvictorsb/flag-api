import { IPresenter } from '@protocols/presenter';
import { HttpResponse } from '@protocols/http';
import {
  FindFeatureFlagInteractorDependencies,
  IFindFeatureFlagGateway,
  InputFindFeatureFlags
} from '@domains/api/feature_flags';
import { CacheHelper } from '@infra/database/connection/redis';

export class FindFeatureFlagInteractor {
  protected gateway: IFindFeatureFlagGateway;
  protected presenter: IPresenter;

  constructor(params: FindFeatureFlagInteractorDependencies) {
    this.gateway = params.gateway;
    this.presenter = params.presenter;
  }

  async execute(input: InputFindFeatureFlags): Promise<HttpResponse> {
    try {
      const { id_user, identifierProject } = input;
      this.gateway.loggerInfo('Iniciando a busca pela flag cadastrada', {
        requestTxt: JSON.stringify({ id_user, identifierProject } )
      });

      const project = await this.gateway.findProject({
        uuid: identifierProject,
        id_user
      })

      if(!project) {
        this.gateway.loggerInfo('Projeto não encontrado', { requestTxt: JSON.stringify({
          identifierProject, id_user})
        })
        return this.presenter.notFound('Projeto não encontrado');
      }

      this.gateway.loggerInfo(JSON.stringify(project))

      const featureFlags = await this.gateway.findFeatureFlag({
        id_project: project.id
      })

      if(!featureFlags) {
        this.gateway.loggerInfo(`O projeto: ${project.id} não possui features flags`)
        return this.presenter.OK({
          name_project: project.name,
          features: []
        });
      }

      return this.presenter.OK({
        name_project: project.name,
        featureFlags
      });
    } catch (error) {
      this.gateway.loggerError('Error ao buscas a feature flag', { error });
      return this.presenter.serverError('Error ao buscas a feature flag');
    }
  }
}
