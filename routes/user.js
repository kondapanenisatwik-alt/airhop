const express = require('express');
const router = express.Router();
const { previousSearches } = require('../controllers/userController');

// GET /api/user/previous-searches
router.get('/previous-searches', previousSearches);

module.exports = router;
