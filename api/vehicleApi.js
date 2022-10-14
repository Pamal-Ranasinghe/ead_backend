const express = require('express');
const router = express.Router();
const VehicleController = require('../controllers/vehicleController');

module.exports = () => {
    router.post('/addVehicle', VehicleController.addVehicle);
    router.get('/getVehicles', VehicleController.getVehicles);
    router.put('/updateVehicle/:id', VehicleController.updateVehicle);
    router.delete('/deleteVehicle/:id', VehicleController.deleteVehicle);
    return router;
}