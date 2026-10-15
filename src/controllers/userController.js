
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        // Extract username, email, and password from the request body
        const { username, email, password } = req.body;

        // Validate that all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Username, email and password are required'
            });
        }

        // Check whether a user with the given email already exists
        const existingUser = await User.findOne({ email });

        // Return an error if the email is already registered
        if (existingUser) {
            return res.status(400).json({
                message: 'Email already in use'
            });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document with the provided details
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user document to MongoDB
        await newUser.save();

        // Return a success response after registration
        return res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        // Log the registration error for debugging
        console.error('Registration error:', error);

        // Return a server error response
        return res.status(500).json({
            message: 'Server error'
        });
    }
};

// Authenticate an existing user and generate a JWT
exports.loginUser = async (req, res) => {
    try {
        // Extract the email and password from the request body
        const { email, password } = req.body;

        // Find the user associated with the provided email
        const user = await User.findOne({ email });

        // Verify that the user exists and the password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Generate a JSON Web Token containing the user's ID
        // Set the token to expire after one hour
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return the token and user ID after successful login
        return res.status(200).json({
            token,
            userId: user._id
        });
    } catch (error) {
        // Log the login error for debugging
        console.error('Login error:', error);

        // Return a server error response
        return res.status(500).json({
            message: 'Server error'
        });
    }
};

// Retrieve the profile of the authenticated user
exports.getUserProfile = async (req, res) => {
    try {
        // Find the user using the ID attached by the authentication middleware
        const user = await User.findById(req.user.id);

        // Return an error if the user does not exist
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Return the user's profile information
        // Do not include the password in the response
        return res.json({
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (error) {
        // Log the profile retrieval error for debugging
        console.error('Profile error:', error);

        // Return a server error response
        return res.status(500).json({
            message: 'Server error'
        });
    }
};