const express = require('express');
const validator = require('./../validator')
const authDocoter = require('./../controllers/authDocoter')
const router = express.Router();
router.route('/signUp',validator,authDocoter.signUp)

module.exports = router
