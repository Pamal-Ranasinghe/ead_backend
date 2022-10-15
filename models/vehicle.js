const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vehicleNumber : {type: String, required: true},
    vehicleType : {type: String, required: true},
    fuelType : {type: String, required: true},
    queued : {type: Boolean, required: true, default: false},

});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;