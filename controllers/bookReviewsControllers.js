const bookReviews = require('./../models/bookReviewsModel')
exports.getAllReviews = async(req, res, next) => {
    const reviews = await bookReviews.find()
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        reviews: reviews
    })
}
exports.createReview = async(req, res, next) => {
    const newReview = await bookReviews.create(req.body)
    res.status(200).json({
        status: 'success',
        newReview: newReview
    })
}
