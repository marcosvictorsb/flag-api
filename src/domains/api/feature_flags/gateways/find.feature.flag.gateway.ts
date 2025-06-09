import {
  FindFeatureFlagCriteria,
  FindFeatureFlagGatewayDependencies,
  IFindFeatureFlagGateway,
  IFeatureFlagRepository
} from '@domains/api/feature_flags/interfaces/';
import { MixFindFeatureFlagsService } from '@adapters/gateways/feature_flags/';
import { EnvironmentEntity, IEnvironmentRepository } from '@domains/common';
import { FeatureFlagEntity } from '@domains/api/feature_flags';
import { FindProjectCriteria, IProjectRepository } from '@domains/api/projects/interfaces';
import { ProjectEntity } from '@domains/api/projects/entity';

export class FindFeatureFlagGateway
  extends MixFindFeatureFlagsService
  implements IFindFeatureFlagGateway
{
  featureflagsRepository: IFeatureFlagRepository;
  environmentRepository: IEnvironmentRepository;
  projectRepository: IProjectRepository;

  constructor(params: FindFeatureFlagGatewayDependencies) {
    super(params);
    this.featureflagsRepository = params.featureFlagRepository;
    this.environmentRepository = params.environmentRepository;
    this.projectRepository = params.projectRepository;
  }

  async findEnvironment(
    data: FindFeatureFlagCriteria
  ): Promise<EnvironmentEntity | undefined> {
    return await this.environmentRepository.find(data);
  }

  async findFeatureFlag(
    criteria: FindFeatureFlagCriteria
  ): Promise<FeatureFlagEntity | undefined> {
    return await this.featureflagsRepository.find(criteria);
  }

   async findProject(
    criteria: FindProjectCriteria
  ): Promise<ProjectEntity | undefined> {
    return await this.projectRepository.find(criteria);
  }
}
