import express, { urlencoded } from "express";
import serverRoutes from "../src/Server/Server.routes.js"
import userRoutes from '../src/User/User.routes.js'
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors';
import multer from "multer";

const app = express()
config()
const port = process.env.PORT || 3200

app.use(urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//# Routes
app.use('/Server', serverRoutes)
app.use('/user', userRoutes)

//# Initialize Server
export const initServer = async () => {
    app.listen(port)
    console.log(`Server HTTP Running in port : ${port}`);
}