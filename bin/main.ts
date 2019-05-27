import express, {Response, Request} from "express"
import cors from "cors"
import bodyParser from "body-parser"

const router = require("./routers");
import morgan from 'morgan'
import {configuration} from "../configuration/vehicle-configuration";

const app = express();


app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.json())
app.use(morgan('combined'));

app.use('/vehicle', router.VehicleRouter);


export default app;
