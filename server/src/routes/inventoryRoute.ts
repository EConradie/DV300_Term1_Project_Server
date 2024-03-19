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
      .getMany();

    res.json(inventory);
  } catch (error) {
    console.log("Error fetching inventory", error);
    res.status(500).send("Internal Server Error");
  }
});

//Update single Inventory Item
// inventoryRouter.put("/:id", async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);

//     const { name, category, item, quantity } = req.body;

//     const inventoryItem = await appDataSource
//       .getRepository(Items)
//       .findOneBy({ id: id });

//     if (!inventoryItem) {
//       res.status(404).send("Item not found");
//     } else {
//       inventoryItem!.quantity = quantity;

//       const updatedInventoryItem = await appDataSource
//         .getRepository(Items)
//         .save(inventoryItem!);

//       res.json(updatedInventoryItem);
//     }
//   } catch (error) {
//     console.log("Error updating inventory item", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

export default inventoryRouter;
