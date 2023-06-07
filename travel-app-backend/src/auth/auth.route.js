module.exports = app => {
  const authController = require('./auth.controller');

  var router = require("express").Router();

  router.post('/register', authController.register.bind(authController));

  router.post('/login', authController.login.bind(authController));

  app.use('/auth', router);
};