import { DataLogOutput } from '../../../../src/adapters/services';
import logger from '../../../config/logger';
import { ProjectEntity } from '../entity/project.entity';
import {
  DeleteProjectCriteria,
  FindProjectCriteria,
  IProjectRepository
} from '../interfaces/';
import { DeleteProjectInteractor } from '../usecases/delete.project.interactor';

export type InputDeleteProject = {
  id: number;
};

export type DeleteProjectGatewayDependencies = {
  repository: IProjectRepository;
  logging: typeof logger;
};

export interface IDeleteProjectGateway {
  deleteProject(criteria: DeleteProjectCriteria): Promise<boolean>;
  findProject(
    criteria: FindProjectCriteria
  ): Promise<ProjectEntity | undefined>;
  loggerInfo(message: string, data?: DataLogOutput): void;
  loggerError(message: string, data?: DataLogOutput): void;
}

export type DeleteProjectControllerDependencies = {
  interactor: DeleteProjectInteractor;
};
