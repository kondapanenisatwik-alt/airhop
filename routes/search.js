const express = require('express');
const router = express.Router();
const { searchRoute } = require('../controllers/searchController');

// GET /api/search/route?start=A&target=D
router.get('/route', searchRoute);

module.exports = router;
