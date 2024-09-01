const userDtb = require('../models/user.models');
const generate = require('../helpers/generate.helpers');
const md5 = require('md5');
const {
    exists
} = require('../models/task.models');
// [POST] /user/register
module.exports.register = async (req, res) => {
    const email = req.body.email;
    const existEmail = await userDtb.findOne({
        email: email
    });
    if (existEmail) {
        res.json({
            code: 400,
            message: 'Email da ton tai trong he thong'
        });
        return;
    }
    const token = generate.generateRandomString(30);
    const dataRegister = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        token: token
    }
    const newUser = new userDtb(dataRegister);
    await newUser.save()

    res.json({
        code: 200,
        message: 'Dang ky tai khoan thanh cong',
        token: token
    })

}

// [PATCH] /user/login
module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);
    const existEmail = await userDtb.findOne({
        email: email,
        deleted: false
    })
    if (existEmail && password == existEmail.password) {
        res.json({
            code: 200,
            message: 'dang nhap thanh cong',
            token: existEmail.token
        })
        return;
    }

    res.json({
        code: 400,
        message: 'sai email hoac mat khau'
    })

}