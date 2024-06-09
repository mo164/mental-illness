const mongoose = require('mongoose');
const Book = require('./../models/bookModel');
const User = require('./../models/userModel');
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
        path: 'user',
       select: 'firstName lastName'
    }).this.populate({
        path: 'book',
        select:'name'
    })
    next()
})
bookReviewsSchema.statics.calcAverageRatings = async function(bookId) {
    const stats = await this.aggregate([
      {
        $match: { book: bookId },
      },
      {
        $group: {
          _id: '$book',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }

    ])
       await Book.findByIdAndUpdate(bookId,{
            ratingsAverage: stats[0].avgRating,
            ratingsQuantity: stats[0].nRating
        })
};

bookReviewsSchema.post('save', function(next){
    this.constructor.calcAverageRatings(this.book)
})

const bookReviews = mongoose.model('bookReviews', bookReviewsSchema)
module.exports =  bookReviews