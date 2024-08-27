const Task = require('../../model/Task')

module.exports = async function updateTask(req, res) {
	try {
		const { videoIndex } = req.body
		const { _id } = req.user
		const taskUpdate = await Task.updateOne({ userId: _id }, { [`task.${videoIndex}.completed`]: true })
		res.status(200).json({ message: 'Successfully updated task' })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Internal server error' })
	}
}
