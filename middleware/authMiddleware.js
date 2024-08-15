// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const debug = require('debug')('app:authMiddleware');

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        // Fetch the user details and add to the request object
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(401).json({ msg: 'User not found, authorization denied' });
        }
        req.user = user;

        next();
    } catch (err) {
        debug('Token verification failed:', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
