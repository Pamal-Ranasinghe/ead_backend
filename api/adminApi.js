const express = require('express');
const router = express.Router();
const FuelStationController = require('../controllers/AdminController');

module.exports = () => {
    router.post('/addFuelStation', FuelStationController.addFuelStation);
    router.get('/getFuelStations', FuelStationController.getFuelStations);
    return router;
}