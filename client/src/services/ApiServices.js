import { BaseService } from './BaseService'

class ApiServices extends BaseService {
	constructor() {
		super('/api')
	}
	getTask() {
		return this.get('/task')
	}
	updateTask(data) {
		return this.put('/update-task', data)
	}
}

const apiInstance = new ApiServices()
export default apiInstance
