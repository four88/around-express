const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    reqired: [true, 'The "name" field must ve filled in'],
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },

  about: {
    type: String,
    required: [true, 'The "about" field must be filled in'],
    minlength: [2, 'The minimum length of about is 2'],
    maxlength: [30, 'The maximum length of about is 30'],
  },

  avatar: {
    type: String,
    required: [true, 'The "link" filed must be filled in'],
    validate: {
      validator(v) {
        return /^(http|https):\/\/(www\.)?[a-z0-9\-/.]+/gi.test(v);
      },
      message: 'The avatar link should be an URL link',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
