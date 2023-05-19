const authMethod = require('./auth.method');

exports.contextMiddleware = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).send('Không tìm thấy access token!');
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);

	req.context = verified;

	return next();
};