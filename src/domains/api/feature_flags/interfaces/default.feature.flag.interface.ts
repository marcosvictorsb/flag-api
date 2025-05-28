import { FeatureFlagEntity } from '@domains/api/feature_flags/entity';
import { ModelStatic } from 'sequelize';
import FeatureFlagModel from '@domains/api/feature_flags/model/feature.flag.model';

export type FeatureFlagStatus = {
  ACTIVE: 'active';
  INACTIVE: 'inactive';
};

export type CreateFeatureFlagCriteria = {
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

export type FindFeatureFlagCriteria = {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
  status?: FeatureFlagStatus;
  rollout?: number;
  variants?: Array<{ name: string; weight: number }>;
  targets?: Array<number | string>;
  id_user: number;
  id_project: number;
};

export type DeleteFeatureFlagCriteria = {
  id: number;
};

export type UpdateFeatureFlagCriteria = {
  name?: string;
  description?: string;
  type?: string;
  status?: FeatureFlagStatus;
  rollout?: number;
  variants?: Array<{ name: string; weight: number }>;
  targets?: Array<number | string>;
  id_user?: number;
  id_project?: number;
};

export interface IFeatureFlagRepository {
  create(criteria: CreateFeatureFlagCriteria): Promise<FeatureFlagEntity>;
  find(
    criteria: FindFeatureFlagCriteria
  ): Promise<FeatureFlagEntity | undefined>;
  findAll(criteria: FindFeatureFlagCriteria): Promise<FeatureFlagEntity[]>;
  update(
    criteria: UpdateFeatureFlagCriteria,
    data: Partial<FeatureFlagEntity>
  ): Promise<boolean>;
  delete(criteria: DeleteFeatureFlagCriteria): Promise<boolean>;
}

export type FeatureFlagRepositoryDependencies = {
  model: ModelStatic<FeatureFlagModel>;
};
