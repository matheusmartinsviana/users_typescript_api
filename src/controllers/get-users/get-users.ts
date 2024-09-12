import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";
import { User } from "../../models/users";
import { ok, serverError } from "../helpers";

export class GetUsersController implements IController {
  getUsersRepository: IGetUsersRepository;

  constructor(getUsersRepository: IGetUsersRepository) {
    this.getUsersRepository = getUsersRepository;
  }

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
