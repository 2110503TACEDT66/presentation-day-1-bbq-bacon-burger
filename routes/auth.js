const express = require('express');
const {register, login, getMe, logout, checkEmail} = require('../controllers/auth');

const router = express.Router();

const {protect} = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/email',  checkEmail);
router.get('/logout', logout);
module.exports = router;