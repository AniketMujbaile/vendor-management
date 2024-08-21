const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performance.controller');

router.get('/:vendorId', performanceController.getVendorPerformance);

module.exports = router;