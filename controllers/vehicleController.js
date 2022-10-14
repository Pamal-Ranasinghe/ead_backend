const Vehicle = require('../models/vehicle');
const FuelStation = require('../models/fuelStation');

const addVehicle = async (req,res) => {
    try{
        const vehicle = new Vehicle(req.body);
        await vehicle.save()
        .then(data => {
            res.status(200).json({message: 'Vehicle added successfully', data: data});
        })
        .catch(error => {
            res.status(500).json({message: 'Error occured', error: error});
        });
    } catch (error) {
        res.status(500).json({message: 'Error occured', error: error});
    }

}

const getVehicles = async (req,res) => {
    try{
        await Vehicle.find()
        .then(data => {
            res.status(200).json({message: 'Vehicles fetched successfully', data: data});
        })
        .catch(error => {
            res.status(500).json({message: 'Error occured', error: error});
        });
    } catch(error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}

const updateVehicle = async (req,res) => {
    try{
        if(req.params && req.body) {
            await Vehicle.findByIdAndUpdate(req.params.id, req.body)
            .then(data => {
                res.status(200).json({message: 'Vehicle updated successfully', data: data});
            })
            .catch(error => {
                res.status(500).json({message: 'Error occured', error: error});
            });
        }
    } catch(error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}

const deleteVehicle = async (req,res) => {
    try{
        if(req.params) {
            await Vehicle.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({message: 'Vehicle deleted successfully', data: data});
            })
            .catch(error => {
                res.status(500).json({message: 'Error occured', error: error});
            });
        }
    } catch(error ) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}

const addVehicleToQueue = async (req,res) => {
    try{
        if(req.params && req.body) {
            const vehicle = await Vehicle.findById(req.params.id);
            if(vehicle) {
                if(vehicle.fuelType === 'Petrol') {
                    await FuelStation.findOneAndUpdate({stationName: req.body.stationName}, {$push: {petrolQueue: vehicle._id}})
                    .then(data => {
                        res.status(200).json({message: 'Vehicle added to queue successfully', data: data});
                    })
                    .catch(error => {
                        res.status(500).json({message: 'Error occured', error: error});
                    });
                } else if(vehicle.fuelType === 'Diesel') {
                    await FuelStation.findOneAndUpdate({stationName: req.body.stationName}, {$push: {petrolQueue: vehicle._id}})
                    .then(data => {
                        res.status(200).json({message: 'Vehicle added to queue successfully', data: data});
                    })
                    .catch(error => {
                        res.status(500).json({message: 'Error occured', error: error});
                    });
                }
            }
        }
    } catch (error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}

module.exports = {addVehicle, getVehicles, updateVehicle, deleteVehicle, addVehicleToQueue};