import express from "express"
import VehicleController from "../controllers/vehicle.controller";

let router = express.Router();
const vehicleController = new VehicleController()

router
    .get('/', vehicleController.getAllVehicles)
    .put('/:id', vehicleController.editVehicle)
    .post('/', vehicleController.addVehicle)
    .delete('/:id', vehicleController.deletedVehicle);

export default router;
