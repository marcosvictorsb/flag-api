import { logger } from '@configs/logger';
import { FeatureFlagRepository } from '@domains/api/feature_flags/repository';
import { FindFeatureFlagGateway } from '@domains/public/gateways';
import { FindFeatureFlagInteractor } from '@domains/public/usecases/';
import FeatureFlagModel from '@domains/api/feature_flags/model/feature.flag.model';
import {
  FindFeatureFlagGatewayDependencies,
  FindFeatureFlagInteractorDependencies
} from '@domains/api/feature_flags/interfaces';
import { FindFeatureFlagController } from '@domains/public/controllers/';
import { Presenter } from '@protocols/presenter';
import { EnvironmentRepository } from '@domains/common';
import EnvironmentModel from '@domains/common/environments/model/environment.model';

const featureFlagRepository = new FeatureFlagRepository({
  model: FeatureFlagModel
});
const environmentRepository = new EnvironmentRepository({
  model: EnvironmentModel
});

const gatewayDependencies: FindFeatureFlagGatewayDependencies = {
  featureFlagRepository,
  environmentRepository,
  logging: logger
};

const gateway = new FindFeatureFlagGateway(gatewayDependencies);
const presenter = new Presenter();
const params: FindFeatureFlagInteractorDependencies = {
  gateway,
  presenter
};

const interactor = new FindFeatureFlagInteractor(params);
export const findFeatureFlagController = new FindFeatureFlagController({
  interactor
});
