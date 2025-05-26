import EnvironmentModel from '@domains/common/environments/model/environment.model';
import { EnvironmentEntity } from '@domains/common/environments/';
import { ModelStatic } from 'sequelize';
import {
  CreateEnvironmentCriteria,
  DeleteEnvironmentCriteria,
  FindEnvironmentCriteria,
  IEnvironmentRepository,
  UpdateEnvironmentCriteria,
  EnvironmentRepositoryDependencies
} from '@domains/common/environments/';

export class EnvironmentRepository implements IEnvironmentRepository {
  protected model: ModelStatic<EnvironmentModel>;

  constructor(params: EnvironmentRepositoryDependencies) {
    this.model = params.model;
  }

  private getConditions(
    criteria: FindEnvironmentCriteria
  ): Record<string, any> {
    const whereConditions: Record<string, any> = {};

    if (criteria.id) {
      whereConditions['id'] = criteria.id;
    }

    if (criteria.type) {
      whereConditions['type'] = criteria.type;
    }

    if (criteria.id_project) {
      whereConditions['id_project'] = criteria.id_project;
    }

    return whereConditions;
  }

  public async create(
    data: CreateEnvironmentCriteria
  ): Promise<EnvironmentEntity> {
    const environment = await this.model.create(data);
    return new EnvironmentEntity(environment.dataValues);
  }

  public async find(
    criteria: FindEnvironmentCriteria
  ): Promise<EnvironmentEntity | undefined> {
    const environment = await this.model.findOne({
      where: this.getConditions(criteria),
      raw: true
    });

    if (!environment) return undefined;

    return new EnvironmentEntity(environment);
  }

  public async findAll(
    criteria: FindEnvironmentCriteria
  ): Promise<EnvironmentEntity[]> {
    const environments = await this.model.findAll({
      where: this.getConditions(criteria),
      attributes: {
        exclude: ['password_hash']
      },
      raw: true
    });

    if (!environments || environments.length === 0) return [];

    return environments.map(
      (environment: any) =>
        new EnvironmentEntity({
          id: environment.id,
          type: environment.type,
          id_project: environment.id_project
        })
    );
  }

  public async update(
    data: UpdateEnvironmentCriteria,
    criteria: Partial<EnvironmentEntity>
  ): Promise<boolean> {
    const [affectedRows] = await this.model.update(data, {
      where: { id: criteria.id }
    });
    if (affectedRows === 0) false;
    return true;
  }

  public async delete(criteria: DeleteEnvironmentCriteria): Promise<boolean> {
    const affectedRows = await this.model.destroy({
      where: { id: criteria.id }
    });
    return affectedRows > 0;
  }
}
