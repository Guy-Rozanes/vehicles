import app from './main'
import {configuration} from "../configuration/vehicle-configuration";


app.listen(configuration.port, () => {
    console.log('listening to port: ' + configuration.port);
});

module.exports = app;
