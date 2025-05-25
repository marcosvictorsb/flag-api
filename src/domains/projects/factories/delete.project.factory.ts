import logger from '../../../config/logger';
import { ProjectRepository } from '../repository';
import { DeleteProjectGateway } from '../gateways';
import { DeleteProjectInteractor } from '../usecases/';
import ProjectModel from '../model/project.model';
import { DeleteProjectGatewayDependencies } from '../interfaces/';
import { DeleteProjectController } from '../controllers/';
import { Presenter } from '../../../protocols/presenter';

const repository = new ProjectRepository({ model: ProjectModel });

const gateway: DeleteProjectGatewayDependencies = {
  repository,
  logging: logger
};

const projectGateway = new DeleteProjectGateway(gateway);
const presenter = new Presenter();

const interactor = new DeleteProjectInteractor(projectGateway, presenter);
export const deleteProjectController = new DeleteProjectController({
  interactor
});
