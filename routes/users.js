const router = require('express').Router();

const { getUser, createUser, getProfile } = require('../controllers/users.js')

// assign routes
router.get('/', getUser);
router.get('/:_id', getProfile);
router.post('/', createUser);
// router.patch('/users/me', updateProfile);
// router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
