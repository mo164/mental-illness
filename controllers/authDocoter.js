const jwt = require('jsonwebtoken')
const { promisify } = require('util');
const Doctor = require('../models/doctorModel')
//const validator = require('./../validator')
const catchAsync = require('./../utils/cathAsync')
const AppError = require('./../utils/appError')
const sendEmail = require('./../utils/email')
const crypto = require('crypto')
const upload = require('./../multer')
const cloudinary = require('./../cloudinary')
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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
  exports.updateMe = catchAsync(async (req, res, next) => {
 
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'firstName','lastName' ,'email' , 'password', 'phoneNumber' , 'location');
    if(req.file) filteredBody.photo = req.file.filename
    // 3) Update user document
    const updatedUser = await Doctor.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
    console.log(req.file)
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  });
  exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await Doctor.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }
  
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
  
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(
        new AppError('There was an error sending the email. Try again later!'),
        500
      );
    }
  });
  exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
  
    const user = await Doctor.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
  
    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  
    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET ,{
      expiresIn:process.env.JWT_EXPIRES_IN
  })
  res.status(201).json({
      status: 'success',
      token,
      
})
  });
