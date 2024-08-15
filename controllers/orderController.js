// controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const debug = require('debug')('app:orderController');

// Create a new order
exports.createOrder = async (req, res) => {
    const { products } = req.body;

    try {
        // Calculate total price
        let totalPrice = 0;
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ msg: `Product not found: ${item.product}` });
            }
            totalPrice += product.price * item.quantity;
        }

        // Create the order
        const order = new Order({
            user: req.user.id,
            products,
            totalPrice
        });

        await order.save();
        debug('Order created successfully');
        res.status(201).json(order);
    } catch (err) {
        debug('Error creating order:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get all orders for the authenticated user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product', 'name price');
        res.status(200).json(orders);
    } catch (err) {
        debug('Error fetching user orders:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get all orders for admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'username email').populate('products.product', 'name price');
        res.status(200).json(orders);
    } catch (err) {
        debug('Error fetching all orders:', err.message);
        res.status(500).send('Server Error');
    }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    try {
        let order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        order.status = status || order.status;
        if (status === 'completed') {
            order.completedAt = Date.now();
        }

        await order.save();
        debug('Order status updated successfully');
        res.status(200).json(order);
    } catch (err) {
        debug('Error updating order status:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'username email').populate('products.product', 'name price');
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        debug('Error fetching order by ID:', err.message);
        res.status(500).send('Server Error');
    }
};
