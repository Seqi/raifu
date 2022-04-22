import { baseUrl, server, rest } from 'test/server'
import { buildLoadout } from 'test/builders'

import LoadoutList from './LoadoutList'
import { render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import theme from 'theme'
import { Loadout } from '../../models'

const renderLoadoutList = () => {
	return render(
		<ThemeProvider theme={theme}>
			<MemoryRouter>
				<LoadoutList />
			</MemoryRouter>
		</ThemeProvider>
	)
}

describe('Loadout list', () => {
	let loadouts: Loadout[]

	beforeEach(() => {
		server.use(
			rest.get(`${baseUrl}/loadouts`, (_req, res, ctx) => {
				loadouts = Array.from({ length: 5 }, () => buildLoadout())
				return res(ctx.json(loadouts))
			})
		)
	})

	it('should render a list of loadouts with an add card', async () => {
		renderLoadoutList()

		expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()

		await waitFor(() => {
			expect(screen.getByRole('list')).toBeInTheDocument()
		})

		expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()

		const items = screen.getAllByRole('listitem')
		expect(items).toHaveLength(5)

		items.forEach((item, index) => {
			// We expect the order to match
			const loadout = loadouts[index]

			const { getByRole } = within(item)

			expect(getByRole('heading', { name: loadout.name })).toBeInTheDocument()
		})

		expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()
	})
})
