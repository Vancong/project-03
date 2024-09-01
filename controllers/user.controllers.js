const userDtb = require('../models/user.models');
const generate = require('../helpers/generate.helpers');
const md5 = require('md5');
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