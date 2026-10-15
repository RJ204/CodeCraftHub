const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to the database
connectDB();

// Define routes
app.use('/api/users', userRoutes); // Prefix with /api/users

app.get('/', (req, res) => {
    res.send('Welcome to the User Management Service');
});

module.exports = app;