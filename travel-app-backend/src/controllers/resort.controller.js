const db = require("../models");
const BaseController = require("./base.controller");
const articleController = require("./article.controller");
const { getImageLink } = require('../services/storage.service')
const ResortModel = db.resorts;
const ArticleModel = db.articles;
const ImageModel = db.images;
const ModelState = require('../resources/ModelState');
const { Op } = require("sequelize");

class ResortController extends BaseController {
  constructor(model) {
    super(model);
    this.ArticleModel = ArticleModel;
    this.ImageModel = ImageModel;
  }

  // Find a single Model with an id
  async findOne(req, res) {
    const id = req.params.id;
    let context = req.context;

    try {
      // Lấy dữ liệu resort
      let master = await this.Model.findByPk(id);
      let details = await this.Model.findAll({
        where: {
          parent_id: id
        }
      });

      // Lấy dữ liệu các danh mục
      let articles = await this.ArticleModel.findAll({
        where: {
          resort_id: id
        }
      });

      // Mỗi danh mục lấy dữ liệu ảnh
      for (const article of articles) {
        let images = await ImageModel.findAll({
          where: {
            article_id: article.article_id
          }
        });
        article.dataValues.images = images;
      }
      
      let masterData = master.dataValues;

      if (context?.user_id) {
        let favourite = await db.favourites.findOne({
          where: {
            user_id: context.user_id,
            resort_id: masterData.resort_id
          }
        });
        if (favourite) {
          masterData.liked = true;
        }
      }

      masterData.articles = articles;
      masterData.details = details;

      res.send(masterData);

    } catch (error) {
      res.status(500).send({
        message: error || "Some error occurred while retrieving Models."
      });
    }

  }

