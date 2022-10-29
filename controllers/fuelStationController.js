const FuelStation = require('../models/FuelStation');



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

const updateFuelStation = async (req,res) => {
    try{
        if(req.params && req.body) {
            await FuelStation.findByIdAndUpdate(req.params.id, req.body)
            .then(data => {
                res.status(200).json({message: 'Fuel Station updated successfully', data: data});
            })
            .catch(error => {
                res.status(500).json({message: 'Error occured', error: error});
            });
        }
    } catch(error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}

const deleteFuelStation = async (req,res) => {
    try{
        if(req.params) {
            await FuelStation.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({message: 'Fuel Station deleted successfully', data: data});
            })
            .catch(error => {
                res.status(500).json({message: 'Error occured', error: error});
            });
        }
    } catch(error ) {
        res.status(500).json({message: 'Error occured', error: error});
    }   
}


//Used controller functions

const getFuelStationById = async (req,res) => {
    try{
        const fuelstation = await FuelStation.findOne({email:req.params.id});


        const data = {
            "id": fuelstation._id,
            "stationId" : fuelstation.stationId,
            "stationName" : fuelstation.stationName,
            "location" : fuelstation.location,
            "patrolAmount" : fuelstation.patrolAmount,
            "dieselAmount" : fuelstation.dieselAmount,
            "patrolQueueCount" : fuelstation.petrolQueue.length,
            "dieselQueueCount" : fuelstation.dieselQueue.length
        };
        
        res.status(200).json({message: 'Fuel Station fetched successfully', data: [data]});
    } catch (error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}
const updateFuelAmount = async (req,res) => {
    try{
        // const fuelstation = await FuelStation.findById(req.params.id);
 
        const {fuelType,amount,date,email} = req.body;

        const filter = { email: email };
        let update;

        if(fuelType == 'Petrol'){
            update = { patrolAmount: amount };
        }else{
            update = { dieselAmount: amount,date:date };
        }
        
        let result = await FuelStation.findOneAndUpdate(filter, update);
        console.log(result)
        res.status(200).send({
            "name": "morpheus",
            "job": "leader",
            "id": "996",
            "createdAt": "2022-10-27T09:51:58.138Z"
        });
    } catch (error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}

const updateFuelStatus = async (req,res) => {
    try{
        // const fuelstation = await FuelStation.findById(req.params.id);
 
        const {fuelType,email} = req.body;

        const filter = { email: email };
        let update;

        if(fuelType == 'Petrol'){
            update = { patrolAmount: 0};
        }else{
            update = { dieselAmount: 0};
        }
        
        let result = await FuelStation.findOneAndUpdate(filter, update);
        console.log(result)
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}


module.exports = { getFuelStations, updateFuelStation, deleteFuelStation, getFuelStationById,updateFuelAmount,updateFuelStatus}