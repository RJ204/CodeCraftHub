
const mongoose = require('mongoose');

// Define the schema for user documents in MongoDB
const userSchema = new mongoose.Schema({
    // Store the username as a required and unique string
    username: {
        type: String,
        required: true,
        unique: true,
    },

    // Store the email as a required and unique string
    // Convert the email to lowercase before storing it
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    // Store the user's password as a required string
    // The password must contain at least 6 characters
    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    // Record the date and time when the user is created
    // Use the current date and time as the default value
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create a Mongoose model named 'User' based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other application files
module.exports = User;