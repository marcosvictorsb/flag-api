import {
  CreateUserCriteria,
  CreateUserInteractorDependencies,
  InputCreateUser
} from '@domains/api/users/interfaces';
import { HttpResponse, IPresenter } from '@protocols/index';
import { CreateUserGateway } from '@domains/api/users/gateways/create.user.gateway';

export class CreateUserInteractor {
  protected gateway: CreateUserGateway;
  protected presenter: IPresenter;

  constructor(params: CreateUserInteractorDependencies) {
    this.gateway = params.gateway;
    this.presenter = params.presenter;
  }

  async execute(input: InputCreateUser): Promise<HttpResponse> {
    try {
      const { email, name, password_hash } = input;
      this.gateway.loggerInfo('Iniciado o request para criar o usuario', {
        input: JSON.stringify({ email, name })
      });

      const existingUser = await this.gateway.findUser({ email });
      if (existingUser) {
        this.gateway.loggerInfo('Usuario já existe para esse email', { email });
        return this.presenter.conflict('Usuário já existe para esse email');
      }
      const criteria: CreateUserCriteria = {
        name,
        email,
        password_hash: this.gateway.encryptPassword(password_hash)
      };

      const userCreated = await this.gateway.createUser(criteria);
      if (!userCreated) {
        this.gateway.loggerInfo('Usuário não encontrado', { email });
        return this.presenter.notFound('Usuário não encontrado');
      }

      this.gateway.loggerInfo('Usuário criado com sucesso', {
        data: JSON.stringify({
          email: userCreated.email,
          name: userCreated.name
        })
      });

      return this.presenter.created({
        id: userCreated.id,
        email: userCreated.email,
        name: userCreated.name
      });
    } catch (error) {
      this.gateway.loggerError('Erro ao criar usuário', { error });
      return this.presenter.serverError('Erro ao criar usuário');
    }
  }
}
