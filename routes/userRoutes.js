const express = require('express');
//const userModel = require('./../models/userModel')
const authControllers = require('./../controllers/authControllers')
const userControllers = require('./../controllers/userControllers')
const router = express.Router();
router.get('/', userControllers.getAll)
router.post('/signUp', authControllers.signUp);

module.exports = router
