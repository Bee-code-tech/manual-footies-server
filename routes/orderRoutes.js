// routes/orderRoutes.js
const express = require('express');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getOrderById } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', verifyToken, createOrder); // Create an order
router.get('/', verifyToken, getUserOrders); // Get orders for the authenticated user
router.get('/all', verifyToken, isAdmin, getAllOrders); // Get all orders (admin only)
router.get('/:id', verifyToken, getOrderById); // Get a single order by ID
router.put('/:id', verifyToken, isAdmin, updateOrderStatus); // Update order status (admin only)

module.exports = router;
