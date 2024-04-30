const mongoose = require('mongoose');
const validator = require('./../validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const doctorSchema = new mongoose.Schema({
    photo:{
    type: String,
    default: 'default.png'
    },
    Specialization:{
      type: String,
      enum: ['']
    },
    firstName: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    lastName: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
       unique: true,
       lowercase: true,
      validateor: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    phoneNumber:{
      type: Number ,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    aboutDoctor:{
      type:String
    },
    experience: String,
    location: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    passwordResetToken:String,
  passwordResetExpires: Date
  },{
    toJSON:{virtuals: true},
    toObject:{virtuals: true}
}
);
  doctorSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  });

  doctorSchema.virtual('Reviews',{
    ref:'doctorReviews',
    foreignField: 'doctor',
    localField: '_id'
  })

  
  doctorSchema.methods.toJSON = function(){
    let doctor = this
    let doctorObject = doctor.toObject()
    delete doctorObject.__v
    delete doctorObject.createdAt
    return doctorObject
  }
 
  doctorSchema.methods.correctPassword = async function(candidatePassword,userPassword) 
    {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  doctorSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };
  doctorSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000 ;
  
    return resetToken;
  };
  
  
  const Doctor = mongoose.model('Doctor',doctorSchema );
  module.exports = Doctor;