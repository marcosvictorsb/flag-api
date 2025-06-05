import { ProjectEntity } from '@domains/api/projects/entity';
import { ModelStatic } from 'sequelize';
import ProjectModel from '@domains/api/projects/model/project.model';

export type CreateProjectCriteria = {
  uuid: string;
  name: string;
  id_user: number;
  description?: string;
};

export type FindProjectCriteria = {
  id?: number;
  name?: string;
  id_user?: number;
  description?: string;
};

export type DeleteProjectCriteria = {
  id: number;
  name?: string;
};

export type UpdateProjectCriteria = {
  name?: string;
  description?: string;
};

export interface IProjectRepository {
  create(criteria: CreateProjectCriteria): Promise<ProjectEntity>;
  find(criteria: FindProjectCriteria): Promise<ProjectEntity | undefined>;
  findAll(criteria: FindProjectCriteria): Promise<ProjectEntity[]>;
  update(
    criteria: UpdateProjectCriteria,
    data: Partial<ProjectEntity>
  ): Promise<boolean>;
  delete(criteria: DeleteProjectCriteria): Promise<boolean>;
}

export type ProjectRepositoryDependencies = {
  model: ModelStatic<ProjectModel>;
};
