const express = require('express');
const router = express.Router();
const { exportRoute } = require('../controllers/exportController');

router.post('/', exportRoute);

module.exports = router;
