const express = require('express');
const router = express.Router();
const userCotroller = require('./../controler/userController')
router.route('/').get(userCotroller.getUser)
module.exports = router