const Doctor = require('./../models/doctorModel')
exports.getAll = async (req,res,next)=>{
    const users = await Doctor.find()
    res.status(200).json({
        status: 'success',
        users: users
    })
    console.log('Done!!!')
}
module.exports 