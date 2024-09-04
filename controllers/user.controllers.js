const userDtb = require('../models/user.models');
const generate = require('../helpers/generate.helpers');
const forgotPassDtb = require('../models/forgot-password.models');
const sendMailHelpers = require('../helpers/sendMail.helpers');
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

// [PATCH] /user/password/forgot
module.exports.passwordForgot = async (req, res) => {
    const existEmail = await userDtb.findOne({
        email: req.body.email
    })
    if (!existEmail) {
        res.json({
            code: 400,
            message: "Sai email"
        })
        return;

    }
    const otp = generate.generateRandomNumber(6);
    const expireAt = Date.now() + (3 * 60 * 1000);
    const data = {
        email: req.body.email,
        otp: otp,
        expireAt: expireAt
    }
    const newData = new forgotPassDtb(data);
    await newData.save();
    const email = req.body.email
    const subject = 'Mã OTP để lấy lại mật khẩu là';
    const html = ` Mã OTP có hiệu lực trong 3 phút : ${otp}. Vui lòng không cung cấp cho ai khác `

    sendMailHelpers(email, subject, html);
    res.json({
        code: 200,
        message: 'Da gui ma OTP'
    })
}

// [PATCH] /user/password/otp 
module.exports.otp = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const existEmail = await forgotPassDtb.findOne({
        email: email,
        otp: otp
    })
    if (!existEmail) {
        res.json({
            code: 400,
            message: 'Sai ma otp'
        })
        return;
    }
    const user = await userDtb.findOne({
        email: email
    })
    res.json({
        code: 200,
        token: user.token,
        message: 'Xac thuc thanh cong'
    })
}

// [PATCH] /user/password/reset
module.exports.reset = async (req, res) => {
    const token = req.body.token;
    const password = md5(req.body.password);
    const existEmail = await userDtb.findOne({
        token: token,
        deleted: false
    })
    if (!existEmail) {
        res.json({
            code: 400,
            message: 'Khong ton tai '
        })
        return
    }
    await userDtb.updateOne({
        token: token
    }, {
        password: password
    })
    res.json({
        code: 200,
        message: 'Doi mat khau thanh cong'
    })
}