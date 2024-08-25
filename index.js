const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express()
const port = 4000

const database = require('./config/database.config.js');
database.connect();

const routeAdmin = require('./router/admin/index.route.js');
routeAdmin(app);
app.listen(port, () => {
    console.log(`dang chay cong ${port}`)
})