import VehicleModel from "../commons/models/vehicle.model";

export default interface StorageHandler {

    getVehicles(): Promise<VehicleModel[]>;

    editVehicles(newVehicle: VehicleModel): Promise<void>;

    addVehicle(newVehicle: VehicleModel): Promise<void>;

    removeVehicle(id: string): Promise<void>;
}
