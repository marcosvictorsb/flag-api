import { Request, Response } from 'express';
import {
  InputCreateUser,
  UserControllerParams
} from '@domains/api/users/interfaces/create.user.interface';
import { CreateUserInteractor } from '@domains/api/users/usecases/create.user.interactor';

export class CreateUserController {
  protected interactor: CreateUserInteractor;

  constructor(params: UserControllerParams) {
    this.interactor = params.interactor;
  }

  public async createUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, email, password_hash } = request.body;
    const input: InputCreateUser = {
      name,
      email,
      password_hash
    };
    const result = await this.interactor.execute(input);
    return response.status(result.status).json(result.body);
  }
}
