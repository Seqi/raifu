import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EditLoadoutDialog from './EditLoadoutDialog'

describe('Edit loadout dialog', () => {
	it('should show an empty form when opening with no loadout', async () => {
		render(<EditLoadoutDialog isOpen={true} onClose={jest.fn()} onSave={jest.fn()} />)

		// We async this to get around the fact that isValid swaps from false to true to false again
		// Something to do with react hook form's proxy and material ui's dialog working poorly together
		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement
		expect(nameField.value).toBe('')

		const cancelButton = screen.getByRole('button', { name: 'Cancel' })
		expect(cancelButton).not.toBeDisabled()

		const saveButton = screen.getByRole('button', { name: 'Save' })
		expect(saveButton).toBeDisabled()
	})

	it('should show an error if no value is input after touched', async () => {
		render(<EditLoadoutDialog isOpen={true} onClose={jest.fn()} onSave={jest.fn()} />)

		// We async this to get around the fact that isValid swaps from false to true to false again
		// Something to do with react hook form's proxy and material ui's dialog working poorly together
		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement

		await userEvent.type(nameField, 'a')
		await userEvent.clear(nameField)

		expect(screen.getByText('Name is required.')).toBeInTheDocument()

		const saveButton = screen.getByRole('button', { name: 'Save' })
		expect(saveButton).toBeDisabled()
	})

	it('should show an error if character limit is exceeded', async () => {
		render(<EditLoadoutDialog isOpen={true} onClose={jest.fn()} onSave={jest.fn()} />)

		// We async this to get around the fact that isValid swaps from false to true to false again
		// Something to do with react hook form's proxy and material ui's dialog working poorly together
		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement

		await userEvent.type(
			nameField,
			Array.from(Array(65))
				.map(() => 'a')
				.join()
		)

		expect(screen.getByText('Cannot exceed 64 characters.')).toBeInTheDocument()

		const saveButton = screen.getByRole('button', { name: 'Save' })
		expect(saveButton).toBeDisabled()
	})

	it('should show an error if character limit is exceeded', async () => {
		render(<EditLoadoutDialog isOpen={true} onClose={jest.fn()} onSave={jest.fn()} />)

		// We async this to get around the fact that isValid swaps from false to true to false again
		// Something to do with react hook form's proxy and material ui's dialog working poorly together
		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement

		await userEvent.type(
			nameField,
			Array.from(Array(65))
				.map(() => 'a')
				.join()
		)

		expect(screen.getByText('Cannot exceed 64 characters.')).toBeInTheDocument()

		const saveButton = screen.getByRole('button', { name: 'Save' })
		expect(saveButton).toBeDisabled()
	})

	it('should call onSave and onClose on a successful submit', async () => {
		const onSave = jest.fn().mockResolvedValue(null)
		const onClose = jest.fn()

		render(<EditLoadoutDialog isOpen={true} onClose={onClose} onSave={onSave} />)

		// We async this to get around the fact that isValid swaps from false to true to false again
		// Something to do with react hook form's proxy and material ui's dialog working poorly together
		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement

		await userEvent.type(nameField, 'Test loadout')

		const saveButton = screen.getByRole('button', { name: 'Save' })
		await userEvent.click(saveButton)

		expect(onSave).toBeCalledWith(expect.objectContaining({ name: 'Test loadout' }))
		expect(onClose).toBeCalled()
	})

	it('should call show error on a submit failure', async () => {
		const onSave = jest.fn().mockRejectedValue(null)
		const onClose = jest.fn()

		render(<EditLoadoutDialog isOpen={true} onClose={onClose} onSave={onSave} />)

		// We async this to get around the fact that isValid swaps from false to true to false again
		// Something to do with react hook form's proxy and material ui's dialog working poorly together
		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement

		await userEvent.type(nameField, 'Test loadout')

		const saveButton = screen.getByRole('button', { name: 'Save' })
		await userEvent.click(saveButton)

		expect(
			screen.getByText('An error occurred while saving loadout.')
		).toBeInTheDocument()

		expect(onSave).toBeCalledWith(expect.objectContaining({ name: 'Test loadout' }))
		expect(onClose).not.toBeCalled()
	})
})
