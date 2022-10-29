const express = require('express');
const router = express.Router();
const FuelStationController = require('../controllers/fuelStationController');

module.exports = () => {
    router.post('/addFuelStation', FuelStationController.addFuelStation);
    router.get('/getFuelStations', FuelStationController.getFuelStations);
    router.put('/updateFuelStation/:id', FuelStationController.updateFuelStation);
    router.delete('/deleteFuelStation/:id', FuelStationController.deleteFuelStation);
    router.get('/getFuelStationById/:id', FuelStationController.getFuelStationById);

    router.post('/updateFuelAmount', FuelStationController.updateFuelAmount);
    router.post('/updateFuelStatus', FuelStationController.updateFuelStatus);

    

    return router;
}