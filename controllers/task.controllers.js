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
        skip.limitItem = parseInt(req.query.limitItem);
        skip.skipPage = (skip.page - 1) * skip.limitItem;
    }

    //end phan trang

    const find = {
        $or: [{
                createdBy: req.user.id
            },
            {
                listUser: req.user.id
            }
        ],
        deleted: false
    }

    //bo loc
    if (req.query.status) {
        find.status = req.query.status
    }
    //end bo loc

    //sap xep theo nhieu tieu chi
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    const sort = {};
    if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    //end

    // tim kiem
    let keyword = "";
    if (req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }
    //end tim kiem
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

//[GET] /task/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const status = req.body.status;
        const idf = req.body.idf;
        await taskDtb.updateMany({
            _id: {
                $in: idf
            }
        }, {
            status: status
        })
        res.json({
            message: "cap nhat trang thai thanh cong"
        });
    } catch (error) {
        res.json({
            message: 'Not found'
        })
    }
}

//[POST] /task/create
module.exports.createPost = async (req, res) => {
    req.body.createdBy = req.user.id;
    const newtask = new taskDtb(req.body);
    await newtask.save();

    res.json({
        message: 'Tao moi cong viec thanh cong'
    })
}

//[PATCH] /task/edit:id
module.exports.editPatch = async (req, res) => {
    try {
        await taskDtb.updateOne({
            _id: req.params.id
        }, req.body)
        res.json({
            message: "Cap nhat cong viec thanh cong"
        })
    } catch (error) {
        res.json({
            message: 'Not found'
        })
    }
}

//[PATCH] /task/delete
module.exports.delete = async (req, res) => {
    const idf = req.body.idf;
    await taskDtb.updateMany({
        _id: {
            $in: idf
        }
    }, {
        deleted: true
    });
    res.json({
        message: 'Xoa thanh cong'
    })
}