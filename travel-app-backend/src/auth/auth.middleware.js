const authMethod = require('./auth.method');

exports.contextMiddleware = async (req, res, next) => {
	// Lấy access token từ header
	let accessTokenFromHeader = req.headers.authorization;

	if (!accessTokenFromHeader) {
		return next();
	}

	// Remove Bearer from token
	if (accessTokenFromHeader.startsWith("Bearer ")) {
		accessTokenFromHeader = accessTokenFromHeader.split(' ')[1];
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);

	req.context = verified?.payload;

	return next();
};