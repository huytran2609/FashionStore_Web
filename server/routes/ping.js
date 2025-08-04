const express = require('express');
const router = express.Router();
const { pingBackend } = require('../controllers/pingController');

router.get('/', pingBackend);

module.exports = router;