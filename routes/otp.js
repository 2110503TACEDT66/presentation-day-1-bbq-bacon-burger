const express = require('express');
const otpController = require('../controllers/otp');
const router = express.Router();

router.post('/sent-otp', otpController.sendOTP);
module.exports = router;