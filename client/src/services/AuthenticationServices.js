export class AuthenticationServices {
	#baseurl // private
	constructor() {
		this.#baseurl = import.meta.env.VITE_BASE_URL
	}
	async signup(data) {
		return await this.#responseHandler(data, 'POST', '/signup')
	}
	async login(data) {
		return await this.#responseHandler(data, 'POST', '/login')
	}
	async logout() {
		return await this.#responseHandler(null, 'GET', '/logout')
	}
	async getCurrentUser() {
		return await this.#responseHandler(null, 'GET', '/current')
	}
	async #responseHandler(data, method, endpoint) {
		try {
			const response = await fetch(`${this.#baseurl}/auth${endpoint}`, {
				method: method,
				...(data && {
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json',
					},
				}),
				credentials: 'include',
			})
			const responseMsg = await response.json()
			if (!response.ok) {
				throw new Error(responseMsg.error || 'Something went wrong.')
			}
			return responseMsg
		} catch (error) {
			throw new Error(error.message || 'An unknown error occurred in auth service.')
		}
	}
}

const authInstance = new AuthenticationServices()

export default authInstance
