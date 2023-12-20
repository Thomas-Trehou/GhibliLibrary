const express = require('express');
const userController = require('../../controllers/userController');
const sessionController = require('../../controllers/sessionController');
const createUserSchema = require('../../validation/schemas/user');
const loginSchema = require('../../validation/schemas/login');
const validate = require('../../validation');

const router = new express.Router();

router.get('/register', userController.registerPage);
router.post('/register', validate([
  { schema: createUserSchema, source: 'body' },
]), userController.register);

router.get('/login', sessionController.loginPage);
router.post('/login', validate([
  { schema: loginSchema, source: 'body' },
]), sessionController.login);
router.get('/logout', sessionController.logout);

router.get('/profile', sessionController.profilePage);

module.exports = router;
