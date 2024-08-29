const taskDtb = require('../models/task.models.js');


//[GET] /task
module.exports.index = async (req, res) => {
    // phan trang
    const skip = {
        page: 1,
        limitItem: 2
    }

    if (req.query.page && req.query.limitItem) {
        skip.page = parseInt(req.query.page);
        skip.skipPage = (skip.page - 1) * skip.limit;
        skip.limitItem = parseInt(req.query.limitItem);
    }

    //end phan trang

    const find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status
    }
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    const sort = {};
    if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    const task = await taskDtb.find(find)
        .sort(sort)
        .skip(skip.skipPage)
        .limit(skip.limitItem);;

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