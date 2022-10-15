const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vehicleNumber : {type: String, required: true},
    vehicleType : {type: String, required: true},
    fuelType : {type: String, required: true},
    queued : {type: Boolean, default: false},
    fuelAmount : {type: Number, default: 0}

});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);
module.exports = Vehicle;