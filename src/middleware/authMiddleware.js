
const jwt = require('jsonwebtoken');

// Define middleware to authenticate requests using a JWT
const authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header
    // Expected format: Bearer <token>
    const token = req.header('Authorization')?.split(' ')[1];

    // Reject the request if no token is provided
    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    try {
        // Verify the token using the secret key
        // stored in the JWT_SECRET environment variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request
        // so that subsequent middleware and controllers can access it
        req.user = decoded;

        // Pass control to the next middleware or route handler
        next();
    } catch (error) {
        // Reject the request if the token is invalid or expired
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};

// Export the middleware for use in protected routes
module.exports = authMiddleware;