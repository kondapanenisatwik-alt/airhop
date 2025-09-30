const express = require('express');
const router = express.Router();
const { shareRoute, getSharedRoute } = require('../controllers/shareController');

// Create link
router.post('/', shareRoute);

// Access link
router.get('/:id', getSharedRoute);

module.exports = router;
