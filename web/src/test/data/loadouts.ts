import { buildLoadout } from '../builders'

const loadouts = Array.from({ length: 5 }, () => buildLoadout())

export function get() {
	return loadouts
}
