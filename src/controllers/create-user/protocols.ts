import { User } from "../../models/users";
import { HttpResponse, HttpResquest } from "../protocols";

export interface ICreateUserController {
  handle(
    httpRequest: HttpResquest<CreateUsersParams>
  ): Promise<HttpResponse<User>>;
}

export interface CreateUsersParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUsersParams): Promise<User>;
}
