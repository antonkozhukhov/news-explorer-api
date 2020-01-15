const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticles, postArticle, deleteArticle,
} = require('../controllers/articles');

router.get('', getArticles);
router.post('', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
  }),
}), postArticle);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum(),
  }),
}), deleteArticle);

module.exports = router;
