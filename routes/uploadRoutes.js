const express = require('express')
const router = express.Router()
const upload = require('./../multer')
const cloudinary = require('./../cloudinary')
const path = require('path')
const Book = require('./../models/bookModel')
const User = require('./../models/userModel')
const Doctor = require('./../models/doctorModel')
const authControllers = require('./../controllers/authControllers')
const authDoctor = require('./../controllers/authDocoter')
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
  router.patch('/uploadUserPhoto', authControllers.protect,upload.single('photo'),  function (req, res) {
    cloudinary.uploader.upload(req.file.path, async function (err, result){
      if(err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error"
        })
      }
     
     const url = result.secure_url
       await User.findByIdAndUpdate(req.user.id,{photo:url },{
        new: true,
        runValidators: true
      })
    //  console.log(result)
      res.status(200).json({
       status:'sucsess', 
        message:"updated ", 
      })
    })
  });
  router.patch('/uploadDoctorPhoto', authDoctor.protect,upload.single('photo'),  function (req, res) {
    cloudinary.uploader.upload(req.file.path, async function (err, result){
      if(err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error"
        })
      }
     
     const url = result.secure_url
       await Doctor.findByIdAndUpdate(req.user.id,{photo:url },{
        new: true,
        runValidators: true
      })
    //  console.log(result)
      res.status(200).json({
       status:'sucsess', 
        message:"updated ", 
        url
      })
    })
  });
  
module.exports = router