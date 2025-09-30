const Review = require('../models/Review');

// Add a review
const addReview = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const { start, target, rating, comment } = req.body;

    const review = new Review({
      user: req.user.userId,
      start,
      target,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get reviews for a route
const getReviews = async (req, res) => {
  try {
    const { start, target } = req.query;

    const reviews = await Review.find({ start, target }).populate('user', 'name email');
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addReview, getReviews };
