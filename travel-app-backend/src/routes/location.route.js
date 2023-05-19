module.exports = app => {
  const locations = require("../controllers/location.controller.js");

  var router = require("express").Router();

  // Create a new location
  router.post("/", locations.create.bind(locations));

  // Retrieve all locations
  router.get("/", locations.findAll.bind(locations));
  router.post("/list", locations.findAll.bind(locations));
  router.post("/search", locations.search.bind(locations));

  // Retrieve a single location with id
  router.get("/:id", locations.findOne.bind(locations));

  // Update a location with id
  router.put("/", locations.update.bind(locations));

  // Delete a location with id
  router.post("/delete", locations.delete.bind(locations));

  app.use('/api/locations', router);
};