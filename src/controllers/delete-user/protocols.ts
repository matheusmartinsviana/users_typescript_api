import { User } from "../../models/users";
import { HttpResponse, HttpResquest } from "../protocols";

export interface IDeleteUserController {
  handle(httpRequest: HttpResquest<any>): Promise<HttpResponse<User>>;
}

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<User>;
}
