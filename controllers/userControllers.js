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
    const queryObj = {...req.query}
    const excludeFields = ['page', 'sort', 'limit' , 'field' ]
    excludeFields.forEach(el=> delete queryObj[el])
 // advanced filtering
 let queryStr = JSON.stringify(queryObj)
 queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`)
    const query = Doctor.find(JSON.parse(queryStr))
    const doctors = await query
    res.status(200).json({
        result: doctors.length,
        status: 'success',
        doctors
    })

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
    exports.getDoctor = async(req, res, next)=>{
        const doctor = await Doctor.findById(req.params.id).populate('Reviews')
        res.status(200).json({
            status: 'success',
            doctor
        })
    }   

module.exports 