import { IPresenter } from '../../../../src/protocols';
import { DataLogOutput } from '../../../../src/adapters/services';
import logger from '../../../config/logger';
import { ProjectEntity } from '../entity/project.entity';
import {
  CreateProjectCriteria,
  FindProjectCriteria,
  IProjectRepository
} from './default.project.interface';
import { CreateProjectInteractor } from '../usecases/create.project.interactor';

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
};

export type CreateProjectControllerDependencies = {
  interactor: CreateProjectInteractor;
};
