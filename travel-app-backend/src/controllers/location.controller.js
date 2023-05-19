const db = require("../models");
const BaseController = require("./base.controller");
const LocationModel = db.locations;
const { Op } = require("sequelize");

class LocationController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve Models from the database.
  search(req, res) {
    var location_name = req.body.location_name;

    this.Model.findAll({ where: {
      location_name: {
        [Op.like]: `%${location_name || ''}%`,
      }
    } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Models."
      });
    });
  }
}

module.exports = new LocationController(LocationModel);