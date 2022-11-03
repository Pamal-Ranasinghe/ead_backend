const FuelStation = require('../models/FuelStation');
const User = require("../models/user")
const bcrypt = require('bcrypt')

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
        await FuelStation.find().sort({createdAt:'DESC'})
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


const deleteFuelStation = async (req,res) => {
    try{
        const {email} = req.body;
        console.log(email.split('"')[1])
        FuelStation.deleteOne({ email: email.split('"')[1] })
        .then(data => {
            console.log(data)
            res.status(200).json({message: 'Fuel Stations deleted successfully', data: data});
        })
        .catch(error => {
            res.status(500).json({message: 'Error occured', error: error});
        });
    } catch(error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}


const login = async (req,res) => {
    try{
        const {email} = req.body;
        console.log(email.split('"')[1])
        FuelStation.deleteOne({ email: email.split('"')[1] })
        .then(data => {
            console.log(data)
            res.status(200).json({message: 'Fuel Stations deleted successfully', data: data});
        })
        .catch(error => {
            res.status(500).json({message: 'Error occured', error: error});
        });
    } catch(error) {
        res.status(500).json({message: 'Error occured', error: error});
    }
}

const createUser = async (req,res) => {
    try {
        console.log(req.body)
        const {email,password,role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const temp = { email: email, password: hashedPassword,role:role }
        const user = new User(temp);
        await user.save()
        .then(data => {
            res.status(200).json({message: 'Fuel Station added successfully', data: data});
            console.log(data)
        })
        .catch(error => {
            res.status(500).json({message: 'Error occured', error: error});
        });
      } catch {
        res.status(500).send()
      }
}
module.exports = {addFuelStation,getFuelStations,deleteFuelStation,login,createUser}