import app from '../index'

const DEFAULT_REGION = 'us-central1'

function buildUrl(opts, path, useLocal) {
	if (path.startsWith('/')) {
		path = path.substring(1)
	}
	
	return useLocal ? buildLocalUrl(opts, path) : buildCloudUrl(opts, path)
}

function buildCloudUrl(region, path) {
	return `https://${region}-${app.options.projectId}.cloudfunctions.net/api/${path}`
}

function buildLocalUrl(region, path) {
	return `http://localhost:5000/${app.options.projectId}/${region}/api/${path}`
}

class CloudFunction {
	static useLocal = false

	constructor(region) {
		this.region = region || DEFAULT_REGION
	}

	path(path) {
		this.path = path
		return this
	}

	async call(data, method) {
		if (!method) {
			throw new Error('Method is required')
		}

		let url = buildUrl(this.region, this.path, CloudFunction.useLocal)

		let token = ''
		if (app.auth().currentUser) {
			token = await app.auth().currentUser.getIdToken()
		}

		return await fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(data)
		})
			.then((result) => {
				if (!result.ok) {
					return Promise.reject({
						status: result.status,
						statusText: result.statusText
					})
				}
				else {
					return result
				}
			})
	}

	async get() {
		return this.call(undefined, 'GET')
			.then((result) => result.json())
	}

	async post(data) {
		return this.call(data, 'POST')
			.then((result) => result.json())
	}

	async put(data) {
		return this.call(data, 'PUT')
	}

	async delete() {
		return this.call(undefined, 'DELETE')
	}
}

export { CloudFunction } 

export default CloudFunction