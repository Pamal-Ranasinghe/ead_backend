const mongoose = require('mongoose');

const FuelStationSchema = new mongoose.Schema({
    stationId : {type: String, required: true},
    stationName : {type: String, required: true},
    location : {type: String, required: true},
    patrolAmount : {type: Number, required: true},
    dieselAmount : {type: Number, required: true},
});

const FuelStation = mongoose.model('FuelStation', FuelStationSchema);
module.exports = FuelStation;