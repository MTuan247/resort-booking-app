
module.exports = app => {
  const resorts = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new resort
  router.post("/", resorts.create.bind(resorts));

  // Retrieve all resorts
  router.get("/", resorts.findAll.bind(resorts));

  // Retrieve a single resort with id
  router.get("/:id", resorts.findOne.bind(resorts));

  // Update a resort with id
  router.put("/", resorts.update.bind(resorts));

  // Delete a resort with id
  router.post("/delete", resorts.delete.bind(resorts));

  app.use('/api/users', router);
};