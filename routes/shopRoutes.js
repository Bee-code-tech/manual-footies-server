// routes/shopRoutes.js
const express = require('express');
const { createShop, getShops, getShopById, updateShop, deleteShop } = require('../controllers/shopController');
const { isAdmin } = require('../middleware/roleMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, isAdmin, createShop);
router.get('/', getShops);
router.get('/:id', getShopById);
router.put('/:id', verifyToken, isAdmin, updateShop);
router.delete('/:id', verifyToken, isAdmin, deleteShop);

module.exports = router;
