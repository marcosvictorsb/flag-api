import {
  IProjectRepository,
  IDeleteProjectGateway,
  DeleteProjectGatewayDependencies,
  FindProjectCriteria,
  DeleteProjectCriteria
} from '@domains/api/projects/interfaces';
import { ProjectEntity } from '@domains/api/projects/entity/project.entity';
import { MixDeleteProjectService } from '@adapters/gateways/projects/delete.project.gateway';

export class DeleteProjectGateway
  extends MixDeleteProjectService
  implements IDeleteProjectGateway
{
  projectRepository: IProjectRepository;

  constructor(params: DeleteProjectGatewayDependencies) {
    super(params);
    this.projectRepository = params.repository;
  }

  async deleteProject(criteria: DeleteProjectCriteria): Promise<boolean> {
    return await this.projectRepository.delete(criteria);
  }

  async findProject(
    criteria: FindProjectCriteria
  ): Promise<ProjectEntity | undefined> {
    return await this.projectRepository.find(criteria);
  }
}
