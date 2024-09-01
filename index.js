const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();
const app = express()
const port = 4000

// app.use(cors()) // cach 1 tat ca cac ten mien duoc truy cap

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
} // cach 2 cu the ten mien 
app.use(cors(corsOptions))

const database = require('./config/database.config.js');
database.connect();

app.use(bodyParser.json());




const route = require('./router/index.route.js');
route(app);


app.listen(port, () => {
    console.log(`dang chay cong ${port}`)
})