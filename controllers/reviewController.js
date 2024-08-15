// controllers/reviewController.js
const Product = require('../models/Product');
const debug = require('debug')('app:reviewController');

// Add a review to a product
exports.addReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const review = {
            user: req.user.id,
            rating,
            comment,
            profilePicture: req.user.profilePicture,
        };

        product.reviews.push(review);
        await product.save();

        debug('Review added successfully');
        res.status(201).json(product);
    } catch (err) {
        debug('Error adding review:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get all reviews for a product
exports.getReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('reviews.user', 'username profilePicture');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.status(200).json(product.reviews);
    } catch (err) {
        debug('Error fetching reviews:', err.message);
        res.status(500).send('Server Error');
    }
};
