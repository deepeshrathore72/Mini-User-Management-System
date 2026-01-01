const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getCurrentUser,
  logout,
} = require('../controllers/authController');
const {
  signupValidation,
  loginValidation,
  validate,
} = require('../utils/validators');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.post('/logout', protect, logout);

module.exports = router;
