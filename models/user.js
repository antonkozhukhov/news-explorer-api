/* eslint-disable func-names */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const { incorrectEmailOrParolMessage } = require('../messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(incorrectEmailOrParolMessage));
      } return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(incorrectEmailOrParolMessage));
          }

          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
