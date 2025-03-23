const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Only admins can access this route
router.get('/all-users', authenticate, authorize(['admin']), userController.getAllUsers);

module.exports = router;
