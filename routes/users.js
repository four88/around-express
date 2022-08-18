const path = require('path');
const router = require('express').Router();
const getDataFromFile = require('../helper/readFile');

const usersPath = path.join(__dirname, '../data/users.json');

// set controller
// for get al users data
const getUsers = (req, res) => {
  getDataFromFile(usersPath)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
};

// for get specific users by _id
const getProfile = (req, res) => {
  getDataFromFile(usersPath)
    .then((users) => users.find((user) => user._id === req.params._id))
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User ID not found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err));
};

// assign routes
router.get('/users', getUsers);
router.get('/users/:_id', getProfile);

module.exports = router;
