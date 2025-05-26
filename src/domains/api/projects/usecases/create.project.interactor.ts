import {
  CreateProjectInteractorDependencies,
  ICreateProjectGateway,
  InputCreateProject
} from '@domains/api/projects/interfaces';
import { IPresenter } from '@protocols/presenter';
import { HttpResponse } from '@protocols/http';
import { CreateEnvironmentInteractor } from '@domains/common';
import {
  EnvironmentTypes,
  InputCreateEnvironment
} from '@domains/common/environments/';

export class CreateProjectInteractor {
  protected gateway: ICreateProjectGateway;
  protected presenter: IPresenter;
  protected interactorEnvironment: CreateEnvironmentInteractor;

  constructor(params: CreateProjectInteractorDependencies) {
    this.gateway = params.gateway;
    this.presenter = params.presenter;
    this.interactorEnvironment = params.interactorEnvironment;
  }

  async execute(input: InputCreateProject): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo('Iniciando criação de projeto', {
        input: JSON.stringify(input)
      });
      const projectExist = await this.gateway.findProject({
        name: input.name,
        id_user: input.id_user
      });

      if (projectExist) {
        this.gateway.loggerInfo('Projeto já existe', {
          requestTxt: JSON.stringify(projectExist)
        });
        return this.presenter.conflict('Projeto já existe');
      }

      const project = await this.gateway.createProject(input);
      this.gateway.loggerInfo('Projeto criado com sucesso', {
        requestTxt: JSON.stringify(project)
      });

      const environmentInput: InputCreateEnvironment = {
        id_project: project.id as number
      };
      await this.interactorEnvironment.execute(environmentInput);

      return this.presenter.created(project);
    } catch (error) {
      this.gateway.loggerError('Erro ao criar projeto', error);
      return this.presenter.serverError('Erro ao criar projeto');
    }
  }
}
