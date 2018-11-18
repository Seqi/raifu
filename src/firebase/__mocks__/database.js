let mockEntity = () => {
	let __getData = []
	let __err = null

	return {
		__setData: (data) => (__getData = data),
		__setError: (err) => (__err = err),
		get: jest.fn(() => (__err ? Promise.reject(__err) : Promise.resolve(__getData)))
	}
}

export default {
	primaries: mockEntity(),
	secondaries: mockEntity(),
	attachments: mockEntity(),
	gear: mockEntity()
}
