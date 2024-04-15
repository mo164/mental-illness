const User = require('../models/userModel')

exports.getAll = async (req,res,next)=>{
    const users = await User.find()
    res.status(200).json({
        status: 'success',
        users: users
    })
    console.log('Done!!!')
}
module.exports 