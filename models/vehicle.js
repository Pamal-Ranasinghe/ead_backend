const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vehicleNumber : {type: String, required: true},
    vehicleType : {type: String, required: true},

});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;