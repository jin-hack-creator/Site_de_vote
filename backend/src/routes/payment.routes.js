const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// @route   POST api/payment/callback/:gateway
// @desc    Handle payment callback from payment gateway
// @access  Public
router.post('/callback/:gateway', paymentController.handlePaymentCallback);

module.exports = router;
