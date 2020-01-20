require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/auth-error');
const localKey = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const key = NODE_ENV === 'production' ? JWT_SECRET : localKey;
  return User.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        key,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });
      res.send(token);
    })
    .catch(() => {
      throw new AuthError('Неправильный email и/или пароль');
    })
    .catch(next);
};
