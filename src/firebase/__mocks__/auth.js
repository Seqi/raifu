export default {
	test: true,
	signup: {
		withEmail: jest.fn((email, pass) => {
			if (email.indexOf('fail') > -1) {
				return Promise.reject({ message: 'Signup failed' })
			} else {
				return Promise.resolve()
			}
		})
	}
}
