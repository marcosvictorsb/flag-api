import {
  InputUpdateProject,
  IUpdateProjectGateway,
  UpdateProjectInteractorDependencies
} from '@domains/api/projects/interfaces';
import { IPresenter } from '@protocols/presenter';
import { HttpResponse } from '@protocols/http';

export class UpdateProjectInteractor {
  protected gateway: IUpdateProjectGateway;
  protected presenter: IPresenter;

  constructor(params: UpdateProjectInteractorDependencies) {
    this.gateway = params.gateway;
    this.presenter = params.presenter;
  }

  async execute(input: InputUpdateProject): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo('Iniciando a atualização do projeto', {
        requestTxt: JSON.stringify(input)
      });
      const { id, name, description } = input;
      const project = await this.gateway.findProject({ id });
      if (!project) {
        this.gateway.loggerInfo('Projeto não encontrado', {
          id_project: id
        });
        return this.presenter.notFound('Projeto não encontrado');
      }
      this.gateway.loggerInfo('Projeto encontrado, iniciando atualização', {
        id_project: input.id
      });
      await this.gateway.updateProject({ name, description }, { id });
      this.gateway.loggerInfo('Projeto atualizado com sucesso', {
        id_project: id
      });
      return this.presenter.OK();
    } catch (error) {
      this.gateway.loggerError('Error para atualizar projeto', { error });
      return this.presenter.serverError('Erro para atualizar projeto');
    }
  }
}
