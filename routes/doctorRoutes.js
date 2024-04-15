const express = require('express');
const validator = require('./../validator')

const authDocoter = require('./../controllers/authDocoter')
const router = express.Router();
router.post('/signUp',validator,authDocoter.signUp)
router.post('/login',validator,authDocoter.login)

module.exports = router
