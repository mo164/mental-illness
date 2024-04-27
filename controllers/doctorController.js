const Doctor = require('./../models/doctorModel')
const multer = require('multer')
exports.getAll = async (req,res,next)=>{
    const doctors = await Doctor.find()
    res.status(200).json({
        status: 'success',
        doctors
    })
    console.log('Done!!!')
}
exports.delete = async(req, res,next)=>{
    const user = await Doctor.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'success',
        data: null
      });
    };

exports.getDoctor = async(req, res, next)=>{
    const doctor = await Doctor.findById(req.params.id).populate('Reviews')
    res.status(200).json({
        status: 'success',
        doctor
    })
}   
const multerstorage = multer.diskStorage({
    destination: (req,file,cb)=>{
      cb(null,'imgs/users')
    },
    filename: function (req,file,cb) {
      cb(null, file.originalname)
    }
  
  });
  
  const upload = multer({
    storage: multerstorage
})
exports.uploadPhoto = upload.single('photo')
module.exports 