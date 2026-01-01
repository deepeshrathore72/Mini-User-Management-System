const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  activateUser,
  deactivateUser,
} = require('../controllers/adminController');
const { protect, restrictTo } = require('../middleware/auth');

// All routes are protected and restricted to admin
router.use(protect, restrictTo('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id/activate', activateUser);
router.put('/users/:id/deactivate', deactivateUser);

module.exports = router;
