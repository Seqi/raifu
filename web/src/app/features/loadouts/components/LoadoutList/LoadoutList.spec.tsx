import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import { baseUrl, server, rest } from 'test/server'
import { db } from 'test/data'

import LoadoutList from './LoadoutList'
import theme from 'theme'

jest.mock('firebase', () => {
	return { initializeApp: vi.fn(), analytics: vi.fn() }
})

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
	it('should render a list with an add card', async () => {
		renderLoadoutList()

		expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()

		await waitFor(() => {
			expect(screen.getByRole('list')).toBeInTheDocument()
		})

		expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()

		const items = screen.getAllByRole('listitem')
		expect(items).toHaveLength(5)

		const loadouts = db.loadouts.get()

		items.forEach((item, index) => {
			// We expect the order to match
			const loadout = loadouts[index]

			const { getByRole } = within(item)

			expect(getByRole('heading', { name: loadout.name })).toBeInTheDocument()
		})

		expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()
	})

	it('should show add card even if no items in list', async () => {
		server.use(
			rest.get(`${baseUrl}/loadouts`, (_req, res, ctx) => {
				return res(ctx.json([]))
			})
		)

		renderLoadoutList()

		expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()

		await waitFor(() => {
			expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
		})

		expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument()
	})

	it('should allow for reloading if an error occurs', async () => {
		server.use(
			rest.get(`${baseUrl}/loadouts`, (_req, res, ctx) => {
				return res.once(ctx.status(500))
			})
		)

		renderLoadoutList()

		expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()

		// Wait for error message to show
		expect(await screen.findByText('Could not load loadouts.')).toBeInTheDocument()
		expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
		const retryButton = screen.getByRole('button', { name: 'Retry' })
		expect(retryButton).toBeInTheDocument()

		// Check no list is rendering
		expect(screen.queryByRole('list')).not.toBeInTheDocument()
		expect(screen.queryByRole('button', { name: 'add' })).not.toBeInTheDocument()

		// Click the retry button
		await userEvent.click(retryButton)

		// Basic tests that the list loads. Details captured in above test.
		expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()

		await waitFor(() => {
			expect(screen.getByRole('list')).toBeInTheDocument()
		})

		expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()

		const items = screen.getAllByRole('listitem')
		expect(items).toHaveLength(5)
	})
})
