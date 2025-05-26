import bcrypt from 'bcryptjs';
import logger from '@config/logger';
import { UserRepository } from '@domains/api/users/repository';
import { CreateUserGateway } from '@domains/api/users/gateways';
import { CreateUserInteractor } from '@domains/api/users/usecases/create.user.interactor';
import UserModel from '@domains/api/users/model/user.model';
import {
  CreateUserGatewayDependencies,
  CreateUserInteractorDependencies
} from '@domains/api/users/interfaces';
import { CreateUserController } from '@domains/api/users/controllers/create.user.controller';
import { Presenter } from '@protocols/presenter';

const userRepository = new UserRepository({ model: UserModel });

const gateway: CreateUserGatewayDependencies = {
  repository: userRepository,
  logging: logger,
  bcrypt
};

const userGateway = new CreateUserGateway(gateway);
const presenter = new Presenter();
const params: CreateUserInteractorDependencies = {
  gateway: userGateway,
  presenter
};

const interactor = new CreateUserInteractor(params);
export const createUserController = new CreateUserController({
  interactor
});
