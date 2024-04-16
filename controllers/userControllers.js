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
module.exports 