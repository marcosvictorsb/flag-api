import { IPresenter } from '@protocols/index';
import { DataLogOutput } from '@adapters/services';
import { logger } from '@configs/logger';
import { ProjectEntity } from '@domains/api/projects/entity/project.entity';
import {
  FindProjectCriteria,
  IProjectRepository
} from '@domains/api/projects/interfaces/';
import { FindProjectsInteractor } from '@domains/api/projects/usecases/';

export type InputFindProject = {
  id?: number;
  name?: string;
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
