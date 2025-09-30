const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites, deleteFavorite } = require('../controllers/favoriteController');

// Add favorite
router.post('/', addFavorite);

// Get all favorites
router.get('/', getFavorites);

// Delete favorite
router.delete('/:id', deleteFavorite);

module.exports = router;
