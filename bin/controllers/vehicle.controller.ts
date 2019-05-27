import {Request, Response} from "express";
import VehiclesActions from "../BLL/vehicles-actions";
import FileHandler from "../DAL/file-handler";
import VehicleModel from "../commons/models/vehicle.model";
import uuid from "uuid/v1"
import ErrorFactory from "../commons/Errors/error-factory";
import {Errors} from "../../configuration/errors";
import UserError from "../commons/Errors/user-error";


export default class VehicleController {

    private _vehcielsActions: VehiclesActions;

    constructor() {
        this._vehcielsActions = new VehiclesActions(new FileHandler());

    }

    getAllVehicles = async (req: Request, res: Response): Promise<void> => {
        try {
            let result = await this._vehcielsActions.getAllVehicles();
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            let message = new ErrorFactory(e).buildError();
            switch (message.message) {
                case Errors.Cant_Read_File:
                    res.status(406).send(message);
                    break;

                case Errors.Cant_Save:
                    res.status(406).send(message);
                    break;

                default:
                    res.status(500).send(message);
                    break;
            }

        }
    }

    editVehicle = async (req: Request, res: Response) => {
        try {
            let {id} = req.params;
            let {name, timeCreated, carType, lastSuccessfulConnection} = req.body;
            this._vehcielsActions.isValidParams(name, timeCreated, carType, lastSuccessfulConnection);
            let vehicle: VehicleModel = {id, name, timeCreated, carType, lastSuccessfulConnection};

            let result = await this._vehcielsActions.editVehicle(vehicle);
            res.status(200).send(result);
        } catch (e) {
            let message = new ErrorFactory(e).buildError();
            switch (message.message) {
                case Errors.Cant_Read_File:
                    res.status(406).send(message);
                    break;

                case Errors.Cant_Save:
                    res.status(406).send(message);
                    break;

                case Errors.VALIDATION_ERR:
                    res.status(406).send(message);
                    break;

                default:
                    res.status(500).send(message);
                    break;
            }
        }
    }

    addVehicle = async (req: Request, res: Response): Promise<void> => {
        try {
            let {name, timeCreated, carType, lastSuccessfulConnection} = req.body;
            if (!name || !timeCreated || !carType || !lastSuccessfulConnection) {
                throw new UserError(Errors.INSERT_ALL_PARAMTERS)
            }
            this._vehcielsActions.isValidParams(name, timeCreated, carType, lastSuccessfulConnection);
            let vehicle: VehicleModel = {
                id: uuid(),
                name,
                timeCreated,
                carType,
                lastSuccessfulConnection
            }
            console.log(vehicle)
            let result = await this._vehcielsActions.addVehicle(vehicle);
            res.status(200).send(result);
        } catch (e) {
            let message = new ErrorFactory(e).buildError();
            switch (message.message) {
                case Errors.Cant_Read_File:
                    res.status(503).send(message);
                    break;

                case Errors.Cant_Save:
                    res.status(503).send(message);
                    break;

                case Errors.INSERT_ALL_PARAMTERS:
                    res.status(406).send(message);
                    break;

                case Errors.VALIDATION_ERR:
                    res.status(406).send(message);
                    break;

                default:
                    res.status(500).send(message);
                    break;
            }
        }
    }

    deletedVehicle = async (req: Request, res: Response): Promise<void> => {
        try {
            let {id} = req.params;
            if (!id) {
                throw new UserError(Errors.INSERT_ALL_PARAMTERS);
            }
            let result = await this._vehcielsActions.removeVehicle(id);
            res.status(200).send(result);
        } catch (e) {
            let message = new ErrorFactory(e).buildError();
            switch (message.message) {
                case Errors.Cant_Read_File:
                    res.status(503).send(message);
                    break;

                case Errors.Cant_Save:
                    res.status(503).send(message);
                    break;

                case Errors.INSERT_ALL_PARAMTERS:
                    res.status(406).send(message);
                    break;

                default:
                    res.status(500).send(message);
                    break;
            }
        }
    }
}
