const db = require("../models");
const BaseController = require("./base.controller");
const OrderModel = db.orders;
const { Op } = require("sequelize");

class OrderController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve all Models from the database.
  async findAll(req, res) {
    var from_date = req.body.from_date || null;
    var to_date = req.body.to_date || null;
    let context = req.context;

    if (!context?.user_id) {
      res.status(401).send([]);
      return;
    }

    try {
      let sql = `SELECT
      o.order_id,
      o.user_id,
      o.resort_id,
      o.from_date,
      o.to_date,
      o.status,
      o.createdAt,
      o.updatedAt,
      r.title,
      r.description,
      r.createdAt,
      r.updatedAt,
      r.from_cost,
      r.to_cost,
      r.parent_id,
      r.parent_name,
      r.email,
      r.phone,
      r.image,
      r.location,
      r.address,
      r.type,
      r.min_people,
      r.max_people,
      r.user_id AS owner_user_id,
      r.quantity,
      u.user_name,
      u.password,
      u.createdAt,
      u.updatedAt,
      u.role_id,
      u.name,
      u.email,
      u.tel
    FROM orders o
      LEFT JOIN resorts r
        ON o.resort_id = r.resort_id
      LEFT JOIN users u
        ON o.user_id = u.user_id
    WHERE (o.from_date <= :to_date OR :to_date IS NULL) AND (o.to_date >= :from_date OR :from_date IS NULL) AND (r.user_id = :user_id);`;

      let data = await db.sequelize.query(sql, {
        replacements: { from_date, to_date, user_id: context.user_id },
        type: db.sequelize.QueryTypes.SELECT
      });
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Models."
      });
    }
  }

  /**
   * Lấy đơn đặt phòng theo phòng
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async getResortOrder(req, res) {
    let context = req.context;

    if (!context?.user_id) {
      res.status(401).send([]);
      return;
    }

    var date = req.body.date || null;
    var user_id = context.user_id;

    try {
      let resorts = await db.resorts.findAll({
        where: {
          user_id: user_id
        },
        raw: true
      });

      for (const resort of resorts) {
        // let orders = await db.orders.findAll({
        //   where: {
        //     resort_id: resort.resort_id,
        //     from_date: {
        //       [Op.lte]: date,
        //     },
        //     to_date: {
        //       [Op.gte]: date,
        //     }
        //   }
        // });

        let sql = `SELECT * FROM orders o WHERE o.from_date <= :date AND o.to_date >= :date AND o.resort_id = :resort_id;`

        let orders = await db.sequelize.query(sql, {
          replacements: { date, resort_id: resort.resort_id },
          type: db.sequelize.QueryTypes.SELECT
        })

        resort.is_full = resort.quantity <= orders.length;
        resort.number_of_orders = orders.length;
        resort.orders = orders;
      }

      res.send(resorts);

      // let sql = ``;

      // let data = await db.sequelize.query(sql, {
      //   replacements: { date  },
      //   type: db.sequelize.QueryTypes.SELECT
      // });
      // res.send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Models."
      });
    }
  }

  /**
   * Kiểm tra tình trạng phòng
   * @param {*} req 
   * @param {*} res 
   */
  async checkRoomStatus(req, res) {

    var from_date = req.body.from_date;
    var to_date = req.body.to_date;
    var resort_id = req.body.resort_id;

    try {

      let sql = `SELECT * FROM orders o WHERE o.from_date <= :to_date AND o.to_date >= :from_date AND o.resort_id = :resort_id;`

      let orders = await db.sequelize.query(sql, {
        replacements: { from_date: from_date, to_date: to_date, resort_id: resort_id },
        type: db.sequelize.QueryTypes.SELECT
      });

      let resort = await db.resorts.findByPk(resort_id, {raw: true});
      
      let data = {
        resort_id: resort_id,
        title: resort.title,
        quantity: resort.quantity,
      }

      if (resort?.quantity > orders.length) {
        data.is_full = false;
        data.rest_quantity = resort?.quantity - orders.length;
      } else {
        data.is_full = true;
        data.rest_quantity = 0;
        data.from_date = Math.max(...orders.map(x => new Date(x.from_date)), new Date(from_date));
        data.to_date = Math.min(...orders.map(x => new Date(x.to_date)), new Date(to_date));
      }

      res.send(data);
      
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Models."
      });
    }
  }

}

module.exports = new OrderController(OrderModel);