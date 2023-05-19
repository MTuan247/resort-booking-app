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

    try {
      // Lấy dữ liệu resort
      let master = await this.Model.findByPk(id);

      // Lấy dữ liệu các danh mục
      let details = await this.ArticleModel.findAll({
        where: {
          resort_id: id
        }
      });

      // Mỗi danh mục lấy dữ liệu ảnh
      for (const detail of details) {
        let images = await ImageModel.findAll({
          where: {
            article_id: detail.article_id
          }
        });
        detail.dataValues.images = images;
      }

      let masterData = master.dataValues;

      masterData.articles = details;

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
  search(req, res) {
    var title = req.body.title;
    var province_name = req.body.province_name;
    var district_name = req.body.district_name;
    var dateRange = req.body.dateRange;
    var location = req.body.location;
    var numberOfPeople = req.body.numberOfPeople;

    let where = {
      parent_id: {
        [Op.is]: null
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

    this.Model.findAll({
      where: where
    })
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

  // Lấy danh sách yêu thích
  favourite(req, res) {
    let context = req.body.context;

    if (!context) {
      res.status(401).send({
        message: "Yêu cầu đăng nhập"
      });
    }

    var user_id = context.user_id;

    let where = {
      parent_id: {
        [Op.is]: null
      }
    };

    this.Model.findAll({
      where: where
    })
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
  like(req, res) {
    let context = req.body.context;

    if (!context) {
      res.status(401).send({
        message: "Yêu cầu đăng nhập"
      });
    }
  
    var user_id = context.user_id;

    this.Model.findAll()
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