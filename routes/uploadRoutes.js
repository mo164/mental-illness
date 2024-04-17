const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const authControllers = require('./../controllers/authControllers')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../pdfs"))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage})

// /api /upload
router.post('/',
authControllers.protect,
authControllers.restrictTo('admin'),
upload.single('book'),
(req,res)=>{
    res.status(200).json({message:'success upload'})
})
module.exports = router