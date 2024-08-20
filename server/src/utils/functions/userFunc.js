const User = require('../../model/Users')

module.exports = async function fetchUser(query) {
	return await User.findOne(query).select('_id email password name')
}
