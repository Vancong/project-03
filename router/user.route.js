const express = require('express');
const router = express.Router();

const userContronllers = require('../controllers/user.controllers');


router.post('/register', userContronllers.register);



module.exports = router;