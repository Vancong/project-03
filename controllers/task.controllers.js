const taskDtb = require('../models/task.models.js');


//[GET] /task
module.exports.index = async (req, res) => {

    const find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status
    }
    const task = await taskDtb.find(find);

    res.json(task);
}

//[GET] /task/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const task = await taskDtb.findOne({
        _id: id,
        deleted: false
    })
    res.json(task);
}