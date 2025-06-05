import { EnvironmentEntity } from '@domains/common/environments';
import { ModelStatic } from 'sequelize';
import EnvironmentModel from '@domains/common/environments/model/environment.model';

export enum EnvironmentTypes {
  SANDBOX = 'sandbox',
  PRODUCTION = 'production'
}

export type CreateEnvironmentCriteria = {
  type: string;
  id_project: number;
  key: string;
};

export type FindEnvironmentCriteria = {
  id?: number;
  name?: string;
  type?: string;
  id_project?: number;
  key?: string;
};

export type DeleteEnvironmentCriteria = {
  id: number;
};

export type UpdateEnvironmentCriteria = {
  id?: number;
  name?: string;
  type?: string;
  id_project?: number;
};

export interface IEnvironmentRepository {
  create(criteria: CreateEnvironmentCriteria): Promise<EnvironmentEntity>;
  find(
    criteria: FindEnvironmentCriteria
  ): Promise<EnvironmentEntity | undefined>;
  findAll(criteria: FindEnvironmentCriteria): Promise<EnvironmentEntity[]>;
  update(
    criteria: DeleteEnvironmentCriteria,
    data: Partial<EnvironmentEntity>
  ): Promise<boolean>;
  delete(criteria: DeleteEnvironmentCriteria): Promise<boolean>;
}

export type EnvironmentRepositoryDependencies = {
  model: ModelStatic<EnvironmentModel>;
};
