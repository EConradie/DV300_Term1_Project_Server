import express from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Users } from './entity/users';
import AppDataSource from './dataSource';
import inventoryRouter  from './routes/inventoryRoute';

const cors = require('cors')

const app = express();

app.use(cors())

dotenv.config()

const appDataSource = AppDataSource ;

app.get('/', (req, res) => {
  res.send('Hello, Dev!');
});

app.get('/users', async (req,res) => {
  const users = await appDataSource.manager.find(Users);
  console.log(users)
  res.send(users)
 })

app.use('/inventory', inventoryRouter)

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});