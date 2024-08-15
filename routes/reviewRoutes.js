// routes/reviewRoutes.js
const express = require('express');
const { addReview, getReviews } = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router({ mergeParams: true }); // Merge params to access productId

router.post('/', verifyToken, addReview);
router.get('/', getReviews);

module.exports = router;
