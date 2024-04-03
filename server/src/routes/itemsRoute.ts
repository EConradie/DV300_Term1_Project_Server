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
  const id = parseInt(req.params.id);
  const itemUpdates = req.body;

  try {
    let inventoryItem = await appDataSource.getRepository(Items).findOneBy({ id });

    if (!inventoryItem) {
      return res.status(404).send("Item not found");
    }

    // Update item with new values
    inventoryItem = { ...inventoryItem, ...itemUpdates };

    const updatedInventoryItem = await appDataSource.getRepository(Items).save(inventoryItem as Items);
    res.json(updatedInventoryItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default itemsRouter;
