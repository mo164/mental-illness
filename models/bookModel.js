const mongoose = require('mongoose');
const validator = require('./../validator');
const bcrypt = require('bcryptjs');
const bookSchema = new mongoose.Schema({
   category: {
    type: String,
    enum:['Psychiatric illness' , 'Mental illness']
  },  
   name: String,
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
   language: {
    type: String,
    enum: ['arabic', 'english']
   },
   pages: Number,
   description: String,
   url: String
  },
  {
    toObject: { virtuals: true },
    toJson: { virtuals: true }
    });
  
 bookSchema.virtual('Reviews',{
   ref:'bookReviews',
   foreignField:'book',
   localField: '_id'
 })
  const Book = mongoose.model('Book',bookSchema );
  module.exports = Book;