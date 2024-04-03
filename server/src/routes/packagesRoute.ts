import express from "express";
import AppDataSource from "../dataSource";
import { Packages } from "../entity/packages";
import { Items } from "../entity/items";

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

packagesRouter.put("/:id/craft", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let pkg = await appDataSource.getRepository(Packages).findOneBy({ id });

    if (!pkg) {
      return res.status(404).send({ message: "Package not found" });
    } else {
      // Assuming `items` is an array of `Items` within `Packages`
      // You'd update `amountCrafted` and also loop through each `item` to update quantities
      pkg.amountCrafted++;
      if (pkg.items) {
        await updateItemQuantities(pkg.items);
      } else {
        // Handle the case where pkg.items is undefined, if necessary
        console.error("Package has no items.");
      }

      const updatedPackage = await appDataSource
        .getRepository(Packages)
        .save(pkg);
      return res.json(updatedPackage);
    }
  } catch (error) {
    console.error("Error crafting package", error);
    res.status(500).send({ message: error });
  }
});

const updateItemQuantities = async (items: Items[]) => {
    if (!items) {
      throw new Error("No items provided for update.");
    }
    try {
      for (const item of items) {
        // Fetch the item from the database
        let inventoryItem = await appDataSource
          .getRepository(Items)
          .findOneBy({ id: item.id });
        
        if (!inventoryItem || inventoryItem.quantity < item.quantity) {
          throw new Error(`Insufficient inventory for item ID: ${item.id}`);
        }
        
        // Deduct the quantity needed for the crafted package
        inventoryItem.quantity -= item.quantity;
        
        // Save the updated inventory item back to the database
        await appDataSource.getRepository(Items).save(inventoryItem);
      }
    } catch (error) {
      console.error("Error updating item quantities:", error);
      throw error; // This will be caught by the calling function
    }
  };

export default packagesRouter;
