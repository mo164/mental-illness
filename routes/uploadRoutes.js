const express = require('express')
const router = express.Router()
const upload = require('./../multer')
const cloudinary = require('./../cloudinary')
const path = require('path')
const Book = require('./../models/bookModel')
router.post('/uploadBook', upload.single('pdf'),  function (req, res) {
    cloudinary.uploader.upload(req.file.path, async function (err, result){
      if(err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error"
        })
      }
     
     const url = result.secure_url
       await Book.create({
        url,
        name:req.body.name,
        rate:req.body.rate,
        language:req.body.language,
        pages:req.body.pages,
        description:req.body.description,
        reviews:req.body.reviews
     })
    //  console.log(result)
      res.status(200).json({
       status:'sucsess', 
        message:"book created!", 
      })
    })
  });
  
module.exports = router