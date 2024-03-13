import express from 'express';
import AppDataSource from '../dataSource';
import { Inventory } from '../entity/inventory';

const inventoryRouter = express.Router()

inventoryRouter.use(express.json())

const appDataSource = AppDataSource;

//TODO: create CRUD


//Get all Invetory Items
inventoryRouter.get('/', async (req, res) => {
    try {

        const items = await appDataSource.getRepository(Inventory).find();

        res.json(items)

    } catch (error) {
        console.log("Error fetching inventory", error)
        res.status(500).send('Internal Server Error')
    }
})

//Update single Invetory Item
inventoryRouter.put('/:id', async (req, res) => {

    try {
        const id = parseInt(req.params.id); //Id of the item we want to update

        const { name, catergory, item, amount } = req.body; //all teh values that we want to update

        const inventoryItem = await appDataSource.getRepository(Inventory).findOneBy({ id: id })

        if (!inventoryItem) {
            res.status(404).send('Item not found')
        } else {

            inventoryItem!.amount = amount
            //update all the varialbes that you want to update

            //save the changes
            const updatedInventoryItem = await appDataSource.getRepository(Inventory).save(inventoryItem!)

            res.json(updatedInventoryItem)
        }



    } catch (error) {
        console.log("Error updating inventory item", error)
        res.status(500).send('Internal Server Error')
    }

})

export default inventoryRouter;

