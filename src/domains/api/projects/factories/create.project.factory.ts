import logger from '@config/logger';
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

const projectRepository = new ProjectRepository({ model: ProjectModel });

const gateway: CreateProjectGatewayDependencies = {
  repository: projectRepository,
  logging: logger
};

const projectGateway = new CreateProjectGateway(gateway);
const presenter = new Presenter();
const params: CreateProjectInteractorDependencies = {
  gateway: projectGateway,
  presenter
};

const interactor = new CreateProjectInteractor(params);
export const createProjectController = new CreateProjectController({
  interactor
});
