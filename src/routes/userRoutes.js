const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', userController.registerUser);

// Log in a user
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;