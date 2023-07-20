const { authMiddleware } = require("../middleware/auth.middleware.js");

module.exports = app => {
  const feedbacks = require("../controllers/feedback.controller.js");

  var router = require("express").Router();

  // Create a new feedback
  router.post("/", authMiddleware, feedbacks.create.bind(feedbacks));

  // Retrieve all feedbacks
  router.post("/list", feedbacks.loadComments.bind(feedbacks));
  router.post("/info", feedbacks.getFeedbacks.bind(feedbacks));
  router.post("/paging", feedbacks.getCommentsPaging.bind(feedbacks));

  // Retrieve a single feedback with id
  router.get("/:id", feedbacks.findOne.bind(feedbacks));

  // Update a feedback with id
  router.put("/", feedbacks.update.bind(feedbacks));

  // Delete a feedback with id
  router.post("/delete", feedbacks.delete.bind(feedbacks));

  app.use('/api/feedbacks', router);
};