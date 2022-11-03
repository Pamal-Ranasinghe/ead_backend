const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

module.exports = () => {
    router.post('/addFuelStation', AdminController.addFuelStation);
    router.get('/getFuelStations', AdminController.getFuelStations);
    router.post('/deleteFuelStation', AdminController.deleteFuelStation);

    router.post('/login', AdminController.login);
    router.post('/create-user', AdminController.createUser);
    return router;
}