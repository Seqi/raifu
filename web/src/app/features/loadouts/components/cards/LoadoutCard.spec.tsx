import { render, screen } from '@testing-library/react'
import { LoadoutCard } from './LoadoutCard'
import { buildLoadout, buildLoadoutWeapon } from 'test/builders'

describe('Loadout card', () => {
	it('should display title of loadout', () => {
		const loadout = buildLoadout()
		const onClick = jest.fn()
		const onDelete = jest.fn()

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		expect(screen.getByRole('heading')).toHaveTextContent(loadout.getTitle())
	})

	it('should show message if no weapons', () => {
		const loadout = buildLoadout()
		const onClick = jest.fn()
		const onDelete = jest.fn()

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		expect(screen.getByText('There‘s nothing here!')).toBeInTheDocument()
	})

	it('should show number of additional weapons when too many weapons to display', async () => {
		const loadout = buildLoadout({
			overrides: {
				weapons: Array.from(Array(4), () => buildLoadoutWeapon()),
			},
		})
		const onClick = jest.fn()
		const onDelete = jest.fn()

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		// Wait for the image to load
		await screen.findAllByRole('img')

		expect(screen.getByText('+ 2 more')).toBeInTheDocument()
	})

	it('should show not number of additional weapons when weapon count fits display', async () => {
		const loadout = buildLoadout({
			overrides: {
				weapons: Array.from(Array(2), () => buildLoadoutWeapon()),
			},
		})
		const onClick = jest.fn()
		const onDelete = jest.fn()

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		// Wait for the image to load
		await screen.findAllByRole('img')

		expect(screen.queryByText(/\+ \d more/)).not.toBeInTheDocument()
	})
})
