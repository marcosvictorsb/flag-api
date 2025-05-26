import { logger } from '@configs/logger';
import { ProjectRepository } from '@domains/api/projects/repository';
import { CreateProjectGateway } from '@domains/api/projects/gateways';
import { CreateProjectInteractor } from '@domains/api/projects/usecases/create.project.interactor';
import ProjectModel from '@domains/api/projects/model/project.model';
import {
  CreateProjectGatewayDependencies,
  CreateProjectInteractorDependencies
} from '@domains/api/projects/interfaces';
import { CreateProjectController } from '@domains/api/projects/controllers/create.project.controller';
import { Presenter } from '@protocols/presenter';
import {
  CreateEnvironmentGateway,
  CreateEnvironmentGatewayDependencies,
  CreateEnvironmentInteractor,
  EnvironmentRepository,
  ICreateEnvironmentGateway
} from '@domains/common';
import EnvironmentModel from '@domains/common/environments/model/environment.model';

const projectRepository = new ProjectRepository({ model: ProjectModel });
const environmentRepository = new EnvironmentRepository({
  model: EnvironmentModel
});

const gateway: CreateProjectGatewayDependencies = {
  repository: projectRepository,
  logging: logger
};

const paramEnviromentGateway: CreateEnvironmentGatewayDependencies = {
  repository: environmentRepository,
  logging: logger
};

const gatewayCreateEnvironment = new CreateEnvironmentGateway(
  paramEnviromentGateway
);

const interactorEnvironment = new CreateEnvironmentInteractor({
  gateway: gatewayCreateEnvironment
});

const projectGateway = new CreateProjectGateway(gateway);
const presenter = new Presenter();
const params: CreateProjectInteractorDependencies = {
  gateway: projectGateway,
  presenter,
  interactorEnvironment
};

const interactor = new CreateProjectInteractor(params);
export const createProjectController = new CreateProjectController({
  interactor
});
