
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Create an Express application instance
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
// to allow requests from different origins
app.use(cors());

// Parse incoming JSON request bodies
// and make the parsed data available through req.body
app.use(express.json());

// Establish a connection to the MongoDB database
connectDB();

// Register user-related routes with the /api/users prefix
// Example: POST /api/users/register
app.use('/api/users', userRoutes);

// Define a root route to confirm that the service is running
app.get('/', (req, res) => {
    // Send a welcome message as the response
    res.send('Welcome to the User Management Service');
});

// Export the Express application for use by the server entry point or tests
module.exports = app;