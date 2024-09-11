import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";

const main = async () => {
  config();
  const app = express();
  app.use(express.json());
  await MongoClient.connect();

  const port = process.env.PORT || 8000;

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();
    res.status(statusCode).send(body);
  });

  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.post("/users", async (req, res) => {
    try {
      const mongoCreateUserRepository = new MongoCreateUserRepository();
      const createUserController = new CreateUserController(
        mongoCreateUserRepository
      );

      const { body, statusCode } = await createUserController.handle({
        body: req.body,
      });

      res.status(statusCode).send(body);
    } catch (error) {
      res.status(500).send({
        error: "An unexpected error occurred.",
        details: `Error ${error ? error : null}`,
      });
    }
  });

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

main();
