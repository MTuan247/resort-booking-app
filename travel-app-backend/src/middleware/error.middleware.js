exports.errorHandlingMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
}