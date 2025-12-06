const router = require('express').Router();
const { createReview, getProductReviews, deleteReview } = require('../controllers/review');

// Create a review
router.post('/create', createReview);

// Get all reviews for a product
router.get('/product/:productId', getProductReviews);

// Delete a review
router.delete('/:reviewId', deleteReview);

module.exports = router;
