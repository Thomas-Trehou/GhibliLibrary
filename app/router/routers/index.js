const express = require('express');
const filmsRouter = require('./films');
const usersRouter = require('./users');
const mainController = require('../../controllers/mainController');

const router = new express.Router();

router.use('/films', filmsRouter);
router.use('/users', usersRouter);
router.get('/', mainController.renderHomePage);

module.exports = router;
