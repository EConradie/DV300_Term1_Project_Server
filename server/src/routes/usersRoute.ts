import { Router } from "express";
import AppDataSource from "../dataSource";
import { Users } from "../entity/users";
import express from "express";

const userRouter = express.Router();

userRouter.use(express.json());

const appDataSource = AppDataSource;

//Todo: create a post endpoint, to create users
userRouter.post("/create", async (req, res) => {
  try {
    const { username, number, image } = req.body;

    var newUser = new Users();

    newUser.username = username;
    newUser.number = number;
    newUser.image = image;
    newUser.isLoggedIn = true;

    var addedUser = await appDataSource.getRepository(Users).save(newUser);

    return res.json(addedUser);
  } catch (error) {
    console.log("Error creating user");
    res.status(500).send({ message: error });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { number } = req.body;

    const user = await appDataSource.getRepository(Users).findOneBy({
      number: number,
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    if (user.isLoggedIn) {
      return res.json({ message: "User is already logged in." });
    } else {
      // Assuming you want to update the isLoggedIn status upon login
      user.isLoggedIn = true;
      await appDataSource.getRepository(Users).save(user);
      return res.json({ message: "Login successful.", user });
    }
  } catch (error) {
    console.log("Error logging in user");
    res.status(500).send({ message: error });
  }
});

export default userRouter;
