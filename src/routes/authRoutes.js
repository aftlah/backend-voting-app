// routes/voterRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route untuk otentikasi pemilih
router.post('/', authController.authenticate);

module.exports = router;
