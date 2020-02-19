const router = require('express').Router();
const cors = require('cors');
const { celebrate, Joi } = require('celebrate');
const articles = require('./articles');
const users = require('./users');
const auth = require('../middlewares/auth');
const { createUser, findEmail } = require('../controllers/users');
const { login } = require('../controllers/login');
const NotFoundError = require('../errors/not-found-error');
const { resourceNotFoundMessage } = require('../messages');

const corsOptions = {
  origin: 'https://www.news-explorer.fun',
  optionsSuccessStatus: 200,
  credentials: true,
};

router.options('*', cors());
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://www.news-explorer.fun');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
router.use('/articles', auth, articles);
router.use('/users', auth, users);
router.post('/signin', cors(corsOptions), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', cors(corsOptions), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), findEmail, createUser);
router.use('/*', () => {
  throw new NotFoundError(resourceNotFoundMessage);
});
module.exports = router;
