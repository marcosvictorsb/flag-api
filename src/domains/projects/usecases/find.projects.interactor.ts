import { IPresenter } from '../../../protocols/presenter';
import { HttpResponse } from '../../../protocols/http';
import {
  FindProjectsInteractorDependencies,
  IFindProjectsGateway,
  InputFindProject
} from '../interfaces/';

export class FindProjectsInteractor {
  protected gateway: IFindProjectsGateway;
  protected presenter: IPresenter;

  constructor(params: FindProjectsInteractorDependencies) {
    this.gateway = params.gateway;
    this.presenter = params.presenter;
  }

  async execute(input: InputFindProject): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo('Iniciando busca de projetos');
      const projects = await this.gateway.findProjects({
        id_user: input.id_user
      });
      this.gateway.loggerInfo('Busca de projetos finalizada');
      if (!projects || !projects.length) {
        this.gateway.loggerInfo('Nenhum projeto encontrado');
        return this.presenter.OK([]);
      }
      return this.presenter.OK(projects);
    } catch (error) {
      this.gateway.loggerInfo('Erro ao buscar projetos', error);
      return this.presenter.serverError('Erro ao buscar projetos');
    }
  }
}
