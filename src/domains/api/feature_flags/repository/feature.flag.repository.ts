import FeatureFlagModel from '@domains/api/feature_flags/model/feature.flag.model';
import { FeatureFlagEntity } from '@domains/api/feature_flags/entity/feature.flag.entity';
import { ModelStatic } from 'sequelize';
import {
  CreateFeatureFlagCriteria,
  DeleteFeatureFlagCriteria,
  FindFeatureFlagCriteria,
  IFeatureFlagRepository,
  UpdateFeatureFlagCriteria,
  FeatureFlagRepositoryDependencies
} from '@domains/api/feature_flags/';

export class FeatureFlagRepository implements IFeatureFlagRepository {
  protected model: ModelStatic<FeatureFlagModel>;

  constructor(params: FeatureFlagRepositoryDependencies) {
    this.model = params.model;
  }

  private getConditions(
    criteria: FindFeatureFlagCriteria
  ): Record<string, any> {
    const whereConditions: Record<string, any> = {};

    if (criteria.id) {
      whereConditions['id'] = criteria.id;
    }

    if (criteria.name) {
      whereConditions['name'] = criteria.name;
    }

    if (criteria.description) {
      whereConditions['type'] = criteria.description;
    }

    if (criteria.status) {
      whereConditions['status'] = criteria.status;
    }

    if (criteria.id_user) {
      whereConditions['id_user'] = criteria.id_user;
    }

    if (criteria.id_project) {
      whereConditions['id_project'] = criteria.id_project;
    }

    return whereConditions;
  }

  public async create(
    data: CreateFeatureFlagCriteria
  ): Promise<FeatureFlagEntity> {
    const project = await this.model.create(data);
    return new FeatureFlagEntity(project.dataValues);
  }

  public async find(
    criteria: FindFeatureFlagCriteria
  ): Promise<FeatureFlagEntity | undefined> {
    const project = await this.model.findOne({
      where: this.getConditions(criteria),
      raw: true
    });

    if (!project) return undefined;

    return new FeatureFlagEntity(project);
  }

  public async findAll(
    criteria: FindFeatureFlagCriteria
  ): Promise<FeatureFlagEntity[]> {
    const projects = await this.model.findAll({
      where: this.getConditions(criteria),
      raw: true
    });

    if (!projects || projects.length === 0) return [];

    return projects.map(
      (project: any) =>
        new FeatureFlagEntity({
          id: project.id,
          name: project.name,
          description: project.description,
          type: project.type,
          status: project.status,
          rollout: project.rollout,
          variants: project.variants,
          targets: project.targets,
          id_user: project.id_user,
          id_project: project.id_project
        })
    );
  }

  public async update(
    data: UpdateFeatureFlagCriteria,
    criteria: Partial<FeatureFlagEntity>
  ): Promise<boolean> {
    const [affectedRows] = await this.model.update(data, {
      where: { id: criteria.id }
    });
    if (affectedRows === 0) false;
    return true;
  }

  public async delete(criteria: DeleteFeatureFlagCriteria): Promise<boolean> {
    const affectedRows = await this.model.destroy({
      where: { id: criteria.id }
    });
    return affectedRows > 0;
  }
}
