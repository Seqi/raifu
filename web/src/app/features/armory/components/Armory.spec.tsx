import { ThemeProvider } from '@material-ui/core'
import { render, screen, waitFor, within } from '@testing-library/react'
import { db } from 'test/data'
import theme from 'theme'
import Armory from './Armory'

describe('Armory', () => {
	describe.each([
		['weapons', db.armory.get().weapons],
		['attachments', db.armory.get().attachments],
		['gear', db.armory.get().gear],
		['clothing', db.armory.get().clothing],
	])('%s', (resource, dbItems) => {
		it('should render the list with an add button', async () => {
			render(
				<ThemeProvider theme={theme}>
					<Armory />
				</ThemeProvider>
			)

			expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
			await waitFor(() =>
				expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
			)

			const list = screen.getByLabelText(new RegExp(resource, 'i'))
			const listItems = within(list).getAllByRole('listitem')
			expect(listItems).toHaveLength(5)

			const addButton = within(list).getByRole('button', { name: 'add' })
			expect(addButton).toBeInTheDocument()

			listItems.forEach((listItem, index) => {
				const item = dbItems[index]

				expect(within(listItem).getByText(item.platform)).toBeInTheDocument()
				expect(within(listItem).getByText(item.brand!)).toBeInTheDocument()

				expect(within(listItem).getByAltText(item.platform)).toBeInTheDocument()
			})
		})
	})
})
