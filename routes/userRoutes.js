const express = require('express');
//const userModel = require('./../models/userModel')
const authControllers = require('./../controllers/authControllers')
const userControllers = require('./../controllers/userControllers')
const validator = require('./../validator')
const router = express.Router();
router.get('/getAllDoctors',authControllers.protect,userControllers.getAllDoctors)
router.post('/signUp',validator, authControllers.signUp);
router.post('/login', authControllers.login);

module.exports = router
