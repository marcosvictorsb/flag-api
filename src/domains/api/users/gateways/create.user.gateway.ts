import { UserEntity } from '@domains/api/users/entity/user.entity';
import { MixCreateUserService } from '@adapters/gateways';
import {
  CreateUserCriteria,
  CreateUserGatewayDependencies,
  FindUserCriteria,
  ICreateUserGateway,
  IUserRepository
} from '@domains/api/users/interfaces';

export class CreateUserGateway
  extends MixCreateUserService
  implements ICreateUserGateway
{
  userRepository: IUserRepository;

  constructor(params: CreateUserGatewayDependencies) {
    super(params);
    this.userRepository = params.repository;
  }

  async createUser(criteria: CreateUserCriteria): Promise<UserEntity> {
    return await this.userRepository.create(criteria);
  }

  async findUser(criteria: FindUserCriteria): Promise<UserEntity | undefined> {
    return await this.userRepository.find(criteria);
  }
}
