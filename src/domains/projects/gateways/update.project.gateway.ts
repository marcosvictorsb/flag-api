import {
  IProjectRepository,
  IUpdateProjectGateway,
  UpdateProjectGatewayDependencies,
  FindProjectCriteria,
  UpdateProjectCriteria
} from '../interfaces/';
import { ProjectEntity } from '../entity/project.entity';
import { MixUpdateProjectService } from '../../../adapters/gateways/projects/update.project.gateway';

export class UpdateProjectGateway
  extends MixUpdateProjectService
  implements IUpdateProjectGateway
{
  projectRepository: IProjectRepository;

  constructor(params: UpdateProjectGatewayDependencies) {
    super(params);
    this.projectRepository = params.projectRepository;
  }

  async updateProject(
    data: UpdateProjectCriteria,
    criteria: Partial<ProjectEntity>
  ): Promise<boolean> {
    return await this.projectRepository.update(data, criteria);
  }

  async findProject(
    criteria: FindProjectCriteria
  ): Promise<ProjectEntity | undefined> {
    return await this.projectRepository.find(criteria);
  }
}
