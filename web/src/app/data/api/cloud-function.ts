import app from '../../../firebase'

const DEFAULT_REGION = 'us-central1'

function buildUrl(region: string, path: string, useLocal: boolean): string {
	let formatedPath = path
	if (formatedPath.startsWith('/')) {
		formatedPath = formatedPath.substring(1)
	}

	return useLocal
		? buildLocalUrl(region, formatedPath)
		: buildCloudUrl(region, formatedPath)
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

	async call(body: any, method?: 'GET' | 'POST' | 'PUT' | 'DELETE'): Promise<Response> {
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
			body: JSON.stringify(body),
		}).then((result) => {
			if (result.ok) {
				return result
			} else {
				return Promise.reject({
					status: result.status,
					statusText: result.statusText,
				})
			}
		})
	}

	async get(): Promise<any> {
		return this.call(undefined, 'GET').then((result) => result.json())
	}

	async post(body?: any): Promise<any> {
		return this.call(body, 'POST').then((result) => {
			if (result.status !== 204) {
				return result.json()
			}
		})
	}

	async put(body: any): Promise<any> {
		return this.call(body, 'PUT')
	}

	async delete(): Promise<any> {
		return this.call(undefined, 'DELETE')
	}
}

export default CloudFunction
