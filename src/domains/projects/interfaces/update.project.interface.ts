import { DataLogOutput } from 'src/adapters/services';
import { ProjectEntity } from '../entity/project.entity';
import logger from '../../../config/logger';
import {
  FindProjectCriteria,
  IProjectRepository,
  UpdateProjectCriteria
} from './default.project.interface';
import { IPresenter } from '../../../../src/protocols';
import { UpdateProjectInteractor } from '../usecases';

export interface IUpdateProjectGateway {
  updateProject(
    data: UpdateProjectCriteria,
    criteria: Partial<ProjectEntity>
  ): Promise<boolean>;
  findProject(
    criteria: FindProjectCriteria
  ): Promise<ProjectEntity | undefined>;
  loggerInfo(message: string, data?: DataLogOutput): void;
  loggerError(message: string, data?: DataLogOutput): void;
}

export type InputUpdateProject = {
  id: number;
  name?: string;
  description?: string;
};

export type UpdateProjectInteractorDependencies = {
  gateway: IUpdateProjectGateway;
  presenter: IPresenter;
};

export type UpdateProjectGatewayDependencies = {
  projectRepository: IProjectRepository;
  logging: typeof logger;
};

export type UpdateProjectControllerDependencies = {
  interactor: UpdateProjectInteractor;
};
