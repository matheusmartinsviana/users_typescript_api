import validator from "validator";
import { User } from "../../models/users";
import { HttpResponse, HttpResquest } from "../protocols";
import {
  CreateUsersParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpResquest<CreateUsersParams>
  ): Promise<HttpResponse<User>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      const { body } = httpRequest;

      if (!body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      for (const field of requiredFields) {
        if (!body[field as keyof CreateUsersParams]) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const emailIsValid = validator.isEmail(body.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "Email is invalid.",
        };
      }

      const user = await this.createUserRepository.createUser(body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Something went wrong. ${error ? error : null}`,
      };
    }
  }
}
