import { IPresenter } from '@protocols/index';
import { CreateUserGateway } from '@domains/api/users/gateways/create.user.gateway';
import { CreateUserInteractor } from '@domains/api/users/usecases/create.user.interactor';

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
