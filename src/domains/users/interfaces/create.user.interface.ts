import { IPresenter } from '../../../../src/protocols';
import logger from '../../../config/logger';
import { CreateUserGateway } from '../gateways/create.user.gateway';
import UserModel from '../model/user.model';
import { CreateUserInteractor } from '../usecases/create.user.interactor';
import { ModelStatic } from 'sequelize';

export type InputCreateUser = {
  name: string;
  email: string;
  password_hash: string;
};

export type CreateUserData = {
  name: string;
  email: string;
  password_hash: string;
};

export type UserControllerParams = {
  interactor: CreateUserInteractor;
};

export type CreateUserInteractorDependencies = {
  gateway: CreateUserGateway;
  presenter: IPresenter;
};
