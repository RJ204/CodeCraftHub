const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create and configure the Express application
const createServer = () => {
    const app = express();

    // Enable Cross-Origin Resource Sharing (CORS)
    // to allow requests from different origins
    app.use(cors());

    // Parse incoming JSON request bodies
    // and make the data available through req.body
    app.use(bodyParser.json());

    // Return the configured Express application
    return app;
};

// Export the function so it can be used in other files
module.exports = createServer;