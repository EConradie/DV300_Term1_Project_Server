import express from "express";
import AppDataSource from "../dataSource";
import { Items } from "../entity/items";
import { Inventory } from "../entity/inventory";

const inventoryRouter = express.Router();

inventoryRouter.use(express.json());

const appDataSource = AppDataSource;

//Get all Invetories
inventoryRouter.get("/", async (req, res) => {
  try {
    const inventory = await appDataSource
      .getRepository(Inventory)
      .createQueryBuilder("inventory")
      .leftJoinAndSelect("inventory.items", "items")
      .leftJoinAndSelect("inventory.packages", "packages")
      .getMany();

    res.json(inventory);
  } catch (error) {
    console.log("Error fetching inventory", error);
    res.status(500).send("Internal Server Error");
  }
});


export default inventoryRouter;
