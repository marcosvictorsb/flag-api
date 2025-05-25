import bcrypt from 'bcryptjs';
import logger from '../../../config/logger';
import { ProjectRepository } from '../repository';
import { CreateProjectGateway } from '../gateways';
import { CreateProjectInteractor } from '../usecases/create.project.interactor';
import ProjectModel from '../model/project.model';
import {
  CreateProjectGatewayDependencies,
  CreateProjectInteractorDependencies
} from '../interfaces/';
import { CreateProjectController } from '../controllers/create.project.controller';
import { Presenter } from '../../../protocols/presenter';

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
