/* eslint-disable no-unused-vars */

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ParametersError = require('../middlewares/parameters-error');
const NotFoundError = require('../middlewares/not-found-error');

const findUser = (req, res, next) => {
  const { name, email } = req.body;
  User.find({ name, email })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('такого пользователя нет');
      } else res.send(user);
    })
    .catch(next);
};
const createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (password) {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then((user) => {
        if (!user) {
          throw new ParametersError('ошибка в параметрах');
        } else res.status(201).send(user);
      })
      .catch(next);
  } else throw new ParametersError('ошибка в параметрах');
};

module.exports = {
  findUser, createUser,
};
