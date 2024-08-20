const { verifyRefreshToken } = require('./verifyTokens')
const { signAccessToken } = require('./signTokens')

module.exports = async function refreshAccessToken(refresh_token) {
	try {
		const decode = verifyRefreshToken(refresh_token)
		console.log('RefreshAccessToken :: refreshToken :: ', decode)
		return signAccessToken({ data: decode.data })
	} catch (error) {
		console.log(error)
		throw error
	}
}
