import express from "express";
import AppDataSource from "../dataSource";
import { Items } from "../entity/items";

const itemsRouter = express.Router();

const appDataSource = AppDataSource;

//Get all items
itemsRouter.put("/", async (req, res) => {
  try {
    const items = await appDataSource
      .getRepository(Items)
      .createQueryBuilder("items")
      .leftJoinAndSelect("items.inventoryItems", "inventoryItems")
      .leftJoinAndSelect("items.package", "package")
      .getMany();
      
    res.json(items);
  } catch (error) {
    console.log("Error fetching items", error);
    res.status(500).send("Internal Server Error");
  }
});

export default itemsRouter;
