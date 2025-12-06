const Review = require('../models/review');
const Product = require('../models/product');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');
const ThrowError = require('../utils/throwError');

// Create a new review
const createReview = async (req, res) => {
    try {
        const { productId, userId, name, email, rating, comment } = req.body;

        if (!productId || !userId || !name || !email || !rating || !comment) {
            throw new ThrowError('All fields are required', 400);
        }

        if (rating < 1 || rating > 5) {
            throw new ThrowError('Rating must be between 1 and 5', 400);
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            throw new ThrowError('Product not found', 404);
        }

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({ product: productId, user: userId });
        if (existingReview) {
            throw new ThrowError('You have already reviewed this product', 400);
        }

        // Create review
        const review = await Review.create({
            product: productId,
            user: userId,
            name,
            email,
            rating: Number(rating),
            comment
        });

        // Update product rating and numReviews
        await updateProductRating(productId);

        return res.status(201).json({ success: true, msg: 'Review added successfully', data: review });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

// Get all reviews for a product
const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ product: productId })
            .sort({ createdAt: -1 });

        return sendSuccessResponse(res, 'Reviews fetched successfully', reviews);
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

// Update product rating based on reviews
const updateProductRating = async (productId) => {
    try {
        const reviews = await Review.find({ product: productId });
        
        const numReviews = reviews.length;
        const rating = numReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / numReviews
            : 0;

        await Product.findByIdAndUpdate(productId, {
            rating: Math.round(rating * 10) / 10, // Round to 1 decimal place
            numReviews
        });
    } catch (error) {
        console.error('Error updating product rating:', error);
    }
};

// Delete a review (optional - for admin)
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);
        if (!review) {
            throw new ThrowError('Review not found', 404);
        }

        const productId = review.product;
        await Review.findByIdAndDelete(reviewId);

        // Update product rating after deletion
        await updateProductRating(productId);

        return sendSuccessResponse(res, 'Review deleted successfully', null);
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

module.exports = {
    createReview,
    getProductReviews,
    deleteReview
};
