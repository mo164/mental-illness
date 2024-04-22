const mongoose = require('mongoose');

const bookReviewsSchema = new mongoose.Schema({
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
    book:{
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required:[true,'review must belong to a book']
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
bookReviewsSchema.pre(/^find/,function(next){
    this.populate({
        path: 'book',
        select: 'name'
    }).populate({
        path: 'user',
       select: 'firstName lastName'
    })
    next()
})
const bookReviews = mongoose.model('bookReviews', bookReviewsSchema)
module.exports =  bookReviews