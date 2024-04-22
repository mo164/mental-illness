const express = require('express');
const doctorReviewsController = require('./../controllers/doctorReviewsController')
const router = express.Router();

router.route('/')
.get(doctorReviewsController.getAllReviews)
.post(doctorReviewsController.createReview)

module.exports = router;