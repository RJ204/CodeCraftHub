
 // Load environment variables from the .env file
 require('dotenv').config();

 // Import the configured Express application
 const app = require('./app');
 
 // Get the port from environment variables
 // Use port 3000 as the default if PORT is not specified
 const PORT = process.env.PORT || 3000;
 
 // Start the server and listen for incoming requests
 app.listen(PORT, () => {
     // Display a message when the server starts successfully
     console.log(`Server running on port ${PORT}`);
 }); 