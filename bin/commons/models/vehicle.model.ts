import {CarType} from "../enums/car-type";

export default interface VehicleModel {
    id: string,
    name: string,
    timeCreated: Date,
    carType: CarType,
    lastSuccessfulConnection: Date
}
