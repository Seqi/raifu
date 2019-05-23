export default function errorCheck(result) {
	if (result.data.code) {
		return Promise.reject(result.data.details || 'An error occurred')
	}

	return result
}