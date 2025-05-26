import {
  CreateProjectInteractorDependencies,
  ICreateProjectGateway,
  InputCreateProject
} from '@domains/api/projects/interfaces';
import { IPresenter } from '@protocols/presenter';
import { HttpResponse } from '@protocols/http';

export class CreateProjectInteractor {
  protected gateway: ICreateProjectGateway;
  protected presenter: IPresenter;

  constructor(params: CreateProjectInteractorDependencies) {
    this.gateway = params.gateway;
    this.presenter = params.presenter;
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
      return this.presenter.created(project);
    } catch (error) {
      this.gateway.loggerInfo('Erro ao criar projeto', error);
      return this.presenter.serverError('Erro ao criar projeto');
    }
  }
}
