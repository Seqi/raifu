import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { baseUrl, handlers } from './handlers'

const server = setupServer(...handlers)

export { server, rest, baseUrl }
