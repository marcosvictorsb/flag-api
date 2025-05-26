import { logger } from '@configs/logger';
import { EnvironmentRepository } from '@domains/common/environments/';
import { CreateEnvironmentGateway } from '@domains/common/environments/gateways';
import { CreateEnvironmentInteractor } from '@domains/common/environments/';
import EnvironmentModel from '@domains/common/environments/model/environment.model';
import {
  CreateEnvironmentGatewayDependencies,
  CreateEnvironmentInteractorDependencies
} from '@domains/common/environments/';

const userRepository = new EnvironmentRepository({ model: EnvironmentModel });

const gateway: CreateEnvironmentGatewayDependencies = {
  repository: userRepository,
  logging: logger
};

const userGateway = new CreateEnvironmentGateway(gateway);
const params: CreateEnvironmentInteractorDependencies = {
  gateway: userGateway
};

const interactor = new CreateEnvironmentInteractor(params);
