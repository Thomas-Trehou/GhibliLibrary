const express = require('express');
const userController = require('../../controllers/userController');
const sessionController = require('../../controllers/sessionController');
const createUserSchema = require('../../validation/schemas/user');
const loginSchema = require('../../validation/schemas/login');
const validate = require('../../validation');

const router = new express.Router();

router.route('/register')
  .get(userController.registerPage)
  .post(validate([
    { schema: createUserSchema, source: 'body' },
  ]), userController.register);

router.route('/login')
  .get(sessionController.loginPage)
  .post(validate([
    { schema: loginSchema, source: 'body' },
  ]), sessionController.login);

router.route('/logout')
  .get(sessionController.logout);

router.route('/profile')
  .get(sessionController.profilePage);

module.exports = router;
