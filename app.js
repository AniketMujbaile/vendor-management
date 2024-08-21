const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
 
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

// Routes
app.use('/vendors', require('./routes/vendor.routes'));
app.use('/purchase-orders', require('./routes/purchaseOrder.routes'));
app.use('/performance', require('./routes/performance.routes'));

module.exports = app;