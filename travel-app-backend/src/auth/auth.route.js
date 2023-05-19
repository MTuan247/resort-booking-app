module.exports = app => {
  const authController = require('./auth.controller');

  var router = require("express").Router();

  router.post('/register', authController.register);

  router.post('/login', authController.login);

  app.use('/auth', router);
};