import express from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Users } from './entity/users';
import AppDataSource from './dataSource';
import inventoryRouter  from './routes/inventoryRoute';
import itemsRouter from './routes/itemsRoute';
import packagesRouter from './routes/packagesRoute';
import usersRouter from './routes/usersRoute';
import warehousesRouter from './routes/warehousesRoute';
import { sendOtp, verifyOtp } from './routes/otpRoute';


const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());


dotenv.config()

const appDataSource = AppDataSource ;

app.get('/', (req, res) => {
  res.send('Hello, Dev!');
});

app.use('/inventory', inventoryRouter)

app.use('/items', itemsRouter)

app.use('/packages', packagesRouter)

app.use('/users', usersRouter)

app.use('/warehouses', warehousesRouter)

app.post('/send-otp', sendOtp);

app.post('/verify-otp', verifyOtp);

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});