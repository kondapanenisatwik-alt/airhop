const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('../controllers/reviewController');

// Add a review
router.post('/', addReview);

// Get reviews for a route
router.get('/', getReviews);

module.exports = router;