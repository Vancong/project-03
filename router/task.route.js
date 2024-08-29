const express = require('express');
const router = express.Router();

const taskContronllers = require('../controllers/task.controllers');


router.get('/', taskContronllers.index);

router.get('/detail/:id', taskContronllers.detail);

router.patch('/change-status', taskContronllers.changeStatus);

router.post('/create', taskContronllers.createPost);

router.patch('/edit/:id', taskContronllers.editPatch);

module.exports = router;