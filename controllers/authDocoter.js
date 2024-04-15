const jwt = require('jsonwebtoken')
const Doctor = require('../models/doctorModel')
//const validator = require('./../validator')
const catchAsync = require('./../utils/cathAsync')
const AppError = require('./../utils/appError')
exports.signUp = catchAsync(async (req,res,next) =>{
    const newUser = await Doctor.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        phoneNumber:req.body.phoneNumber
    })
    const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET ,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
    res.status(201).json({
        status: 'success',
        token,
        data:{
           users:newUser
           
        } 
    })
})