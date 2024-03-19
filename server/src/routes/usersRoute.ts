import express from "express";
import AppDataSource from "../dataSource";
import { Users } from "../entity/users";

const usersRouter = express.Router();

const appDataSource = AppDataSource;

//Get all users
usersRouter.put("/", async (req, res) => {
    try {
        const users = await appDataSource
            .getRepository(Users)
            .createQueryBuilder("users")
            .getMany();
            
        res.json(users);
    } catch (error) {
        console.log("Error fetching users", error);
        res.status(500).send("Internal Server Error");
    }
 
});

export default usersRouter;
