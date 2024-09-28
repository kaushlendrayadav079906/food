const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); // Ensure this path is correct

// Define routes
router.post('/signup', authController.signup);  // Ensure the correct function is referenced
router.post('/signin', authController.signin);  // Ensure the correct function is referenced

module.exports = router;
