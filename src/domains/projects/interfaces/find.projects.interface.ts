import { IPresenter } from '../../../protocols';
import { DataLogOutput } from '../../../adapters/services';
import logger from '../../../config/logger';
import { ProjectEntity } from '../entity/project.entity';
import {
  FindProjectCriteria,
  IProjectRepository
} from './default.project.interface';
import { FindProjectsInteractor } from '../usecases/find.projects.interactor';

export type InputFindProject = {
  id: number;
  name: string;
  id_user: number;
  description?: string;
};

export type FindProjectsGatewayDependencies = {
  repository: IProjectRepository;
  logging: typeof logger;
};

export interface IFindProjectsGateway {
  findProjects(data: FindProjectCriteria): Promise<ProjectEntity[] | undefined>;
  loggerInfo(message: string, data?: DataLogOutput): void;
  loggerError(message: string, data?: DataLogOutput): void;
}

export type FindProjectsInteractorDependencies = {
  gateway: IFindProjectsGateway;
  presenter: IPresenter;
};

export type FindProjectsControllerDependencies = {
  interactor: FindProjectsInteractor;
};
