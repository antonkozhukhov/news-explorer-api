const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ParametersError = require('../errors/parameters-error');
const NotFoundError = require('../errors/not-found-error');
const {
  parametersErrorMessage,
  createUserMessage,
  userIsJustCrearedMessage,
} = require('../messages');

const findUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(parametersErrorMessage);
      } else res.send(user);
    })
    .catch(next);
};
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        throw new ParametersError(parametersErrorMessage);
      } else res.status(201).send({ message: createUserMessage });
    })
    .catch(next);
};
const findEmail = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ParametersError(userIsJustCrearedMessage);
      } else next();
    })
    .catch(next);
};
module.exports = {
  findUser, createUser, findEmail,
};
