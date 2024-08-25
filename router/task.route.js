const express = require('express');
const router = express.Router();

const taskContronllers = require('../controllers/task.controllers');


router.get('/', taskContronllers.index);

router.get('/detail/:id', taskContronllers.detail);

module.exports = router;