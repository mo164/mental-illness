const express = require('express');
const validator = require('./../validator')
const authDocoter = require('./../controllers/authDocoter')
const doctorController = require('./../controllers/doctorController')
const authControllers = require('./../controllers/authControllers')
const doctorReviewsController = require('./../controllers/doctorReviewsController')
const router = express.Router();
router.get('/seeAll',authDocoter.protect, doctorController.getAll)
router.post('/signUp',validator,authDocoter.signUp)
router.post('/login',validator,authDocoter.login)
router
.route('/:id')
.delete(authDocoter.protect,doctorController.delete)
.get(doctorController.getDoctor)
// router.route('/:doctorId/reviews',
// authControllers.protect,
// doctorReviewsController.createReviewe
// )
.post()
module.exports = router
