import express from 'express'
import { connection } from './db/dbConnection.js'
//NOTE - import dotenv
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import { bootstrap } from './src/bootstrap.js';
dotenv.config();
const app = express()
app.use(morgan('dev'))
const port = 4000



app.use(express.json())
connection();
bootstrap(app)

app.listen(process.env.PORT || 4000, () => console.log(`app listening on port ${port}!`))

