import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer()

// TODO: Probably make this a bit more flexible to change
export const baseUrl = 'https://us-central1-raifu-dev.cloudfunctions.net/api'

export { server, rest }
