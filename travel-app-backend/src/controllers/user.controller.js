const db = require("../models");
const BaseController = require("./base.controller");
const UserModel = db.users;

class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Lấy dữ liệu người dùng
  async getUser(condition) {
    let users = await this.Model.findAll({ where: condition, raw: true });
    if (users && users.length) {
      let user = users[0];
      if (user.role_id) {
        let role = await db.roles.findOne({
          where: {
            role_id: user.role_id
          }
        });
        user.role = role.role;
        user.role_title = role.role_title;
      }
      return user;
    }
    return null;
  }

  // Tạo tài khoản mới
  async createUser(user) {
    let role = await db.roles.findOne({
      where: {
        role: 'user'
      }
    });
    if (role) {
      user.role_id = role.role_id;
      user.role = role.role;
    }
    return await this.insert(user)
  }

  // Retrieve all Models from the database.
  findAll(req, res) {
    var condition = req.body.Condition;

    this.Model.findAll({ raw: true, where: condition, include: [{ model: db.roles, required: false }] })
      .then(data => {
        for (let item of data) {
          item.role = item['role.role']
          item.role_title = item['role.role_title']
        }
        res.send(data);
      })
  }
}

module.exports = new UserController(UserModel);