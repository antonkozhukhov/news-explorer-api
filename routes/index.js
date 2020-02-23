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


const whitelist = ['https://www.news-explorer.fun', 'https://news-explorer.fun', 'http://www.news-explorer.fun', 'http://news-explorer.fun', 'https://antonkozhukhov.github.io'];
const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
  credentials: true,
};

router.use((req, res, next) => {

  if (whitelist.indexOf(req.headers.origin) !== -1) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-TOKEN, Content-Type, Authorization, Content-Length, X-Requested-With');

    }

  next();
});
router.options('*', cors());
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
