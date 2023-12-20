const express = require('express');
const appRouter = require('./routers');
const middlewares = require('../../middlewares/middlewares');
const mainController = require('../controllers/mainController');

const router = new express.Router();

router.use('/app', appRouter);

router.get('/', mainController.redirectHomePage);

router.use(middlewares.middleware404);

module.exports = router;
