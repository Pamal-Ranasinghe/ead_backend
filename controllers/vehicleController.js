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

// const addVehicleToQueue = async (req,res) => {
//     try{
//         if(req.params && req.body) {
//             const vehicle = await Vehicle.findById(req.params.id);
//             const fuelStation = await FuelStation.findById(req.body.fuelStationId);
//             const amountOfFuel = req.body.amountOfFuel;
//             if(vehicle && fuelStation) {
//                 if(vehicle.fuelType === 'Petrol') {
//                     if(fuelStation.patrolAmount > 0) {
//                         await fuelStation.updateOne({"$set": {"patrolAmount": fuelStation.patrolAmount - amountOfFuel}, $push: {petrolQueue: vehicle._id}})
//                         .then(data => {
//                             res.status(200).json({message: 'Vehicle added to queue successfully', data: data});
//                         })
//                         .catch(error => {
//                             res.status(500).json({message: 'Error occured', error: error});
//                         });
//                     } else {
//                         res.status(200).json({message: 'Petrol is not available'});
//                     }
//                 } else if(vehicle.fuelType === 'Diesel') {
//                     if(fuelStation.dieselAmount > 0) {
//                         await fuelStation.updateOne({"$set": {"dieselAmount": fuelStation.dieselAmount - amountOfFuel}, $push: {dieselQueue: vehicle._id}})
//                         .then(data => {
//                             res.status(200).json({message: 'Vehicle added to queue successfully', data: data});
//                         })
//                         .catch(error => {
//                             res.status(500).json({message: 'Error occured', error: error});
//                         });
//                     } else {
//                         res.status(200).json({message: 'Diesel is not available'});
//                     }
//                 }
//             } else {
//                 res.status(500).json({message: 'Vehicle or fuel station not found'});
//             }
//         }
//     } catch (error) {
//         res.status(500).json({message: 'Error occured', error: error});
//     }
// }

const addVehicleToQueue = async (req,res) => {
    try{
        if(req.params && req.body){
            // await vehicle.updateOne({"$set" : {"queued": true}});
            const vehicle = await Vehicle.findById(req.params.id);
            const fuelStation = await FuelStation.findById(req.body.fuelStationId);
            const amountOfFuel = req.body.amountOfFuel;
            if(vehicle.queued === false) {
                if(vehicle && fuelStation) {
                    if(vehicle.fuelType === 'Patrol') {
                        console.log("Patrol");
                        if(fuelStation.patrolAmount > 0) {
                            
                            vehicle.queued = true;
                            vehicle.fuelAmount = amountOfFuel;
                            await vehicle.save();
    
                            await fuelStation.updateOne({"$set": {"patrolAmount": fuelStation.patrolAmount - amountOfFuel}, $push: {petrolQueue: vehicle._id}})
                            .then(data => {
                                res.status(200).json({message: 'Vehicle added to queue successfully', data: data});
                            })
                            .catch(error => {
                                res.status(500).json({message: 'Error occured', error: error});
                            });
                        } else {
                            res.status(200).json({message: 'Patrol is not available'});
                        }
                    } else if (vehicle.fuelType === 'Diesel') {
                        console.log("Diesel");
                        if(fuelStation.dieselAmount > 0) {
                            
                            vehicle.queued = true;
                            vehicle.fuelAmount = amountOfFuel;
                            await vehicle.save();
    
                            // await vehicle.update({"queued": true});
                            await fuelStation.updateOne({"$set": {"dieselAmount": fuelStation.dieselAmount - amountOfFuel}, $push: {dieselQueue: vehicle._id}})
                            .then(data => {
                                res.status(200).json({message: 'Vehicle added to queue successfully', data: data});
                            })
                            .catch(error => {
                                res.status(500).json({message: 'Error occured', error: error});
                            });
                        } else {
                            res.status(200).json({message: 'Diesel is not available'});
                        }
                    } else {
                        res.status(500).json({message: 'Fuel type not found'});
                    }
                } else {
                    res.status(500).json({message: 'Vehicle or fuel station not found'});
                }
            } else {
                res.status(200).json({message: 'Vehicle is already queued'});
            }
            }
            
    } catch (error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
} 

const removeVehicleFromQueueWithFuel = async (req,res) => {
    try{
        const vehicleId = req.body.vehicleId;
        const fuelStationId = req.body.fuelStationId;

        const fuelStation = await FuelStation.findById(fuelStationId);
        const vehicle = await Vehicle.findById(vehicleId);

        if(vehicle.fuelType === 'Patrol') {
            resetFuelAndQueue(vehicleId);
            await fuelStation.updateOne({"$pull": {"petrolQueue": vehicleId}})
            .then((data) => {
                res.status(200).json({message: 'Vehicle removed from queue successfully', data: data});
            })
            .catch((error) => {
                res.status(500).json({message: 'Error occured', error: error});
            });

        } else if(vehicle.fuelType === 'Diesel') {
            resetFuelAndQueue(vehicleId);
            await fuelStation.updateOne({"$pull": {"dieselQueue": vehicleId}})
            .then((data) => {
                res.status(200).json({message: 'Vehicle removed from queue successfully', data: data});
            })
            .catch((error) => {
                res.status(500).json({message: 'Error occured', error: error});
            });
        } else {
            res.status(500).json({message: 'Fuel type not found'});
        }
    } catch (error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}

const removeVehicleFromQueueWithoutFuel = async (req,res) => {
    try{
        const vehicleId = req.body.vehicleId;
        const fuelStationId = req.body.fuelStationId;

        const fuelStation = await FuelStation.findById(fuelStationId);
        const vehicle = await Vehicle.findById(vehicleId);

        if(vehicle.fuelType === 'Patrol') {
            await fuelStation.updateOne({"$pull": {"petrolQueue": vehicleId}, "$set": {"patrolAmount": fuelStation.patrolAmount + vehicle.fuelAmount}})
            .then((data) => {
                resetFuelAndQueue(vehicleId);
                res.status(200).json({message: 'Vehicle removed from queue successfully', data: data});
            })
            .catch((error) => {
                res.status(500).json({message: 'Error occured', error: error});
            });

        } else if(vehicle.fuelType === 'Diesel') {
            await fuelStation.updateOne({"$pull": {"dieselQueue": vehicleId}, "$set": {"dieselAmount": fuelStation.dieselAmount + vehicle.fuelAmount}})
            .then((data) => {
                resetFuelAndQueue(vehicleId);
                res.status(200).json({message: 'Vehicle removed from queue successfully', data: data});
            })
            .catch((error) => {
                res.status(500).json({message: 'Error occured', error: error});
            });
        } else {
            res.status(500).json({message: 'Fuel type not found'});
        }


    } catch (error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}

const resetFuelAndQueue = async (id) => {
    try{
        const vehicle = await Vehicle.findById(id);
        await vehicle.updateOne({"$set": {"queued": false, "fuelAmount": 0}});
    } catch (error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}


module.exports = {addVehicle, getVehicles, updateVehicle, deleteVehicle, addVehicleToQueue, removeVehicleFromQueueWithFuel, removeVehicleFromQueueWithoutFuel};