
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

/**
 * Sinh token
 * @param {*} payload 
 * @param {*} secretSignature 
 * @param {*} tokenLife 
 * @returns 
 */
exports.generateToken = async (payload, secretSignature, tokenLife) => {
	try {
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch (error) {
		console.log(`Error in generate access token:  + ${error}`);
		return null;
	}
};

/**
 * Kiểm tra token hợp lệ
 * @param {*} token 
 * @param {*} secretKey 
 * @returns 
 */
exports.verifyToken = async (token, secretKey) => {
	try {
		return await verify(token, secretKey);
	} catch (error) {
		console.log(`Error in verify access token:  + ${error}`);
		return null;
	}
};