import FileHandler from "../../bin/DAL/file-handler";
import {stubObject} from "ts-sinon"
import {CarType} from "../../bin/commons/enums/car-type";
import {expect} from 'chai';
import VehiclesActions from "../../bin/BLL/vehicles-actions";

describe('init objects', async () => {
    let vehiclesAction: VehiclesActions;
    let stub = stubObject<FileHandler>(new FileHandler(), {
            getVehicles: Promise.resolve([{
                "id": "9feb6900-7f05-11e9-af62-bb96d9b3e9bc",
                "name": "asdfasdf",
                "timeCreated": "2019-05-25T15:56:14.481Z",
                "carType": "SUV",
                "lastSuccessfulConnection": 1558799774481
            }])
        }
    );
    beforeEach(() => {

    });
    describe('tests', () => {
        it('get Vehicle', async () => {
            vehiclesAction = new VehiclesActions(stub);
            let result = await vehiclesAction.getAllVehicles();
            console.log(result);
            expect(result[0].id).equal('9feb6900-7f05-11e9-af62-bb96d9b3e9bc');
        });
        it('delete vehicle', async () => {
            vehiclesAction = new VehiclesActions(stub);
            let result = await vehiclesAction.removeVehicle('test');
            expect(result.message).equal('Vehicle has been deleted');
        });

        it('add vehicle', async () => {
            vehiclesAction = new VehiclesActions(stub);
            let result = await vehiclesAction.addVehicle({
                id: "9feb6900-7f05-11e9-af62-bb96d9b3e9bc",
                name: "asdfasdf",
                timeCreated: new Date(),
                carType: CarType.SUV,
                lastSuccessfulConnection: new Date()
            });
            expect(result.message).equal('Vehicle has been added');
        })

        it('edit vehicle', async () => {
            vehiclesAction = new VehiclesActions(stub);
            let result = await vehiclesAction.editVehicle({
                id: "9feb6900-7f05-11e9-af62-bb96d9b3e9bc",
                name: "asdfasdf",
                timeCreated: new Date(),
                carType: CarType.SUV,
                lastSuccessfulConnection: new Date()
            });
            expect(result.message).equal('vehicle edited successfully');
        })

    })
})


