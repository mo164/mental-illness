const mongoose = require('mongoose');

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
        path: 'doctor',
        select: 'firstName lastName'
    }).populate({
        path: 'user',
       select: 'firstName lastName'
    })
    next()
})
const doctorReviews = mongoose.model('doctorReviews', doctorReviewsSchema)
module.exports = doctorReviews