import StorageHandler from "./storage-handler";
import VehicleModel from "../commons/models/vehicle.model";
import jsonfile from "jsonfile"
import DataAccessError from "../commons/Errors/data-access-error";
import {Errors} from "../../configuration/errors";
import {configuration} from "../../configuration/vehicle-configuration";

var _ = require("lodash")

export default class FileHandler implements StorageHandler {

    private _fileData: any;

    constructor() {
        jsonfile.readFile(configuration.DbFile).then(data => {
            this._fileData = data;
        })
            .catch(err => {
                throw new DataAccessError(Errors.Cant_Read_File);
            })
    }

    getVehicles = async (): Promise<VehicleModel[]> => {
        try {
            return jsonfile.readFile('./vehicels.json');
        } catch (e) {
            throw new DataAccessError(e);
        }
    };

    editVehicles = async (newVehicles: VehicleModel): Promise<void> => {
        try {
            let data = this._fileData;
            for (let index = 0; index < data.length; index++) {
                if (data[index].id == newVehicles.id) {
                    data[index] = newVehicles;
                }
            }
            this.save(data);
        } catch (e) {
            throw new DataAccessError(e);
        }
    };

    addVehicle = async (newVehicle: VehicleModel): Promise<void> => {
        try {
            let data = this._fileData;
            data = _(data).push(newVehicle);
            this.save(data)

        } catch (e) {
            throw new DataAccessError(e);
        }
    };

    removeVehicle = async (id: string): Promise<void> => {
        try {
            let data = this._fileData;
            _.remove(data, (item: VehicleModel) => {
                return item.id === id
            })
            this.save(data);
        } catch (e) {
            throw new DataAccessError(e);
        }
    };

    private save = async (data: any): Promise<void> => {
        try {
            await jsonfile.writeFile('./vehicels.json', data);
            this._fileData = await jsonfile.readFile('./vehicels.json');

        } catch (e) {
            throw new DataAccessError(Errors.Cant_Save);
        }
    }

}
