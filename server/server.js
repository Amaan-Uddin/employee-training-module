require('dotenv').config()
const express = require('express')
const app = express()
const connectToDB = require('./config/connectToDB')
connectToDB()

const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoute = require('./src/routes/auth')
const apiRoute = require('./src/routes/api')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
const origins = process.env.ALLOWED_ORIGINS.split(',')
app.use(
	cors({
		origin: function (origin, callback) {
			if (origins.indexOf(origin) !== -1 || !origin) {
				callback(null, true) // request origin is permitted
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		credentials: true,
	})
)
app.use('/auth', authRoute)
app.use('/api', apiRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})
