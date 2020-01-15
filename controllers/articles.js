
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
  Article.create({
    keyword, title, text, date, source, link, image,
  })
    .then((article) => {
      if (!article) {
        throw new ParametersError('ошибка в параметрах');
      } else res.status(201).send(article);
    })
    .catch(next);
};
const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article.owner === req.user._id) {
        Article.findByIdAndRemove(req.params.id)
          .then((article1) => {
            if (!article1) {
              throw new NotFoundError('такой статьи нет');
            } else res.send(article);
          })
          .catch(next);
      } else throw new NotFoundArticleError('Нельзя удалять чужие статьи');
    })
    .catch(next);
};


module.exports = {
  getArticles, postArticle, deleteArticle,
};
