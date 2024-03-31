import express from "express";
import AppDataSource from "../dataSource";
import { Items } from "../entity/items";

const itemsRouter = express.Router();

const appDataSource = AppDataSource;

//Get all items
itemsRouter.get("/", async (req, res) => {
  try {
    const items = await appDataSource
      .getRepository(Items)
      .createQueryBuilder("items")
      .leftJoinAndSelect("items.inventory", "inventory")
      .leftJoinAndSelect("items.package", "package")
      .getMany();

    res.json(items);
  } catch (error) {
    console.log("Error fetching items", error);
    res.status(500).send("Internal Server Error");
  }
});

//Update single item
itemsRouter.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id); //Id of the item we want to update
    const { name, category, brand, price, quantity, model } = req.body; //all teh values that we want to update

    const inventoryItem = await appDataSource
      .getRepository(Items)
      .findOneBy({ id: id });

    if (!inventoryItem) {
      res.status(404).send("Item not found");
    } else {
      //update all values
      inventoryItem.name = name;
      inventoryItem.category = category;
      inventoryItem.brand = brand;
      inventoryItem.price = price;
      inventoryItem.quantity = quantity;
      inventoryItem.model = model;

      //save the changes
      const updatedInventoryItem = await appDataSource
        .getRepository(Items)
        .save(inventoryItem!);

      res.json(updatedInventoryItem);
    }
  } catch (error) {
    console.log("Error updating item", error);
    res.status(500).send("Internal Server Error");
  }
});

export default itemsRouter;
