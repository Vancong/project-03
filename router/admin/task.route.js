const express = require('express');
const router = express.Router();

const taskContronllers = require('../../controllers/admin/task.controllers.js');


router.get('/', taskContronllers.index);

module.exports = router;