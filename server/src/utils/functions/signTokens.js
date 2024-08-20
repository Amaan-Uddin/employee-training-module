const jwt = require('jsonwebtoken')
const Token = require('../../model/Token')
const findOrCreate = require('./findOrCreate')

const signAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_MAX })
}

const signRefreshToken = async (payload) => {
	const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_MAX,
	})

	const { doc, isNew } = await findOrCreate(
		Token,
		{ userId: payload.data._id },
		{ refreshToken: refreshToken, userId: payload.data._id }
	)

	console.log('SignRefreshToken :: doc :: ', doc)
	console.log('SignRefreshToken :: isNew :: ', isNew)

	if (!isNew) await Token.updateOne({ _id: doc._id }, { refreshToken: refreshToken })

	return refreshToken
}

module.exports = { signAccessToken, signRefreshToken }
