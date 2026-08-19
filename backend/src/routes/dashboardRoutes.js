const express = require('express');
const { adminDashboard } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/admin', adminDashboard);

module.exports = router;
