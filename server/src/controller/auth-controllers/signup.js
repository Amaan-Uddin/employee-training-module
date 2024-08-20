const User = require('../../model/Users')
const bcrypt = require('bcrypt')
const fetchUser = require('../../utils/functions/userFunc')
const { signAccessToken, signRefreshToken } = require('../../utils/functions/signTokens')

module.exports = async function signup(req, res) {
	try {
		const { name, email, password } = req.body
		if (!name || !email || !password)
			return res.status(400).json({ error: 'Bad request, some fields are missing.' })

		const user = await fetchUser({ email: email })
		if (user) return res.status(409).json({ error: 'Conflict, user already exists.' })

		const hashPassword = await bcrypt.hash(password, 12)
		const newUser = await User.create({
			name: name,
			email: email,
			password: hashPassword,
		})

		const accessToken = signAccessToken({
			data: { _id: newUser._id, email: newUser.email, name: newUser.name },
		})
		const refreshToken = await signRefreshToken({
			data: { _id: newUser._id, email: newUser.email, name: newUser.name },
		})
		console.log(`accessToken: ${accessToken}\n\nRefreshToken: ${refreshToken}`)

		res.cookie('accessToken', accessToken, { httpOnly: true })
		res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
		res.status(201).json({
			message: 'User registered successfully.',
			user: { _id: newUser._id, email: newUser.email, name: newUser.name },
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'internal server error' })
	}
}
