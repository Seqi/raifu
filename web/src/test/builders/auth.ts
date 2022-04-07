import { build, perBuild } from '@jackfranklin/test-data-bot'
import { AuthContextValue } from 'app/core/auth/contexts'

export const buildLoginProvider = build<AuthContextValue['login']>({
	fields: {
		withEmail: jest.fn(),
		withGoogle: jest.fn(),
		withTwitter: jest.fn(),
	},
})

export const buildAuthContext = build<AuthContextValue>({
	fields: {
		isAuthenticated: false,
		logout: jest.fn(),
		onAuthChanged: jest.fn(),
		signup: { withEmail: jest.fn() },
		user: null,
		login: perBuild(() => buildLoginProvider()),
	},
})
