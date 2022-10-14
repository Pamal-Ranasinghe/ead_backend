const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicleController');

module.exports = () => {
    router.post('/addVehicle', VehicleController.addVehicle);
    router.get('/getVehicles', VehicleController.getVehicles);
    router.put('/updateVehicle/:id', VehicleController.updateVehicle);
    router.post('/addVehcleToQueue/:id', VehicleController.addVehicleToQueue);
    return router;
}