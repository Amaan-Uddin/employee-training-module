const express = require('express')
const router = express.Router()

const authenticateUser = require('../utils/middleware/authenticate')
const fetchTask = require('../controller/api-controllers/fetchTask')
const updateTask = require('../controller/api-controllers/updateTaskStatus')

router.use(authenticateUser)
router.get('/task', fetchTask)
router.put('/update-task', updateTask)

module.exports = router
