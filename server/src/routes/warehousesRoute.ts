import express from "express";
import AppDataSource from "../dataSource";
import { Warehouse } from "../entity/warehouses";

const warehousesRouter = express.Router();

const appDataSource = AppDataSource;

//Get all warehouses
warehousesRouter.put("/", async (req, res) => {
    try {
        const warehouses = await appDataSource
            .getRepository(Warehouse)
            .createQueryBuilder("warehouses")
            .getMany();
            
        res.json(warehouses);
    } catch (error) {
        console.log("Error fetching warehouses", error);
        res.status(500).send("Internal Server Error");
    }
  
});

export default warehousesRouter;
