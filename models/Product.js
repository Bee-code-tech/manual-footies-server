// models/Product.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
    user: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
         },
    rating: {
         type: Number,
          required: true,
           min: 1,
            max: 5 
        },
    comment: { 
        type: String,
         required: true 
        },
    profilePicture: {
         type: String
         }, // User's profile picture 
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true 
        },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number,
         required: true
         },
    quantity: {
         type: Number, 
         required: true 
        },
    category: { 
        type: String, 
        required: true
     },
    shop: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shop', 
        required: true },
    reviews: 
    [reviewSchema],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
