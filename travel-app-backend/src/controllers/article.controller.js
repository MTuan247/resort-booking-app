const db = require("../models");
const BaseController = require("./base.controller");
const Model = db.articles;

class ArticleController extends BaseController {
  constructor(model) {
    super(model);
  }
}

module.exports = new ArticleController(Model);