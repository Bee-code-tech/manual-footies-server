const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Root route to check if server is working
app.get('/', (req, res) => {
    res.send('E-Commerce Backend Server is running!');
});

// Routes
const authRoutes = require('./routes/authRoute');
const shopRoutes = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/shops', shopRoutes);
app.use('/api/v1/shops/:shopId/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products/:productId/reviews', reviewRoutes);
app.use('/api/v1/orders', orderRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
