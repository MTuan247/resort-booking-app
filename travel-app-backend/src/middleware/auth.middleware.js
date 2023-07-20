exports.authMiddleware = async (req, res, next) => {
	if (!req.context) {
    res.status(401).send({
      message: "Yêu cầu đăng nhập"
    });
    return;
  }

  return next();
}