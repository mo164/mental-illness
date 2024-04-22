const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')
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
module.exports 