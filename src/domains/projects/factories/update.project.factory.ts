import logger from '../../../config/logger';
import { ProjectRepository } from '../repository';
import { UpdateProjectGateway } from '../gateways';
import { UpdateProjectInteractor } from '../usecases/';
import ProjectModel from '../model/project.model';
import {
  UpdateProjectGatewayDependencies,
  UpdateProjectInteractorDependencies
} from '../interfaces/';
import { UpdateProjectController } from '../controllers/';
import { Presenter } from '../../../protocols/presenter';

const gateway: UpdateProjectGatewayDependencies = {
  projectRepository: new ProjectRepository({ model: ProjectModel }),
  logging: logger
};

const projectGateway = new UpdateProjectGateway(gateway);
const presenter = new Presenter();
const params: UpdateProjectInteractorDependencies = {
  gateway: projectGateway,
  presenter
};

const interactor = new UpdateProjectInteractor(params);
export const updateProjectController = new UpdateProjectController({
  interactor
});
