import { logger } from '@configs/logger';
import { UserEntity } from '@domains/api/users/entity';
import { ModelStatic } from 'sequelize';
import UserModel from '@domains/api/users/model/user.model';

export type CreateUserCriteria = {
  name: string;
  email: string;
  password_hash: string;
};

export type FindUserCriteria = {
  name?: string;
  email?: string;
  password_hash?: string;
};

export type DeleteUserCriteria = {
  id: number;
  name?: string;
  email?: string;
  password_hash?: string;
};

export type UpdateUserCriteria = {
  id: number;
  name?: string;
  email?: string;
  password_hash?: string;
};

export interface ICreateUserGateway {
  findUser(criteria: FindUserCriteria): Promise<UserEntity | undefined>;
  createUser(criteria: CreateUserCriteria): Promise<UserEntity | undefined>;
}

export interface IUserRepository {
  create(criteria: CreateUserCriteria): Promise<UserEntity>;
  find(criteria: FindUserCriteria): Promise<UserEntity | undefined>;
  findAll(criteria: FindUserCriteria): Promise<UserEntity[]>;
  update(
    criteria: DeleteUserCriteria,
    data: Partial<UserEntity>
  ): Promise<boolean>;
  delete(criteria: DeleteUserCriteria): Promise<boolean>;
}

export type CreateUserGatewayDependencies = {
  repository: IUserRepository;
  logging: typeof logger;
  bcrypt: typeof import('bcryptjs');
};

export type UserRepositoryDependencies = {
  model: ModelStatic<UserModel>;
};
