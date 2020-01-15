const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const articles = require('./articles');
const users = require('./users');
const auth = require('../middlewares/auth');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');

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
}), createUser);
router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден1' });
});
module.exports = router;
