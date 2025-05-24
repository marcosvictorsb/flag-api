import bcrypt from 'bcryptjs';
import logger from '../../../config/logger';
import { UserRepository } from '../repository';
import { CreateUserGateway } from '../gateways';
import { CreateUserInteractor } from '../usecases/create.user.interactor';
import UserModel from '../model/user.model';
import {
  CreateUserGatewayDependencies,
  CreateUserInteractorDependencies
} from '../interfaces/';
import { CreateUserController } from '../controllers/create.user.controller';
import { Presenter } from '../../../protocols/presenter';

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
