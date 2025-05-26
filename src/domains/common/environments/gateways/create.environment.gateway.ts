import {
  IEnvironmentRepository,
  ICreateEnvironmentGateway,
  CreateEnvironmentGatewayDependencies,
  EnvironmentEntity,
  CreateEnvironmentCriteria
} from '@domains/common/environments';
import { MixCreateEnvironmentService } from '@adapters/gateways/';

export class CreateEnvironmentGateway
  extends MixCreateEnvironmentService
  implements ICreateEnvironmentGateway
{
  environmentRepository: IEnvironmentRepository;

  constructor(params: CreateEnvironmentGatewayDependencies) {
    super(params);
    this.environmentRepository = params.repository;
  }

  async createEnvironment(
    data: CreateEnvironmentCriteria
  ): Promise<EnvironmentEntity> {
    return await this.environmentRepository.create(data);
  }
}
