import express from 'express'
import { connection } from './db/dbConnection.js'
//NOTE - import dotenv
import * as dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();
const app = express()
app.use(morgan('dev'))
const port = 4000



app.use(express.json())
connection();



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app listening on port ${port}!`))