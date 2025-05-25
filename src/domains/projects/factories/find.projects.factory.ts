import logger from '../../../config/logger';
import { ProjectRepository } from '../repository';
import { FindProjectsGateway } from '../gateways';
import { FindProjectsInteractor } from '../usecases/find.projects.interactor';
import ProjectModel from '../model/project.model';
import {
  FindProjectsGatewayDependencies,
  FindProjectsInteractorDependencies
} from '../interfaces/';
import { FindProjectsController } from '../controllers/find.projects.controller';
import { Presenter } from '../../../protocols/presenter';

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
