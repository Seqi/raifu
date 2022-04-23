import { rest } from 'msw'
import { db } from '../data'

// TODO: Probably make this a bit more flexible to change
export const baseUrl = 'https://us-central1-raifu-dev.cloudfunctions.net/api'

export const handlers = [
	rest.get(`${baseUrl}/loadouts`, (_req, res, ctx) => {
		const loadouts = db.loadouts.get()
		return res(ctx.json(loadouts))
	}),
]
