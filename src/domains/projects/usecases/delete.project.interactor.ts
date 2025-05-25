import { IDeleteProjectGateway } from '../interfaces/';
import { IPresenter } from '../../../protocols/presenter';
import { HttpResponse } from '../../../protocols/http';
import { InputDeleteProject } from '../interfaces/';

export class DeleteProjectInteractor {
  constructor(
    private readonly gateway: IDeleteProjectGateway,
    private presenter: IPresenter
  ) {}

  async execute(input: InputDeleteProject): Promise<HttpResponse> {
    try {
      this.gateway.loggerInfo('Iniciando a exclusão do projeto', {
        requestTxt: JSON.stringify(input)
      });
      const project = await this.gateway.findProject({ id: input.id });
      if (!project) {
        this.gateway.loggerInfo('Projeto não encontrado', {
          requestTxt: JSON.stringify(input)
        });
        return this.presenter.notFound('Projeto não encontrado');
      }
      this.gateway.loggerInfo('Projeto encontrado', project);
      await this.gateway.deleteProject({ id: input.id });
      return this.presenter.OK();
    } catch (error) {
      this.gateway.loggerInfo('Erro deletar o projeto', error);
      return this.presenter.serverError('Erro deletar o projeto');
    }
  }
}
