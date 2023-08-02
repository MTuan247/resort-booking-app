module.exports = app => {
  const paymentController = require("./payment.controller.js");

  var router = require("express").Router();

  router.post("/createPaymentUrl", paymentController.createPaymentUrl.bind(paymentController));
  router.get("/callback", paymentController.callback.bind(paymentController));

  app.use('/api/payment', router);
};