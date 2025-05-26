import {
  IProjectRepository,
  IFindProjectsGateway,
  FindProjectsGatewayDependencies,
  FindProjectCriteria
} from '@domains/api/projects/interfaces';
import { ProjectEntity } from '@domains/api/projects/entity/project.entity';
import { MixFindProjectsService } from '@adapters/gateways';

export class FindProjectsGateway
  extends MixFindProjectsService
  implements IFindProjectsGateway
{
  projectsRepository: IProjectRepository;

  constructor(params: FindProjectsGatewayDependencies) {
    super(params);
    this.projectsRepository = params.repository;
  }

  async findProjects(
    data: FindProjectCriteria
  ): Promise<ProjectEntity[] | undefined> {
    return await this.projectsRepository.findAll(data);
  }
}
