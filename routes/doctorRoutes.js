const express = require('express');
const validator = require('./../validator')
const authDocoter = require('./../controllers/authDocoter')
const doctorController = require('./../controllers/doctorController')
const router = express.Router();
router.get('/seeAll',authDocoter.protect, doctorController.getAll)
router.post('/signUp',validator,authDocoter.signUp)
router.post('/login',validator,authDocoter.login)

module.exports = router