  // Create and Save a new Model
  async create(req, res) {
    try {
      // Create a Model
      const model = {
        ...req.body.Model
      };

      let images = []
      for (const item of model.articles) {
        images = images.concat(item.images.map(x => {
          return {
            ...x,
            article_id: item.article_id,
            resort_id: model.resort_id,
            src: getImageLink(x.file_name, model.resort_id)
          }
        }));
      }

      let data = await this.insert(model, {
        include: [this.ArticleModel]
      });

      images.length > 0 && await ImageModel.bulkCreate(images);

      res.send(data);

    }
    catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Model."
      });
    }

  }

  // Search
  async search(req, res) {
    let title = req.body.title;
    let province_name = req.body.province_name;
    let district_name = req.body.district_name;
    let dateRange = req.body.dateRange;
    let location = req.body.location;
    let numberOfPeople = req.body.numberOfPeople;

    let from_date = dateRange?.firstDate;
    let to_date = dateRange?.secondDate;


    let where = {
      parent_id: {
        [Op.is]: null
      },
      resort_id: {
        [Op.not]: null
      }
    };

    if (title) {
      where.title = {
        [Op.like]: `%${title || ''}%`,
      }
    }

    if (location) {
      where.location = {
        [Op.like]: `%${location || ''}%`,
      }
    }

    try {
      if (dateRange) {
        // Tìm các lịch bị trùng
        let scheduleQuery = `SELECT * FROM schedules s 
          WHERE (:from_date BETWEEN s.from_date AND s.to_date) 
          OR (:to_date BETWEEN s.from_date AND s.to_date)
          OR (:from_date < s.from_date AND :to_date > s.to_date);`;

        let schedules = await db.sequelize.query(scheduleQuery, {
          replacements: { from_date: from_date, to_date: to_date },
          type: db.sequelize.QueryTypes.SELECT
        });

        // Nếu có lịch trùng thì loại bỏ resort đó đi
        if (schedules.length) {
          let ids = schedules.map(schedule => schedule.resort_id);
          where.resort_id = {
            [Op.notIn]: ids
          }
        }
      }

      if (numberOfPeople) {
        let rooms = await this.Model.findAll({
          where: {
            min_people: {
              [Op.or]: {
                [Op.lte]: numberOfPeople,
                [Op.is]: null
              }
            },
            max_people: {
              [Op.or]: {
                [Op.gte]: numberOfPeople,
                [Op.is]: null
              }
            },
          },
        });

        if (rooms.length) {
          let ids = [];
          for (const room of rooms) {
            if (room.parent_id) {
              ids.push(room.parent_id);
            } else {
              ids.push(room.resort_id);
            }
          }
          where.resort_id = {
            ...where.resort_id,
            [Op.in]: ids
          }
        }
      }

      // Lấy danh sách resort bỏ qua các resort bị trùng lịch
      let resorts = await this.Model.findAll({
        where: where,
      });

      res.send(resorts);

    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Models."
      });
    }
  }

  // Lấy danh sách yêu thích
  favourite(req, res) {
    let context = req.context;

    if (!context) {
      res.status(401).send({
        message: "Yêu cầu đăng nhập"
      });
      return;
    }

    var user_id = context.user_id;

    db.sequelize.query(`SELECT r.* FROM resorts r INNER JOIN favourites f ON r.resort_id = f.resort_id WHERE f.user_id = ?`,
      { replacements: [user_id], type: db.sequelize.QueryTypes.SELECT })
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

  // Yêu thích
  async like(req, res) {
    let context = req.context;

    if (!context) {
      res.status(401).send({
        message: "Yêu cầu đăng nhập"
      });
      return;
    }

    var user_id = context.user_id;
    let resort_id = req.body.resort_id;

    let favourite = await db.favourites.findOne({
      where: {
        user_id: user_id,
        resort_id: resort_id
      }
    });

    if (favourite) {
      await db.favourites.destroy({
        where: {
          user_id: user_id,
          resort_id: resort_id
        }
      });
    } else {
      await db.favourites.create({
        user_id: user_id,
        resort_id: resort_id
      });
    }

    res.send(favourite);
  }

  // Lấy danh sách đã đặt
  order(req, res) {
    let context = req.context;

    if (!context) {
      res.status(401).send({
        message: "Yêu cầu đăng nhập"
      });
      return;
    }

    var user_id = context.user_id;

    db.sequelize.query(`SELECT r.* FROM resorts r INNER JOIN orders f ON r.resort_id = f.resort_id WHERE f.user_id = ?`,
      { replacements: [user_id], type: db.sequelize.QueryTypes.SELECT })
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

  // Đặt phòng
  book(req, res) {
    let context = req.context;

    if (!context) {
      res.status(401).send({
        message: "Yêu cầu đăng nhập"
      });
      return;
    }

    var user_id = context.user_id;
    let resort_id = req.body.resort_id;
    let from_date = req.body.from_date;
    let to_date = req.body.to_date;

    db.schedules.create({
      resort_id: resort_id,
      from_date: from_date,
      to_date: to_date
    })

    db.orders.create({
      user_id: user_id,
      resort_id: resort_id,
      from_date: from_date,
      to_date: to_date
    }).then((data) => {
      res.send(data);
    })
  }

  /**
   * update
   * @param {*} req 
   * @param {*} res 
   */
  async update(req, res) {
    try {
      // Create a Model
      const model = {
        ...req.body.Model
      };

      let data = await this.edit(model, {
        where: {
          resort_id: model.resort_id
        }
      });

      if (req?.body?.Model?.articles) {
        // Create a Model
        const models = [
          ...req.body.Model.articles
        ];

        let updates = models.filter(x => x.state == ModelState.Edit);
        let inserts = models.filter(x => x.state == ModelState.Add);
        let deletes = models.filter(x => x.state == ModelState.Delete).map(x => x.article_id);

        inserts.length > 0 && await articleController.bulkCreate(inserts, {

        });
        if (updates.length > 0) {
          for (const item of updates) {
            this.ArticleModel.upsert(item);
          }
        }
        deletes.length > 0 && articleController.bulkDelete({ article_id: deletes });

        let insertImages = [];
        let deleteImages = [];
        for (const item of model.articles) {
          deleteImages = deleteImages.concat(item.images.filter(x => x.state == ModelState.Delete));
          insertImages = insertImages.concat(item.images.filter(x => x.state == ModelState.Add).map(x => {
            return {
              ...x,
              article_id: item.article_id,
              resort_id: model.resort_id,
              src: getImageLink(x.file_name, model.resort_id)
            }
          }));
        }
        insertImages.length > 0 && ImageModel.bulkCreate(insertImages);
        deleteImages.length > 0 && ImageModel.destroy({
          where: {
            image_id: deleteImages.map(x => x.image_id)
          },
        })
      }

      res.send(data);
    }
    catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the Model."
      });
    }

  }
}

module.exports = new ResortController(ResortModel);