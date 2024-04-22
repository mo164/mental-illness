const Doctor = require('./../models/doctorModel')
exports.getAll = async (req,res,next)=>{
    const users = await Doctor.find()
    res.status(200).json({
        status: 'success',
        users: users
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
    const user = await Doctor.findById(req.params.id).populate('Reviews')
    res.status(200).json({
        status: 'success',
        users: user
    })
}   
module.exports 