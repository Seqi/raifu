import { render, screen } from '@testing-library/react'
import { LoadoutCard } from './LoadoutCard'
import { buildLoadout, buildLoadoutWeapon } from '../../test/builders'

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

	it('should show number of additional weapons when too many weapons to display', () => {
		const loadout = buildLoadout({
			overrides: {
				weapons: Array(4).map(() => buildLoadoutWeapon()),
			},
		})
		const onClick = jest.fn()
		const onDelete = jest.fn()

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		expect(screen.getByText('+ 2 more')).toBeInTheDocument()
	})

	it('should show not number of additional weapons when weapon count fits display', () => {
		const loadout = buildLoadout({
			overrides: {
				weapons: Array(2).map(() => buildLoadoutWeapon()),
			},
		})
		const onClick = jest.fn()
		const onDelete = jest.fn()

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		expect(screen.queryByText(/\+ \d more/)).not.toBeInTheDocument()
	})
})
