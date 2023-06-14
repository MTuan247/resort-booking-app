exports.errorHandlingMiddleware = (req, res, next) => {
	try {
    return next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}