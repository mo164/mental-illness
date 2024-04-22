const mongoose = require('mongoose');
const validator = require('./../validator');
const bcrypt = require('bcryptjs');
const bookSchema = new mongoose.Schema({
   name: String,
   rate: Number,
   language: {
    type: String,
    enum: ['arabic', 'english']
   },
   pages: Number,
   description: String,
   url: String
  });
  
  
  const Book = mongoose.model('Book',bookSchema );
  module.exports = Book;