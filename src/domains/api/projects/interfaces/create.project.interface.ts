import { IPresenter } from '@protocols/index';
import { DataLogOutput } from '@adapters/services';
import { logger } from '@configs/logger';
import { ProjectEntity } from '../entity/project.entity';
import {
  CreateProjectCriteria,
  FindProjectCriteria,
  IProjectRepository
} from '@domains/api/projects/interfaces';
import { CreateProjectInteractor } from '@domains/api/projects/usecases/';
import { CreateEnvironmentInteractor } from '@domains/common';

export type InputCreateProject = {
  name: string;
  id_user: number;
  description?: string;
};

export type CreateProjectGatewayDependencies = {
  repository: IProjectRepository;
  logging: typeof logger;
};

export interface ICreateProjectGateway {
  createProject(data: CreateProjectCriteria): Promise<ProjectEntity>;
  findProject(data: FindProjectCriteria): Promise<ProjectEntity | undefined>;
  loggerInfo(message: string, data?: DataLogOutput): void;
  loggerError(message: string, data?: DataLogOutput): void;
}

export type CreateProjectInteractorDependencies = {
  gateway: ICreateProjectGateway;
  presenter: IPresenter;
  interactorEnvironment: CreateEnvironmentInteractor;
};

export type CreateProjectControllerDependencies = {
  interactor: CreateProjectInteractor;
};
