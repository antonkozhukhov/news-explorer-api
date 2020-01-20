const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const articles = require('./articles');
const users = require('./users');
const auth = require('../middlewares/auth');
const { createUser, findEmail } = require('../controllers/users');
const { login } = require('../controllers/login');
const NotFoundError = require('../errors/not-found-error');

router.use('/articles', auth, articles);
router.use('/users', auth, users);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), findEmail, createUser);
router.use('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
module.exports = router;
