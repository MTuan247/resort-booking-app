
module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create.bind(users));

  // Retrieve all users
  router.get("/", users.findAll.bind(users));
  router.get("/role", users.findRoles.bind(users));

  // Retrieve a single user with id
  router.get("/:id", users.findOne.bind(users));

  // Update a user with id
  router.put("/", users.update.bind(users));

  // Delete a user with id
  router.post("/delete", users.delete.bind(users));

  app.use('/api/users', router);
};