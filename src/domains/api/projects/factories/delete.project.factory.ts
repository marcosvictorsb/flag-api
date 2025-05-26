import { logger } from '@configs/logger';
import { ProjectRepository } from '@domains/api/projects/repository';
import { DeleteProjectGateway } from '@domains/api/projects/gateways';
import { DeleteProjectInteractor } from '@domains/api/projects/usecases';
import ProjectModel from '@domains/api/projects/model/project.model';
import { DeleteProjectGatewayDependencies } from '@domains/api/projects/interfaces';
import { DeleteProjectController } from '@domains/api/projects/controllers';
import { Presenter } from '@protocols/presenter';

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
