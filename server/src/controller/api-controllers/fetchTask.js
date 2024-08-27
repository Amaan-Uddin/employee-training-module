const Task = require('../../model/Task')

module.exports = async function fetchTask(req, res) {
	try {
		const { _id } = req.user
		const tasks = await Task.findOne({ userId: _id })
		res.status(200).json(tasks)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Internal server error' })
	}
}
