const FuelStation = require('../models/FuelStation');

const addFuelStation = async (req,res) => {
    console.log("Hello")
    const {email,stationId,stationName,location} = req.body;
    const temp = {
        email,
        stationId,
        stationName,
        location,
        dieselAmount:0,
        patrolAmount:0
    }
    try {
        const fuelStation = new FuelStation(temp);
     
        await fuelStation.save()
        .then(data => {
            res.status(200).json({message: 'Fuel Station added successfully', data: data});
            console.log(data)
        })
        .catch(error => {
            res.status(500).json({message: 'Error occured', error: error});
        });
    } catch (error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}


const getFuelStations = async (req,res) => {
    try{
        await FuelStation.find()
        .then(data => {
            res.status(200).json({message: 'Fuel Stations fetched successfully', data: data});
        })
        .catch(error => {
            res.status(500).json({message: 'Error occured', error: error});
        });
    } catch(error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}


module.exports = {addFuelStation,getFuelStations}