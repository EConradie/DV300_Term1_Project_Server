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
    let id = parseInt(req.params.id);
    let { amount, items } = req.body;

    var packageRequest = await appDataSource
      .getRepository(Packages)
      .findOneBy({ id: id });

    if (!packageRequest) {
      return res.status(404).send({ message: "Package not found" });
    } else {
      packageRequest!.amountCrafted = amount;

      await updateItemQuantities(items);

      var newPackageData: Packages = await appDataSource
        .getRepository(Packages)
        .save(packageRequest!);
      return res.json(newPackageData);
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send("Internal Server Error");
  }
});

const updateItemQuantities = async (items: Items[]) => {
  try {
    for (const item of items) {
      const updatedItem = await appDataSource
        .getRepository(Items)
        .findOneBy({ id: item.id });

      if (!updatedItem) {
        throw new Error(`Item with ID ${item.id} not found`);
      }

      updatedItem!.quantity = updatedItem!.quantity - item.amountNeeded;

      await appDataSource.getRepository(Items).save(updatedItem!);
    }
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export default packagesRouter;
