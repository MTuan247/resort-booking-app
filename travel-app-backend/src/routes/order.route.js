
module.exports = app => {
  const orders = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Retrieve all orders
  router.post("/", orders.findAll.bind(orders));
  router.post("/resorts", orders.getResortOrder.bind(orders));
  router.get("/", orders.findAll.bind(orders));

  // Retrieve a single order with id
  router.get("/:id", orders.findOne.bind(orders));

  app.use('/api/orders', router);
};