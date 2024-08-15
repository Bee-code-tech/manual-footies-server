// routes/userRoutes.js
const express = require('express');
const { getUserProfile, updateUserProfile, deleteUserAccount } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.delete('/profile', verifyToken, deleteUserAccount);

module.exports = router;
