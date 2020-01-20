/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { localKey } = require('../config');
console.log (localKey);
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  const { NODE_ENV, JWT_SECRET } = process.env;
  const key = NODE_ENV === 'production' ? JWT_SECRET : localKey;
  console.log (key);
  let payload;
  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
