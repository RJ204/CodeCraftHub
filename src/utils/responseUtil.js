// You can implement additional utility functions here for consistent API responses
const createResponse = (status, message, data = null) => ({
    status,
    message,
    data,
});

module.exports = { createResponse };