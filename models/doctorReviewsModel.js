const mongoose = require('mongoose');
const Doctor = require('./../models/doctorModel')
const doctorReviewsSchema = new mongoose.Schema({
    review:{
        type: String,
        required:[true,'review can not be empty']
    },
    rating:{
        type: Number,
        min:1,
        max:5
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    doctor:{
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor',
        required:[true,'review must belong to a doctor']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:[true,'review must belong to a user']
    },
},
{
    toJSON:{virtuals: true},
    toObject:{virtuals: true}
})
doctorReviewsSchema.pre(/^find/,function(next){
    
    this.populate({
        path: 'user',
       select: 'firstName lastName'
    }).populate({
        path:'doctor',
        select: 'firstName lastName'
    })
    next()
})
doctorReviewsSchema.statics.calcAverageRatings = async function(doctorId) {
    const stats = await this.aggregate([
      {
        $match: { doctor: doctorId },
      },
      {
        $group: {
          _id: '$doctor',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }

    ])
       await Doctor.findByIdAndUpdate(doctorId,{
            ratingsAverage: stats[0].avgRating,   
            ratingsQuantity: stats[0].nRating
        })
};
doctorReviewsSchema.post('save', function(next){
    this.constructor.calcAverageRatings(this.doctor)
})
const doctorReviews = mongoose.model('doctorReviews', doctorReviewsSchema)
module.exports = doctorReviews