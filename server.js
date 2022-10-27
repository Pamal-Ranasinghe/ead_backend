const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const fuelStationApi = require('./api/fuelStationApi');
const vehicleApi = require('./api/vehicleApi');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = "mongodb+srv://pamal:pamal@ead.5sutrt3.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error) => {
    if (error) {
        console.log(error);
    }
});

mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

app.route('/').get((req,res) => {
    res.send('Test route');
});

app.use('/fuelStation', fuelStationApi());
app.use('/vehicle', vehicleApi());

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is running on port: ${PORT}`);
    }
});
