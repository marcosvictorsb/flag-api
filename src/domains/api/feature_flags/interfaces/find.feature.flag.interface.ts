import { IPresenter } from '@protocols/index';
import { DataLogOutput } from '@adapters/services';
import { logger } from '@configs/logger';
import { FeatureFlagEntity } from '@domains/api/feature_flags/entity';
import {
  FindFeatureFlagCriteria,
  FeatureFlagStatus,
  IFeatureFlagRepository
} from '@domains/api/feature_flags/interfaces';
import { FindFeatureFlagInteractor } from '@domains/api/feature_flags';
import {
  EnvironmentEntity,
  EnvironmentTypes,
  FindEnvironmentCriteria,
  IEnvironmentRepository
} from '@domains/common';
import {
  FindProjectCriteria,
  IProjectRepository
} from '@domains/api/projects/interfaces';
import { ProjectEntity } from '@domains/api/projects/entity';

export type InputFindFeatureFlags = {
  id?: number;
  id_user: number;
  identifierProject: string;
};

export type FindFeatureFlagGatewayDependencies = {
  featureFlagRepository: IFeatureFlagRepository;
  environmentRepository: IEnvironmentRepository;
  projectRepository: IProjectRepository;
  logging: typeof logger;
};

export interface IFindFeatureFlagGateway {
  findFeatureFlag(
    criteria: FindFeatureFlagCriteria
  ): Promise<FeatureFlagEntity | undefined>;
  findEnvironment(
    criteria: FindEnvironmentCriteria
  ): Promise<EnvironmentEntity | undefined>;
  findProject(
    criteria: FindProjectCriteria
  ): Promise<ProjectEntity | undefined>;
  loggerInfo(message: string, data?: DataLogOutput): void;
  loggerError(message: string, data?: DataLogOutput): void;
}

export type FindFeatureFlagInteractorDependencies = {
  gateway: IFindFeatureFlagGateway;
  presenter: IPresenter;
};

export type FindFeatureFlagControllerDependencies = {
  interactor: FindFeatureFlagInteractor;
};

export interface IFindFeatureFlagsController {
  interactor: FindFeatureFlagInteractor;
}
