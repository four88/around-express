const User = require('../models/users');
const { NOT_FOUND_ERROR_CODE, ERROR_OCCURED_CODE, ERROR_OCCURED_MSG } = require('../utils/constant');

// get all the user data
module.exports.getUser = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error('Can not find any user');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      res.status(400).send({ message: `${Object.values(err.errors)}` });
    });
};

// get the user data by id
module.exports.getProfile = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => {
      const error = new Error('Can not find this user id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid user id' });
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else {
        res.status(ERROR_OCCURED_CODE).send({ message: ERROR_OCCURED_MSG });
      }
    });
};

// create user
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)}`,
        });
      } else {
        res.status(ERROR_OCCURED_CODE).send({ message: ERROR_OCCURED_MSG });
      }
    });
};

// edit user profile
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .orFail(() => {
      const error = new Error('Can not find this specific id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.staus(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ messge: 'Invalid user id' });
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else {
        res.status(ERROR_OCCURED_CODE).send({ message: ERROR_OCCURED_MSG });
      }
    });
};

// edit user avatar
module.exports.updateProfileAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .orFail(() => {
      const error = new Error('Can not find this specific id');
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ messge: 'Invalid user id' });
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else {
        res.status(ERROR_OCCURED_CODE).send({ message: ERROR_OCCURED_MSG });
      }
    });
};
