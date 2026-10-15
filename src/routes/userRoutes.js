
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new Express router to define user-related routes
const router = express.Router();

// Route for registering a new user
// Calls the registerUser controller function
router.post('/register', userController.registerUser);

// Route for logging in an existing user
// Calls the loginUser controller function
router.post('/login', userController.loginUser);

// Protected route for retrieving the user's profile
// The authentication middleware verifies the JWT before the controller runs
router.get('/profile', authMiddleware, userController.getUserProfile);

// Export the router so it can be mounted in the main Express application
module.exports = router;