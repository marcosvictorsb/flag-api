import ProjectModel from '@domains/api/projects/model/project.model';
import { ProjectEntity } from '@domains/api/projects/entity/project.entity';
import { ModelStatic } from 'sequelize';
import {
  CreateProjectCriteria,
  DeleteProjectCriteria,
  FindProjectCriteria,
  IProjectRepository,
  UpdateProjectCriteria,
  ProjectRepositoryDependencies
} from '@domains/api/projects/interfaces';

export class ProjectRepository implements IProjectRepository {
  protected model: ModelStatic<ProjectModel>;

  constructor(params: ProjectRepositoryDependencies) {
    this.model = params.model;
  }

  private getConditions(criteria: FindProjectCriteria): Record<string, any> {
    const whereConditions: Record<string, any> = {};

    if (criteria.id) {
      whereConditions['id'] = criteria.id;
    }

    if (criteria.name) {
      whereConditions['name'] = criteria.name;
    }

    if (criteria.id_user) {
      whereConditions['id_user'] = criteria.id_user;
    }

    return whereConditions;
  }

  public async create(data: CreateProjectCriteria): Promise<ProjectEntity> {
    const project = await this.model.create(data);
    return new ProjectEntity(project.dataValues);
  }

  public async find(
    criteria: FindProjectCriteria
  ): Promise<ProjectEntity | undefined> {
    const project = await this.model.findOne({
      where: this.getConditions(criteria),
      raw: true
    });

    if (!project) return undefined;

    return new ProjectEntity(project);
  }

  public async findAll(
    criteria: FindProjectCriteria
  ): Promise<ProjectEntity[]> {
    const projects = await this.model.findAll({
      where: this.getConditions(criteria),
      attributes: {
        exclude: ['password_hash']
      },
      raw: true
    });

    if (!projects || projects.length === 0) return [];

    return projects.map(
      (project: any) =>
        new ProjectEntity({
          id: project.id,
          name: project.name,
          description: project.description,
          id_user: project.id_user
        })
    );
  }

  public async update(
    data: UpdateProjectCriteria,
    criteria: Partial<ProjectEntity>
  ): Promise<boolean> {
    const [affectedRows] = await this.model.update(data, {
      where: { id: criteria.id }
    });
    if (affectedRows === 0) false;
    return true;
  }

  public async delete(criteria: DeleteProjectCriteria): Promise<boolean> {
    const affectedRows = await this.model.destroy({
      where: { id: criteria.id }
    });
    return affectedRows > 0;
  }
}
