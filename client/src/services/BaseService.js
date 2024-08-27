export class BaseService {
	#baseurl

	constructor(baseEndpoint) {
		this.#baseurl = `${import.meta.env.VITE_BASE_URL}${baseEndpoint}`
	}

	async #responseHandler(data, method, endpoint) {
		try {
			const response = await fetch(`${this.#baseurl}${endpoint}`, {
				method,
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
			throw new Error(error.message || 'An unknown error occurred in the service.')
		}
	}

	get(endpoint) {
		return this.#responseHandler(null, 'GET', endpoint)
	}

	post(endpoint, data) {
		return this.#responseHandler(data, 'POST', endpoint)
	}

	put(endpoint, data) {
		return this.#responseHandler(data, 'PUT', endpoint)
	}
}
