const avatarConfig = require("../config/avatar.config");
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
    user.image = avatarConfig.genUrl(user.name);
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
          item.password = null
        }
        res.send(data);
      })
  }

  // Find a single Model with an id
  async findOne(req, res) {
    const id = req.params.id;

    let data = await this.Model.findByPk(id, { raw: true })

    if (data.role_id) {
      let role = await db.roles.findByPk(data.role_id);
      data.role = role.role;
      data.role_title = role.role_title;
    }

    res.send(data);
  }

  // Retrieve all Models from the database.
  findRoles(req, res) {
    db.roles.findAll({ raw: true })
      .then(data => {
        res.send(data);
      })
  }


  /**
   * Cấp quyền tài khoản
   * @param {*} req 
   * @param {*} res 
   */
  async approve(req, res) {

    let user_id = req.body.user_id;

    try {
      let sql = `UPDATE users u LEFT JOIN roles r ON r.role = 'resort_owner' SET u.in_request = FALSE, u.role_id = r.role_id WHERE u.user_id = :user_id;`;

      await db.sequelize.query(sql, {
        replacements: { user_id },
      });

      res.send(true);
    } catch (error) {
      res.status(500).send({
        message: "Error updating Model with id=" + id
      });
    }
  }

  /**
   * Hủy bỏ cấp quyền tài khoản
   * @param {*} req 
   * @param {*} res 
   */
  async reject(req, res) {

    let user_id = req.body.user_id;

    try {
      let sql = `UPDATE users u SET u.in_request = FALSE WHERE u.user_id = :user_id;`;

      await db.sequelize.query(sql, {
        replacements: { user_id },
      });

      res.send(true);
    } catch (error) {
      res.status(500).send({
        message: "Error updating Model with id=" + id
      });
    }
  }
}

module.exports = new UserController(UserModel);