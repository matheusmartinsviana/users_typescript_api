import { User } from "../../models/users";
import { HttpResquest, HttpResponse, IController } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController implements IController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpResquest<UpdateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return Promise.resolve({
          statusCode: 400,
          body: "Missing user id",
        });
      }

      if (!body) {
        return {
          statusCode: 400,
          body: "Missing fields",
        };
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
        return Promise.resolve({
          statusCode: 400,
          body: "Some received field is not allowed",
        });
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return Promise.resolve({
        statusCode: 200,
        body: user,
      });
    } catch (error) {
      return Promise.resolve({
        statusCode: 500,
        body: "Something went wrong",
      });
    }
  }
}
