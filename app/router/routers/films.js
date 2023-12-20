const express = require('express');
const mainController = require('../../controllers/mainController');

const router = new express.Router();

router.get('/', mainController.renderFilmsListPage);

router.get('/:filmDate', mainController.renderFilmsByReleaseDatePage);

router.get('/film/:filmID', mainController.renderOneFilmPage);
router.post('/film/:filmID', mainController.addBookmark);

module.exports = router;
