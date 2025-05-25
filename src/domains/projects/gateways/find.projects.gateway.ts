import {
  IProjectRepository,
  IFindProjectsGateway,
  FindProjectsGatewayDependencies,
  FindProjectCriteria
} from '../interfaces';
import { ProjectEntity } from '../entity/project.entity';
import { MixFindProjectsService } from '../../../adapters/gateways/';

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
