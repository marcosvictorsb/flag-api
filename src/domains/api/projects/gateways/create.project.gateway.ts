import {
  IProjectRepository,
  ICreateProjectGateway,
  CreateProjectGatewayDependencies,
  CreateProjectCriteria,
  FindProjectCriteria
} from '@domains/api/projects/interfaces';
import { ProjectEntity } from '@domains/api/projects//entity/project.entity';
import { MixCreateProjectService } from '@adapters/gateways';

export class CreateProjectGateway
  extends MixCreateProjectService
  implements ICreateProjectGateway
{
  projectRepository: IProjectRepository;

  constructor(params: CreateProjectGatewayDependencies) {
    super(params);
    this.projectRepository = params.repository;
  }

  async findProject(
    data: FindProjectCriteria
  ): Promise<ProjectEntity | undefined> {
    return await this.projectRepository.find(data);
  }

  async createProject(criteria: CreateProjectCriteria): Promise<ProjectEntity> {
    return await this.projectRepository.create(criteria);
  }
}
