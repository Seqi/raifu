import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoadoutCard } from './LoadoutCard'
import { buildLoadout, buildLoadoutWeapon } from 'test/builders'

describe('Loadout card', () => {
	it('should display title of loadout', () => {
		const loadout = buildLoadout()
		const onClick = vi.fn()
		const onDelete = vi.fn()

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		expect(screen.getByRole('heading')).toHaveTextContent(loadout.getTitle())
	})

	it('should be able to be deleted', async () => {
		const loadout = buildLoadout()
		const onClick = vi.fn()
		const onDelete = vi.fn().mockResolvedValue(true)

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		const deleteButton = screen.getByRole('button', { name: 'delete' })
		expect(deleteButton).toBeInTheDocument()

		await userEvent.click(deleteButton)

		const confirmDialog = screen.getByRole('dialog')
		const confirmButton = within(confirmDialog).getByRole('button', { name: /delete/i })

		await userEvent.click(confirmButton)

		expect(onDelete).toHaveBeenCalled()
	})

	it('should show message if no weapons', () => {
		const loadout = buildLoadout()
		const onClick = vi.fn()
		const onDelete = vi.fn()

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		expect(screen.getByText('There‘s nothing here!')).toBeInTheDocument()
	})

	it('should show number of additional weapons when too many weapons to display', async () => {
		const loadout = buildLoadout({
			overrides: {
				weapons: Array.from(Array(4), () => buildLoadoutWeapon()),
			},
		})
		const onClick = vi.fn()
		const onDelete = vi.fn()

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		await waitFor(() => {
			const images = screen.getAllByRole('img')
			expect(images).toHaveLength(2)
		})

		expect(screen.getByText('+ 2 more')).toBeInTheDocument()
	})

	it('should show not number of additional weapons when weapon count fits display', async () => {
		const loadout = buildLoadout({
			overrides: {
				weapons: Array.from(Array(2), () => buildLoadoutWeapon()),
			},
		})
		const onClick = vi.fn()
		const onDelete = vi.fn()

		render(<LoadoutCard item={loadout} onClick={onClick} onDelete={onDelete} />)

		await waitFor(() => {
			const images = screen.getAllByRole('img')
			expect(images).toHaveLength(2)
		})

		expect(screen.queryByText(/\+ \d more/)).not.toBeInTheDocument()
	})
})
