import { User } from "../../models/users";
import { badResquest, ok, serverError } from "../helpers";
import { HttpResquest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpResquest<UpdateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return badResquest("Missing user id");
      }

      if (!body) {
        return badResquest("Missing fields");
      }

      const fieldsAllowedToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];

      const fieldsNotAllowedToUpdate = Object.keys(body!).some(
        (key) => !fieldsAllowedToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (fieldsNotAllowedToUpdate) {
        return badResquest("Some received field is not allowed");
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
