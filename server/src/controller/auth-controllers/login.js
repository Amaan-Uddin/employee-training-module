const bcrypt = require('bcrypt')
const fetchUser = require('../../utils/functions/userFunc')
const { signAccessToken, signRefreshToken } = require('../../utils/functions/signTokens')

module.exports = async function login(req, res) {
	try {
		const { email, password } = req.body
		if (!email || !password) return res.status(400).json({ error: 'Bad request, some fields are missing.' })

		const user = await fetchUser(email)
		if (!user) return res.status(404).json({ error: 'Not found, user does not exist.' })

		const passwordIsCorrect = await bcrypt.compare(password, user.password)
		console.log(passwordIsCorrect)
		if (!passwordIsCorrect) return res.status(401).json({ error: 'Unauthorized, incorrect email or password.' })

		const accessToken = signAccessToken({
			data: { _id: user._id, email: user.email, name: user.name },
		})
		const refreshToken = await signRefreshToken({
			data: { _id: user._id, email: user.email, name: user.name },
		})
		console.log(`accessToken: ${accessToken}\n\nRefreshToken: ${refreshToken}`)

		res.cookie('accessToken', accessToken, { httpOnly: true })
		res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

		res.status(200).json({
			message: 'User logged in successfully.',
			user: { _id: user._id, email: user.email, name: user.name },
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
