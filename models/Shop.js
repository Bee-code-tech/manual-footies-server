// models/Shop.js
const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    billboardImage: { type: String, required: true }, // URL to the billboard image
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Reference to products
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
