const jwt = require('jsonwebtoken')

function verifyAccessToken(access_token) {
	return jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
}

function verifyRefreshToken(refresh_token) {
	return jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = { verifyAccessToken, verifyRefreshToken }
