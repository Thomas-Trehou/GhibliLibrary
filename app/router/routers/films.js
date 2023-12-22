const express = require('express');
const mainController = require('../../controllers/mainController');

const router = new express.Router();

router.route('/')
  .get(mainController.renderFilmsListPage);

router.route('/:filmDate')
  .get(mainController.renderFilmsByReleaseDatePage);

router.route('/film/:filmID')
  .get(mainController.renderOneFilmPage)
  .post(mainController.bookmarkFavoriteFilm);

module.exports = router;
