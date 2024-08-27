import { BaseService } from './BaseService'

class AuthenticationServices extends BaseService {
	constructor() {
		super('/auth')
	}
	signup(data) {
		return this.post('/signup', data)
	}
	login(data) {
		return this.post('/login', data)
	}
	logout() {
		return this.post('/logout', null)
	}
	getCurrentUser() {
		return this.get('/current')
	}
}

const authInstance = new AuthenticationServices()
export default authInstance
