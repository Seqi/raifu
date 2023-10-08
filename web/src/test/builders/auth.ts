import { build, perBuild } from '@jackfranklin/test-data-bot'
import { AuthContextValue } from 'app/core/auth/contexts'

export const buildLoginProvider = build<AuthContextValue['login']>({
	fields: {
		withEmail: vi.fn(),
		withGoogle: vi.fn(),
		withTwitter: vi.fn(),
	},
})

export const buildAuthContext = build<AuthContextValue>({
	fields: {
		isAuthenticated: false,
		logout: vi.fn(),
		onAuthChanged: vi.fn(),
		signup: { withEmail: vi.fn() },
		user: null,
		login: perBuild(() => buildLoginProvider()),
	},
})
