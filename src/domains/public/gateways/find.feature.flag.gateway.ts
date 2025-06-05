import {
  FindFeatureFlagCriteria,
  FindFeatureFlagGatewayDependencies,
  IFindFeatureFlagGateway,
  IFeatureFlagRepository
} from '@domains/api/feature_flags/interfaces/';
import { MixFindFeatureFlagsService } from '@adapters/gateways/feature_flags/';
import { EnvironmentEntity, IEnvironmentRepository } from '@domains/common';
import { FeatureFlagEntity } from '@domains/api/feature_flags';

export class FindFeatureFlagGateway
  extends MixFindFeatureFlagsService
  implements IFindFeatureFlagGateway
{
  featureflagsRepository: IFeatureFlagRepository;
  environmentRepository: IEnvironmentRepository;

  constructor(params: FindFeatureFlagGatewayDependencies) {
    super(params);
    this.featureflagsRepository = params.featureFlagRepository;
    this.environmentRepository = params.environmentRepository;
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
}
