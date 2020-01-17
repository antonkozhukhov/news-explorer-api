
const Article = require('../models/article');
const ParametersError = require('../middlewares/parameters-error');
const NotFoundError = require('../middlewares/not-found-error');
const NotFoundArticleError = require('../middlewares/not-found-article-error');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((article) => res.send(article))
    .catch(next);
};
const postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      if (!article) {
        throw new ParametersError('ошибка в параметрах');
      } else res.status(201).send(article);
    })
    .catch(next);
};
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id).select('owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('такой статьи нет');
      } else return article;
    })

    .then((article) => {
      if (String(article.owner) === req.user._id) {
        Article.findByIdAndRemove(req.params.id)

          .then((article1) => {
            res.send(article1);
          })
          .catch(() => {
            throw new NotFoundError('такой статьи нет');
          });
      } else throw new NotFoundArticleError('Нельзя удалять чужие статьи');
    })

    .catch(next);
};
module.exports = {
  getArticles, postArticle, deleteArticle,
};
