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
  FindEnvironmentCriteria,
  IEnvironmentRepository
} from '@domains/common';

export type InputFindFeatureFlags = {
  environment: EnvironmentEntity;
  key: string;
};

export type FindFeatureFlagGatewayDependencies = {
  featureFlagRepository: IFeatureFlagRepository;
  environmentRepository: IEnvironmentRepository;
  logging: typeof logger;
};

export interface IFindFeatureFlagGateway {
  // createFeatureFlag(data: FindFeatureFlagCriteria): Promise<FeatureFlagEntity>;
  findFeatureFlag(
    criteria: FindFeatureFlagCriteria
  ): Promise<FeatureFlagEntity | undefined>;
  findEnvironment(
    criteria: FindEnvironmentCriteria
  ): Promise<EnvironmentEntity | undefined>;
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
