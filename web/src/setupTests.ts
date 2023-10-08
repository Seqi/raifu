// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom'
import 'whatwg-fetch'

import { server } from 'test/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock analytics
vi.mock('app/shared/hooks/useAnalytics', () => {
	return { default: () => ({ logEvent: vi.fn() }) }
})

vi.mock('./firebase', () => {
	return {
		default : {

		
		options: {
			projectId: 'raifu',
		},
		auth() {
			return {
				currentUser: {
					getIdToken() {
						return 'abc123'
					},
				},
			}
		},
		}
	}
})
