import StorageHandler from "../DAL/storage-handler";
import FileHandler from "../DAL/file-handler";
import VehicleModel from "../commons/models/vehicle.model";
import DataAccessError from "../commons/Errors/data-access-error";
import UserError from "../commons/Errors/user-error";
import {Errors} from "../../configuration/errors";
import dateFormat from 'dateformat';

export default class VehiclesActions {

    private _storageHandler: StorageHandler;

    constructor(dataHandler: StorageHandler) {
        this._storageHandler = dataHandler;
    }

    getAllVehicles = async (): Promise<VehicleModel[]> => {
        try {
            let vehcles = await this._storageHandler.getVehicles();
            if (vehcles) {
                return vehcles;
            } else {
                throw new Error('Empty vehiclesList');
            }
        } catch (e) {
            throw new DataAccessError(e);

        }
    };

    editVehicle = async (vehecile: VehicleModel): Promise<any> => {
        try {
            await this._storageHandler.editVehicles(vehecile);
            return {message: 'vehicle edited successfully'}
        } catch (e) {
            throw new DataAccessError(e);
        }
    };

    addVehicle = async (vehicle: VehicleModel): Promise<any> => {
        try {

            await this._storageHandler.addVehicle(vehicle);
            return {message: 'Vehicle has been added'}
        } catch (e) {
            throw new DataAccessError(e);
        }
    }

    removeVehicle = async (id: string): Promise<any> => {
        try {
            await this._storageHandler.removeVehicle(id);
            return {message: 'Vehicle has been deleted'}
        } catch (e) {
            throw new DataAccessError(e);
        }
    }

    isValidParams(name: any, timeCreated: any, carType: any, lastSuccessfulConnection: any) {
        if (!(typeof name === 'string')) {
            console.log(typeof name);
            throw new UserError(Errors.VALIDATION_ERR);
        }
        if (!(typeof timeCreated === 'number')) {
            throw new UserError(Errors.VALIDATION_ERR);
        }
        if (!(typeof carType === 'string')) {
            throw new UserError(Errors.VALIDATION_ERR);
        }
        if (!(typeof lastSuccessfulConnection === 'number')) {
            throw new UserError(Errors.VALIDATION_ERR);
        }
    }

}
