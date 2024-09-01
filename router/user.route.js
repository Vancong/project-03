const express = require('express');
const router = express.Router();

const userContronllers = require('../controllers/user.controllers');


router.post('/register', userContronllers.register);

router.patch('/login', userContronllers.login);

module.exports = router;