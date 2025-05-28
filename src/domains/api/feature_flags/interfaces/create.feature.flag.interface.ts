import { IPresenter } from '@protocols/index';
import { DataLogOutput } from '@adapters/services';
import { logger } from '@configs/logger';
import { FeatureFlagEntity } from '@domains/api/feature_flags/entity';
import {
  CreateFeatureFlagCriteria,
  FeatureFlagStatus,
  FindFeatureFlagCriteria,
  IFeatureFlagRepository
} from '@domains/api/feature_flags/interfaces';
import { CreateFeatureFlagInteractor } from '@domains/api/feature_flags';

export type InputCreateFeatureFlags = {
  name: string;
  description: string;
  type: string;
  status: FeatureFlagStatus;
  rollout?: number;
  variants?: Array<{ name: string; weight: number }>;
  targets?: Array<number | string>;
  id_user: number;
  id_project: number;
};

export type CreateFeatureFlagGatewayDependencies = {
  repository: IFeatureFlagRepository;
  logging: typeof logger;
};

export interface ICreateFeatureFlagGateway {
  createFeatureFlag(
    data: CreateFeatureFlagCriteria
  ): Promise<FeatureFlagEntity>;
  findFeatureFlag(
    criteria: FindFeatureFlagCriteria
  ): Promise<FeatureFlagEntity | undefined>;
  loggerInfo(message: string, data?: DataLogOutput): void;
  loggerError(message: string, data?: DataLogOutput): void;
}

export type CreateFeatureFlagInteractorDependencies = {
  gateway: ICreateFeatureFlagGateway;
  presenter: IPresenter;
};

export type CreateFeatureFlagControllerDependencies = {
  interactor: CreateFeatureFlagInteractor;
};

export interface ICreateFeatureFlagsController {
  interactor: CreateFeatureFlagInteractor;
}
