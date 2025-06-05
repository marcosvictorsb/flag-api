import {
  ICreateEnvironmentGateway,
  InputCreateEnvironment,
  CreateEnvironmentInteractorDependencies,
  EnvironmentTypes
} from '@domains/common/environments';
import { Utils } from '@shared/utils';

export class CreateEnvironmentInteractor {
  protected gateway: ICreateEnvironmentGateway;

  constructor(params: CreateEnvironmentInteractorDependencies) {
    this.gateway = params.gateway;
  }

  async execute(input: InputCreateEnvironment): Promise<void> {
    this.gateway.loggerInfo('Iniciando criação de ambiente', {
      input: JSON.stringify(input)
    });
    await this.gateway.createEnvironment({
      id_project: input.id_project,
      type: EnvironmentTypes.SANDBOX,
      key: Utils.generateApiKey()
    });
    await this.gateway.createEnvironment({
      id_project: input.id_project,
      type: EnvironmentTypes.PRODUCTION,
      key: Utils.generateApiKey()
    });
    this.gateway.loggerInfo('Ambientes criado com sucesso');
  }
}
