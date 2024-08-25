const taskDtb = require('../../models/task.models.js');

module.exports.index = async (req, res) => {
    const task = await taskDtb.find({
        deleted: false
    })
    res.json(task);
}