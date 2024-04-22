const express = require('express');
const validator = require('./../validator')
const authDocoter = require('./../controllers/authDocoter')
const doctorController = require('./../controllers/doctorController')
const authControllers = require('./../controllers/authControllers')
const doctorReviewsController = require('./../controllers/doctorReviewsController')
const doctorReviewsRoutes = require('./doctorReviewsRoutes')
const router = express.Router();
// router.use('/:docId/reviews',doctorReviewsRoutes)
router.get('/seeAll',authDocoter.protect, doctorController.getAll)
router.post('/signUp',validator,authDocoter.signUp)
router.post('/login',validator,authDocoter.login)
router.patch('/updateMe',authDocoter.protect,authDocoter.updateMe)
router
.route('/:id')
.delete(authDocoter.protect,doctorController.delete)
.get(doctorController.getDoctor)

module.exports = router
