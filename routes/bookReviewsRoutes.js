const express = require('express');
const bookReviewsController = require('./../controllers/bookReviewsControllers')
const router = express.Router();

router.route('/')
.get(bookReviewsController.getAllReviews)
.post(bookReviewsController.createReview)

module.exports = router;