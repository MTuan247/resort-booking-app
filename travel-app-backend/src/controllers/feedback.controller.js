const { Op } = require("sequelize");
const db = require("../models");
const BaseController = require("./base.controller");
const Model = db.comments;

class FeedbackController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Lấy thông tin feed back của resort
  async getFeedbacks(req, res) {
    var resort_id = req.body.resort_id;
    var limit = req.body.limit;
    var offset = req.body.offset;

    try {
      let data = await this.getFeedbackInfo(resort_id, limit, offset)
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Models."
      });
    }
  }

  // Retrieve all Models from the database.
  async loadComments(req, res) {
    var resort_id = req.body.resort_id;
    var limit = req.body.limit;
    var offset = req.body.offset;

    let data = await this.Model.findAll({ 
      where: {
        resort_id: resort_id,
      }, 
      include: [{model: db.users, attributes: ['name', 'user_id', 'avatar']}],
      order: [
        ['created_date', 'DESC']
      ], 
      limit, 
      offset 
    });

    res.send(data);
  }

  // Retrieve all Models from the database.
  async getCommentsPaging(req, res, next) {
    try {
      var resort_id = req.body.resort_id;
      var from_date = req.body.from_date;
      var to_date = req.body.to_date;
      var limit = req.body.limit;
      var offset = req.body.offset;

      let queryConfig = {
        where: {
          resort_id: resort_id,
        }, 
        order: [
          ['created_date', 'DESC']
        ]
      }

      if (from_date && to_date) {
        queryConfig.where.created_date = {
          [Op.between]: [from_date, to_date]
        }
      }

      let comments = await this.Model.findAll({ 
        ...queryConfig,
        include: [{model: db.users, attributes: ['name', 'user_id', 'avatar']}],
        limit, 
        offset 
      });

      let paging = await db.comments.findOne({
        ...queryConfig,
        order: undefined,
        raw: true,
        attributes: [
          [db.sequelize.fn('COUNT', db.sequelize.col('comment_id')), 'total_record']
        ],
        group: ['resort_id'],
      });

      let data = {
        comments: comments,
        total_record: paging?.total_record || 0,
        total_pages: Math.ceil((paging?.total_record || 0) / limit)
      }

      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  // Create and Save a new Model
  create(req, res) {

    req.body.Model.user_id = req.context.user_id;

    super.create(req, res);
  }

  async getFeedbackInfo(resort_id, limit, offset) {
    let data = {}
      let comments = await this.Model.findAll({
        where: {
          resort_id: resort_id,
        },
        include: [{model: db.users, attributes: ['name', 'user_id', 'avatar']}],
        order: [
          ['created_date', 'DESC']
        ],
        limit,
        offset
      });

      let info = await db.comments.findOne({
        raw: true,
        where: {
          resort_id: resort_id
        },
        attributes: [
          [db.sequelize.fn('AVG', db.sequelize.col('score')), 'rate'],
          [db.sequelize.fn('COUNT', db.sequelize.col('comment_id')), 'summary']
        ],
        group: ['resort_id'],
      })

      let rates = await db.comments.findAll({
        raw: true,
        where: {
          resort_id: resort_id
        },
        attributes: [
          'score',
          [db.sequelize.fn('COUNT', db.sequelize.col('score')), 'value']
        ],
        group: ['resort_id', 'score'],
        order: [
          ['score', 'DESC']
        ]
      })

      data.comments = comments;
      data.rate = info.rate;
      data.summary = info.summary;
      data.rates = [
      ];
      
      for (let index = 5; index > 0; index--) {
        data.rates.push({
          score: index,
          value: rates.find(x => x.score == index)?.value || 0,
        })
      }
      return data;
  }

}

module.exports = new FeedbackController(Model);