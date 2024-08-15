// controllers/productController.js
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const debug = require('debug')('app:productController');

// Create a new product
exports.createProduct = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;

    try {
        const shop = await Shop.findById(req.params.shopId);
        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }

        const product = new Product({
            name,
            description,
            price,
            quantity,
            category,
            shop: shop._id,
        });

        await product.save();

        // Add the product to the shop's product list
        shop.products.push(product._id);
        await shop.save();

        debug('Product created successfully');
        res.status(201).json(product);
    } catch (err) {
        debug('Error creating product:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ shop: req.params.shopId });
        res.status(200).json(products);
    } catch (err) {
        debug('Error fetching products:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        debug('Error fetching product:', err.message);
        res.status(500).send('Server Error');
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;

    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.category = category || product.category;

        await product.save();
        debug('Product updated successfully');
        res.status(200).json(product);
    } catch (err) {
        debug('Error updating product:', err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.remove();
        debug('Product deleted successfully');
        res.status(200).json({ msg: 'Product removed' });
    } catch (err) {
        debug('Error deleting product:', err.message);
        res.status(500).send('Server Error');
    }
};
