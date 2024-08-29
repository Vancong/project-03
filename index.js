const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express()
const port = 4000

const database = require('./config/database.config.js');
database.connect();

app.use(bodyParser.json());




const route = require('./router/index.route.js');
route(app);


app.listen(port, () => {
    console.log(`dang chay cong ${port}`)
})