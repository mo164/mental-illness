const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
const multer = require('multer')
const cloudinary = require('./../cloudinary')
exports.getAll = async (req,res,next)=>{
    const users = await User.find()
    res.status(200).json({
        status: 'success',
        users: users
    })
    console.log('Done!!!')
}
exports.getAllDoctors = async (req,res,next)=>{
    const users = await Doctor.find()
    res.status(200).json({
        status: 'success',
        users: users
    })
    console.log('getting all doctors by users done')

}
exports.getAllUsers = async (req,res,next)=>{
    const userrs = await User.find()
    res.status(200).json({
        status: 'success',
        userrs
    })
    console.log('getting all users done')
    
}
exports.delete = async(req, res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'success',
        data: null
      });
    };
//     const multerstorage = multer.diskStorage({
//         destination: (req,file,cb)=>{
//           cb(null,'imgs/users')
//         },
//         filename: function (req,file,cb) {
//           cb(null, file.originalname)
//         }
      
//       });
      
//       const upload = multer({
//         storage: multerstorage
//     })
//     // exports.uploadPhoto = upload.single('photo', function (req, res) {
//     //     cloudinary.uploader.upload(req.file.path, async function (err, result){
//     //       if(err) {
//     //         console.log(err);
//     //         return res.status(500).json({
//     //           success: false,
//     //           message: "Error"
//     //         })
//     //     }
//     //     const url = result.secure_url
//     //     await User.findByIdAndUpdate(req.user.id,{photo:url},{
//     //         new: true,
//     //         runValidators: true
//     //     })
    
//     // })

// })
module.exports 