import { User } from "../../models/users";
import { badResquest, deleted, ok, serverError } from "../helpers";
import { HttpResquest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./protocols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle(
    httpRequest: HttpResquest<any>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badResquest("Missing user id");
      }

      const user = await this.deleteUserRepository.deleteUser(id);

      return deleted<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
