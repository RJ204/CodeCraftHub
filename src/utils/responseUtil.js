
// Define a utility function to create a consistent API response object
// Accept the HTTP status, response message, and optional data
const createResponse = (status, message, data = null) => ({
    // Store the response status
    status,

    // Store a message describing the result of the request
    message,

    // Include the response data, or null if no data is provided
    data,
});

// Export the utility function so it can be reused in other files
module.exports = { createResponse };