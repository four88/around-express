const router = require('express').Router();

const {
  getUser, createUser, getProfile, updateProfile, updateProfileAvatar,
} = require('../controllers/users');

// assign routes
router.get('/', getUser);
router.get('/:_id', getProfile);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateProfileAvatar);

module.exports = router;
