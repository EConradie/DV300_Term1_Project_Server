import express from "express";
import AppDataSource from "../dataSource";
import { Packages } from "../entity/packages";

const packagesRouter = express.Router();

const appDataSource = AppDataSource;

//Get all packages
packagesRouter.get("/", async (req, res) => {
    try {
        const packages = await appDataSource
            .getRepository(Packages)
            .createQueryBuilder("packages")
            .leftJoinAndSelect("packages.items", "items")
            .getMany();
            
        res.json(packages);
    } catch (error) {
        console.log("Error fetching packages", error);
        res.status(500).send("Internal Server Error");
    }
  
});

export default packagesRouter;
