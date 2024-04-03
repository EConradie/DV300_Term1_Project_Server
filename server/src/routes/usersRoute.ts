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
    const { username, phone, image, isLoggedIn } = req.body;
    console.log(req.body);

    var newUser = new Users();

    newUser.username = username;
    newUser.number = phone;
    newUser.image = image;
    newUser.isLoggedIn = isLoggedIn;

    var addedUser = await appDataSource.getRepository(Users).save(newUser);

    return res.json(addedUser);
  } catch (error) {
    console.log("Error creating user");
    res.status(500).send({ message: error });
  }
});

userRouter.post("/login", async (req, res) => {
    const { phone } = req.body;
  
    try {
      const user = await appDataSource.getRepository(Users).findOneBy({ number:phone });
      if (user) {
        if (user.isLoggedIn) {
          return res.json({ message: "User already logged in.", user: { username: user.username, isLoggedIn: user.isLoggedIn }});
        } else {
          return res.status(202).json({ message: "Proceed with OTP verification." });
        }
      } else {
        return res.status(404).json({ message: "User not found. Proceed with signup/verification." });
      }
    } catch (error) {
      console.log("Error during login process", error);
      res.status(500).send({ message: "Error during login process" });
    }
  });

export default userRouter;
