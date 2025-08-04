// controllers/pingController.js
const asyncHandler = require('express-async-handler');

const pingBackend = asyncHandler(async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Pong from backend - still alive!',
    });
});

module.exports = {
    pingBackend,
};