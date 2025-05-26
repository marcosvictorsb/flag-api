import logger from '@config/logger';
import { ProjectRepository } from '@domains/api/projects/repository';
import { UpdateProjectGateway } from '@domains/api/projects/gateways';
import { UpdateProjectInteractor } from '@domains/api/projects/usecases';
import ProjectModel from '@domains/api/projects/model/project.model';
import {
  UpdateProjectGatewayDependencies,
  UpdateProjectInteractorDependencies
} from '@domains/api/projects/interfaces';
import { UpdateProjectController } from '@domains/api/projects/controllers';
import { Presenter } from '@protocols/presenter';

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
