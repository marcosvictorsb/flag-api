import {
  CreateFeatureFlagCriteria,
  CreateFeatureFlagGatewayDependencies,
  FindFeatureFlagCriteria,
  ICreateFeatureFlagGateway,
  IFeatureFlagRepository
} from '@domains/api/feature_flags/interfaces/';
import { FeatureFlagEntity } from '@domains/api/feature_flags/';
import { MixCreateFeatureFlagsService } from '@adapters/gateways/feature_flags/create.feature.flags.gateway';

export class CreateFeatureFlagGateway
  extends MixCreateFeatureFlagsService
  implements ICreateFeatureFlagGateway
{
  featureflagsRepository: IFeatureFlagRepository;

  constructor(params: CreateFeatureFlagGatewayDependencies) {
    super(params);
    this.featureflagsRepository = params.repository;
  }

  async createFeatureFlag(
    data: CreateFeatureFlagCriteria
  ): Promise<FeatureFlagEntity> {
    return await this.featureflagsRepository.create(data);
  }

  async findFeatureFlag(
    criteria: FindFeatureFlagCriteria
  ): Promise<FeatureFlagEntity | undefined> {
    return await this.featureflagsRepository.find(criteria);
  }
}
