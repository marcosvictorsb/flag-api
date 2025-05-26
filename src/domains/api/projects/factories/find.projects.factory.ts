import { logger } from '@configs/logger';
import { ProjectRepository } from '@domains/api/projects/repository';
import { FindProjectsGateway } from '@domains/api/projects/gateways';
import { FindProjectsInteractor } from '@domains/api/projects/usecases/find.projects.interactor';
import ProjectModel from '@domains/api/projects/model/project.model';
import {
  FindProjectsGatewayDependencies,
  FindProjectsInteractorDependencies
} from '@domains/api/projects/interfaces';
import { FindProjectsController } from '@domains/api/projects/controllers/find.projects.controller';
import { Presenter } from '@protocols/presenter';

const projectRepository = new ProjectRepository({ model: ProjectModel });

const gateway: FindProjectsGatewayDependencies = {
  repository: projectRepository,
  logging: logger
};

const projectGateway = new FindProjectsGateway(gateway);
const presenter = new Presenter();
const params: FindProjectsInteractorDependencies = {
  gateway: projectGateway,
  presenter
};

const interactor = new FindProjectsInteractor(params);
export const findProjectController = new FindProjectsController({
  interactor
});
