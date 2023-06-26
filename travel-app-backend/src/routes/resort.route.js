const multer = require('multer');
const { uploadPhotos } = require('../services/storage.service')

const multerStorage = multer({
    storage: multer.memoryStorage()
  })

module.exports = app => {
  const resorts = require("../controllers/resort.controller.js");

  var router = require("express").Router();

  // Create a new resort
  router.post("/", resorts.create.bind(resorts));

  // Retrieve all resorts
  router.get("/", resorts.findAll.bind(resorts));
  router.post("/list", resorts.findAll.bind(resorts));
  router.post("/search", resorts.search.bind(resorts));

  // Danh sách gợi ý
  router.get("/suggestion", resorts.suggestion.bind(resorts));

  // Xử lý yêu thích
  router.post("/favourite", resorts.favourite.bind(resorts));
  router.post("/like", resorts.like.bind(resorts));

  // Xử lý đặt hàng
  router.post("/order", resorts.order.bind(resorts));
  router.post("/book", resorts.book.bind(resorts));

  // Retrieve a single resort with id
  router.get("/:id", resorts.findOne.bind(resorts));

  // Update a resort with id
  router.put("/", resorts.update.bind(resorts));

  // Delete a resort with id
  router.post("/delete", resorts.delete.bind(resorts));

  router.post('/upload', multerStorage.any('file'), (req, res) => {
    let files = req.files;
    let destination = req.body.destination;
    uploadPhotos(files, {destination});
    res.send('Đang upload hình ảnh');
  });

  app.use('/api/resorts', router);
};