
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
    try {
        // Establish a connection using the database URI
        // stored in the DB_URI environment variable
        await mongoose.connect(process.env.DB_URI);

        // Display a success message when the connection is established
        console.log('MongoDB connected');
    } catch (error) {
        // Log the error if the database connection fails
        console.error('MongoDB connection error:', error);

        // Terminate the application with a failure status
        process.exit(1);
    }
};

// Export the function so it can be used in other files
module.exports = connectDB;