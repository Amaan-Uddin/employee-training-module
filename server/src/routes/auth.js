const express = require('express')
const router = express.Router()

const signup = require('../controller/auth-controllers/signup')
const login = require('../controller/auth-controllers/login')
const logout = require('../controller/auth-controllers/logout')
const authenticateUser = require('../utils/middleware/authenticate')

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', authenticateUser, logout)
router.get('/current', authenticateUser, (req, res) => {
	if (req.user) return res.status(200).json(req.user)
	else return res.status(401).json({ error: 'Unauthorized...' })
})

module.exports = router
