const jwt = require('jsonwebtoken')
const { promisify } = require('util');
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
        phoneNumber:req.body.phoneNumber,
        aboutDoctor:req.body.aboutDoctor,
        experience:req.body.experience,
        photo:req.body.photo
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
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await Doctor.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  
    // 3) If everything ok, send token to client
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET ,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
    res.status(201).json({
        status: 'success',
        token,

      })
  });
  exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await Doctor.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }
  
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  });
