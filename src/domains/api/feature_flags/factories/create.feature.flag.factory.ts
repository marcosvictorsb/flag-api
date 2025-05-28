import { logger } from '@configs/logger';
import { FeatureFlagRepository } from '@domains/api/feature_flags/repository';
import { CreateFeatureFlagGateway } from '@domains/api/feature_flags/gateways';
import { CreateFeatureFlagInteractor } from '@domains/api/feature_flags/usecases/';
import FeatureFlagModel from '@domains/api/feature_flags/model/feature.flag.model';
import {
  CreateFeatureFlagGatewayDependencies,
  CreateFeatureFlagInteractorDependencies
} from '@domains/api/feature_flags/interfaces';
import { CreateFeatureFlagController } from '@domains/api/feature_flags/controllers/';
import { Presenter } from '@protocols/presenter';

const userRepository = new FeatureFlagRepository({ model: FeatureFlagModel });

const gateway: CreateFeatureFlagGatewayDependencies = {
  repository: userRepository,
  logging: logger
};

const userGateway = new CreateFeatureFlagGateway(gateway);
const presenter = new Presenter();
const params: CreateFeatureFlagInteractorDependencies = {
  gateway: userGateway,
  presenter
};

const interactor = new CreateFeatureFlagInteractor(params);
export const createFeatureFlagController = new CreateFeatureFlagController({
  interactor
});
