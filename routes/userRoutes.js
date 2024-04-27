const express = require('express');
//const userModel = require('./../models/userModel')
const authControllers = require('./../controllers/authControllers')
const userControllers = require('./../controllers/userControllers')
const validator = require('./../validator')
const router = express.Router();
router.get('/getAllDoctors',authControllers.protect,userControllers.getAllDoctors)
router.get('/getAllUsers',userControllers.getAllUsers)
router.post('/signUp',validator, authControllers.signUp);
router.post('/login', authControllers.login);
router.post('/addBook',authControllers.protect)
router.patch('/updateMe',authControllers.protect, authControllers.updateMe)
router.post('/forgotPassword',authControllers.forgotPassword)
router.patch('/resetPassword/:token', authControllers.resetPassword);


router
.route('/:id')
.delete(authControllers.protect,userControllers.delete);

module.exports = router
