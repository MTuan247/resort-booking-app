const db = require("../models");
const BaseController = require("./base.controller");
const UserModel = db.users;

class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getUser(condition) {
    let users = await this.Model.findAll({ where: condition });
    if (users && users.length) {
      return users[0];
    }
    return null;
  }

  async createUser(user) {
    return await this.insert(user)
  }
}

module.exports = new UserController(UserModel);