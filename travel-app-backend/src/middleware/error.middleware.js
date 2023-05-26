exports.errorHandlingMiddleware = async (req, res, next) => {
	try {
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}