const express = require('express');
const router = express.Router();

const userContronllers = require('../controllers/user.controllers');


router.post('/register', userContronllers.register);

router.patch('/login', userContronllers.login);

router.patch('/password/forgot', userContronllers.passwordForgot);

router.patch('/password/otp', userContronllers.otp);

router.patch('/password/reset', userContronllers.reset);


module.exports = router;