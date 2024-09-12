import validator from "validator";
import { User } from "../../models/users";
import { HttpResponse, HttpResquest, IController } from "../protocols";
import { CreateUsersParams, ICreateUserRepository } from "./protocols";
import { badResquest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpResquest<CreateUsersParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      const { body } = httpRequest;

      if (!body) {
        return badResquest("Please specify a body");
      }

      for (const field of requiredFields) {
        if (!body[field as keyof CreateUsersParams]) {
          return badResquest(`Field ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(body.email);
      if (!emailIsValid) {
        return badResquest("Email is invalid.");
      }

      const user = await this.createUserRepository.createUser(body);

      return created<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
