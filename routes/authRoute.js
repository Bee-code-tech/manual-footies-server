// routes/authRoutes.js
const express = require('express');
const { registerUser, verifyOtp, loginUser, checkEmailExists } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyOtp);
router.post('/login', loginUser);
router.post('/check-email', checkEmailExists);

module.exports = router;
