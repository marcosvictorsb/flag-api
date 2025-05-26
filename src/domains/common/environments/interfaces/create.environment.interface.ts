import { logger } from '@configs/logger';
import {
  CreateEnvironmentCriteria,
  EnvironmentEntity
} from '@domains/common/environments';
import { IEnvironmentRepository } from '@domains/common/environments';
import { CreateEnvironmentInteractor } from '@domains/common/environments';
import { IPresenter } from '@protocols/presenter';

export type InputCreateEnvironment = {
  id_project: number;
};

export type CreateEnvironmentGatewayDependencies = {
  repository: IEnvironmentRepository;
  logging: typeof logger;
};

export interface ICreateEnvironmentGateway {
  createEnvironment(
    data: CreateEnvironmentCriteria
  ): Promise<EnvironmentEntity>;
  loggerInfo(message: string, data?: unknown): void;
  loggerError(message: string, data?: unknown): void;
}

export type CreateEnvironmentControllerDependencies = {
  interactor: CreateEnvironmentInteractor;
};

export type CreateEnvironmentInteractorDependencies = {
  gateway: ICreateEnvironmentGateway;
};
