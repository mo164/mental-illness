const User = require('../models/userModel')
//const validator = require('./../validator')
exports.signUp = async (req,res,next) =>{
    const newUser = await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        phoneNumber:req.body.phoneNumber
    })
    res.status(201).json({
        status: 'success',
        data:{
           users:newUser
           
        }

    })
}
