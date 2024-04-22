const express = require('express');
const doctorReviewsController = require('./../controllers/doctorReviewsController')
const authControllers = require('./../controllers/authControllers')
const router = express.Router({mergeParams:true});

router.route('/')
.get(doctorReviewsController.getAllReviews)
.post(authControllers.protect,doctorReviewsController.createReview)

module.exports = router;