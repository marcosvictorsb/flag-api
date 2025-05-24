import {
  CreateUserCriteria,
  CreateUserInteractorDependencies,
  InputCreateUser
} from '../interfaces/';
import { HttpResponse, IPresenter } from '../../../protocols';
import logger from '../../../config/logger';
import UserModel from '../model/user.model';
import { ModelStatic } from 'sequelize';
import { CreateUserGateway } from '../gateways/create.user.gateway';

export class CreateUserInteractor {
  protected gateway: CreateUserGateway;
  protected presenter: IPresenter;

  constructor(params: CreateUserInteractorDependencies) {
    this.gateway = params.gateway;
    this.presenter = params.presenter;
  }

  async execute(input: InputCreateUser): Promise<HttpResponse> {
    this.gateway.loggerInfo('Iniciado o request para criar o usuario', {
      input: JSON.stringify(input)
    });

    try {
      const { email, name, password_hash } = input;
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
      console.log(userCreated);
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

      return this.presenter.created(userCreated);
    } catch (error) {
      this.gateway.loggerError('Erro ao criar usuário', { error });
      return this.presenter.serverError('Erro ao criar usuário');
    }
  }
}
