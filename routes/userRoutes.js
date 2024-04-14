const express = require('express');
//const userModel = require('./../models/userModel')
const authControllers = require('./../controllers/authControllers')
const router = express.Router();
router.post('/signUp', authControllers.signUp);

module.exports = router
