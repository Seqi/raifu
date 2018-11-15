let __authChangedHandler = () => {}
let __triggerErrorOnLogin = false
export default {
	__changeAuth: (user) => {
		__authChangedHandler(user)
	},
	onAuthChanged: (fun) => {
		__authChangedHandler = fun
	},
	__triggerErrorOnLogin: (triggerError) => (__triggerErrorOnLogin = triggerError),
	user: {},
	signup: {
		withEmail: jest.fn((email, pass) => {
			if (email.indexOf('fail') > -1) {
				return Promise.reject({ message: 'Signup failed' })
			} else {
				return Promise.resolve()
			}
		})
	},
	login: {
		withTwitter: jest.fn(() => {
			return __triggerErrorOnLogin ? Promise.reject({ message: 'Error' }) : Promise.resolve()
		}),
		withGoogle: jest.fn(() => {
			return __triggerErrorOnLogin ? Promise.reject({ message: 'Error' }) : Promise.resolve()
		}),
		withEmail: jest.fn((email, pass) => {
			return __triggerErrorOnLogin ? Promise.reject({ message: 'Error' }) : Promise.resolve()
		})
	},
	logout: jest.fn()
}
