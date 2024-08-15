// controllers/shopController.js
const Shop = require('../models/Shop');
const debug = require('debug')('app:shopController');

// Create a new shop
exports.createShop = async (req, res) => {
    const { name, description, billboardImage } = req.body;

    try {
        const shop = new Shop({
            name,
            description,
            billboardImage,
            createdBy: req.user.id,
        });

        await shop.save();
        debug('Shop created successfully');
        res.status(201).json(shop);
    } catch (err) {
        debug('Error creating shop:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get all shops
exports.getShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate('products');
        res.status(200).json(shops);
    } catch (err) {
        debug('Error fetching shops:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get a single shop by ID
exports.getShopById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id).populate('products');
        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }
        res.status(200).json(shop);
    } catch (err) {
        debug('Error fetching shop:', err.message);
        res.status(500).send('Server Error');
    }
};

// Update a shop
exports.updateShop = async (req, res) => {
    const { name, description, billboardImage } = req.body;

    try {
        let shop = await Shop.findById(req.params.id);
        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }

        shop.name = name || shop.name;
        shop.description = description || shop.description;
        shop.billboardImage = billboardImage || shop.billboardImage;

        await shop.save();
        debug('Shop updated successfully');
        res.status(200).json(shop);
    } catch (err) {
        debug('Error updating shop:', err.message);
        res.status(500).send('Server Error');
    }
};

// Delete a shop
exports.deleteShop = async (req, res) => {
    try {
        let shop = await Shop.findById(req.params.id);
        if (!shop) {
            return res.status(404).json({ msg: 'Shop not found' });
        }

        await shop.remove();
        debug('Shop deleted successfully');
        res.status(200).json({ msg: 'Shop removed' });
    } catch (err) {
        debug('Error deleting shop:', err.message);
        res.status(500).send('Server Error');
    }
};
