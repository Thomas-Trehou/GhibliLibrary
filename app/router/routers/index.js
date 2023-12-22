const express = require('express');
const filmsRouter = require('./films');
const usersRouter = require('./users');
const mainController = require('../../controllers/mainController');

const router = express.Router();

router.use('/films', filmsRouter);
router.use('/users', usersRouter);
router.route('/')
  .get(mainController.renderHomePage);

module.exports = router;
