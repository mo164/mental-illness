const mongoose = require('mongoose');
const Book = require('./../models/bookModel');
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
            ratingsAverage: status[0].nRating,
            ratingsQuantity: status[0].avgRating
        })
};

bookReviewsSchema.post('save', function(next){
    this.constructor.calcAverageRatings(this.book)
})

const bookReviews = mongoose.model('bookReviews', bookReviewsSchema)
module.exports =  bookReviews