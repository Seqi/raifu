// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom'

import { server } from 'test/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock analytics
jest.mock('app/shared/hooks/useAnalytics', () => () => ({ logEvent: jest.fn() }))
