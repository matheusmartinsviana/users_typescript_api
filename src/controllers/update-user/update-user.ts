import { User } from "../../models/users";
import { HttpResquest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpResquest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return Promise.resolve({
          statusCode: 400,
          body: "Missing user id",
        });
      }

      const fieldsAllowedToUpdate: (keyof UpdateUserParams)[] = [
        "firstName", // Fix your typo here or in UpdateUserParams
        "lastName",
        "password",
      ];

      const fieldsNotAllowedToUpdate = Object.keys(body).some(
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
