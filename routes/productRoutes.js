// routes/productRoutes.js
const express = require('express');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAdmin } = require('../middleware/roleMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router({ mergeParams: true }); // Merge params to access shopId in controller

router.post('/', verifyToken, isAdmin, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;
