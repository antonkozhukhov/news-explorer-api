
const Article = require('../models/article');
const ParametersError = require('../errors/parameters-error');
const NotFoundError = require('../errors/not-found-error');
const NotFoundArticleError = require('../errors/not-found-article-error');
const {
  parametersErrorMessage,
  notFoundArticleMessage,
  deleteArticleMessage,
  deleteNotYourArticleMessage,
} = require('../messages');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((article) => res.send(article))
    .catch(next);
};
const getMyArticles = (req, res, next) => {
  Article.find({ owner: req.user._id }).select('owner')
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
        throw new ParametersError(parametersErrorMessage);
      } else res.status(201).send(article._id);
    })
    .catch(next);
};
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id).select('owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(notFoundArticleMessage);
      } else return article;
    })

    .then((article) => {
      if (String(article.owner) === req.user._id) {
        Article.findByIdAndRemove(req.params.id)

          .then(() => {
            res.send({ message: deleteArticleMessage });
          })
          .catch(() => {
            throw new NotFoundError(notFoundArticleMessage);
          });
      } else throw new NotFoundArticleError(deleteNotYourArticleMessage);
    })

    .catch(next);
};
module.exports = {
  getArticles, postArticle, deleteArticle, getMyArticles,
};
