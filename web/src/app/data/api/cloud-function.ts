import app from '../../../firebase'

const DEFAULT_REGION = 'us-central1'

function buildUrl(region: string, path: string, useLocal: boolean): string {
	if (path.startsWith('/')) {
		path = path.substring(1)
	}

	return useLocal ? buildLocalUrl(region, path) : buildCloudUrl(region, path)
}

function buildCloudUrl(region: string, path: string): string {
	return `https://${region}-${
		(app.options as any).projectId // Necessary for weird typing on firebase
	}.cloudfunctions.net/api/${path}`
}

function buildLocalUrl(region: string, path: string) {
	return `http://localhost:5001/${(app.options as any).projectId}/${region}/api/${path}`
}

class CloudFunction {
	static useLocal = process.env.NODE_ENV === 'development'

	private _region: string
	private _path = ''

	constructor(region?: string) {
		this._region = region || DEFAULT_REGION
	}

	path(path: string): CloudFunction {
		this._path = path
		return this
	}

	async call(data: any, method?: 'GET' | 'POST' | 'PUT' | 'DELETE'): Promise<Response> {
		if (!method) {
			throw new Error('Method is required')
		}

		const url = buildUrl(this._region, this._path, CloudFunction.useLocal)

		const requestHeaders: { [key: string]: string } = {
			'Content-Type': 'application/json',
		}

		const currentUser = app.auth().currentUser
		if (currentUser) {
			const token = await currentUser.getIdToken()
			requestHeaders['Authorization'] = `Bearer ${token}`
		}

		return await fetch(url, {
			method: method,
			headers: requestHeaders,
			body: JSON.stringify(data),
		}).then((result) => {
			if (!result.ok) {
				return Promise.reject({
					status: result.status,
					statusText: result.statusText,
				})
			} else {
				return result
			}
		})
	}

	async get(): Promise<any> {
		return this.call(undefined, 'GET').then((result) => result.json())
	}

	async post(data?: any): Promise<any> {
		return this.call(data, 'POST').then((result) => {
			if (result.status !== 204) {
				return result.json()
			}
		})
	}

	async put(data: any): Promise<any> {
		return this.call(data, 'PUT')
	}

	async delete(): Promise<any> {
		return this.call(undefined, 'DELETE')
	}
}

export default CloudFunction
