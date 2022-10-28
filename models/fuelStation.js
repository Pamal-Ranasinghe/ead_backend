const mongoose = require('mongoose');

const FuelStationSchema = new mongoose.Schema({
    email:{type: String, required: true},
    stationId : {type: String, required: true},
    stationName : {type: String, required: true},
    location : {type: String, required: true},
    patrolAmount : {type: Number, required: false},
    dieselAmount : {type: Number, required: false},
    petrolQueue : [{type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Vehicle'}],
    dieselQueue : [{type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Vehicle'}],
});

const FuelStation = mongoose.model('FuelStationProfile', FuelStationSchema);
module.exports = FuelStation;