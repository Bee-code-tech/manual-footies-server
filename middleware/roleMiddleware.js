// middleware/roleMiddleware.js

// Middleware to check if user is an admin
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
};
