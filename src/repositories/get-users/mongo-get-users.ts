import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/users";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Matheus",
        lastName: "Viana",
        email: "matheus@gmail.com",
        password: "1234",
      },
    ];
  }
}
