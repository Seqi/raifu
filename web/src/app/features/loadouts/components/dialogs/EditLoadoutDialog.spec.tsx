import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { buildLoadout } from 'test/builders'

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

		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement

		await userEvent.type(nameField, 'a')
		await userEvent.clear(nameField)

		expect(screen.getByText('Name is required.')).toBeInTheDocument()

		const saveButton = screen.getByRole('button', { name: 'Save' })
		expect(saveButton).toBeDisabled()
	})

	it('should show an error if character limit is exceeded', async () => {
		render(<EditLoadoutDialog isOpen={true} onClose={jest.fn()} onSave={jest.fn()} />)

		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement

		await userEvent.type(nameField, '{a>65/}')

		expect(screen.getByText('Cannot exceed 64 characters.')).toBeInTheDocument()

		const saveButton = screen.getByRole('button', { name: 'Save' })
		expect(saveButton).toBeDisabled()
	})

	it('should show an error if character limit is exceeded', async () => {
		render(<EditLoadoutDialog isOpen={true} onClose={jest.fn()} onSave={jest.fn()} />)

		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement

		await userEvent.type(nameField, '{a>65/}')

		expect(screen.getByText('Cannot exceed 64 characters.')).toBeInTheDocument()

		const saveButton = screen.getByRole('button', { name: 'Save' })
		expect(saveButton).toBeDisabled()
	})

	it('should call save and close handlers on a successful create', async () => {
		// TODO: We can't fake timers here as it seems to just get stuck
		const onSave = jest
			.fn()
			.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))
		const onClose = jest.fn()

		render(<EditLoadoutDialog isOpen={true} onClose={onClose} onSave={onSave} />)

		expect(screen.getByText('Add loadout')).toBeInTheDocument()

		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement

		await userEvent.type(nameField, 'Test loadout')

		const saveButton = screen.getByRole('button', { name: 'Save' })

		await userEvent.click(saveButton)

		expect(saveButton).toBeDisabled()
		await waitFor(() => expect(saveButton).not.toBeDisabled())

		expect(onSave).toBeCalledWith(expect.objectContaining({ name: 'Test loadout' }))
		expect(onClose).toBeCalled()
	})

	it('should call save and close handlers on a successful edit', async () => {
		const loadout = buildLoadout()
		const onSave = jest
			.fn()
			.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))
		const onClose = jest.fn()

		render(
			<EditLoadoutDialog
				isOpen={true}
				onClose={onClose}
				onSave={onSave}
				loadout={loadout}
			/>
		)

		expect(screen.getByText('Edit loadout')).toBeInTheDocument()

		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement
		expect(nameField).toHaveValue(loadout.name)

		await userEvent.type(nameField, ' UPDATE')

		const saveButton = screen.getByRole('button', { name: 'Save' })

		await userEvent.click(saveButton)

		expect(saveButton).toBeDisabled()
		await waitFor(() => expect(saveButton).not.toBeDisabled())

		expect(onSave).toBeCalledWith(
			expect.objectContaining({ name: `${loadout.name} UPDATE` })
		)
		expect(onClose).toBeCalled()
	})

	it('should show error on a submit failure', async () => {
		const onSave = jest
			.fn()
			.mockImplementation(() => new Promise((resolve, reject) => setTimeout(reject, 100)))
		const onClose = jest.fn()

		render(<EditLoadoutDialog isOpen={true} onClose={onClose} onSave={onSave} />)

		const nameField = (await screen.findByLabelText(/name/i)) as HTMLInputElement

		await userEvent.type(nameField, 'Test loadout')

		const saveButton = screen.getByRole('button', { name: 'Save' })
		await userEvent.click(saveButton)

		expect(saveButton).toBeDisabled()
		await waitFor(() => expect(saveButton).not.toBeDisabled())

		expect(
			screen.getByText('An error occurred while saving loadout.')
		).toBeInTheDocument()

		expect(onSave).toBeCalledWith(expect.objectContaining({ name: 'Test loadout' }))
		expect(onClose).not.toBeCalled()
	})

	it('clicking cancel button should call close handler', async () => {
		const onSave = jest.fn()
		const onClose = jest.fn()

		render(<EditLoadoutDialog isOpen={true} onClose={onClose} onSave={onSave} />)
		const saveButton = screen.getByRole('button', { name: 'Cancel' })
		await userEvent.click(saveButton)

		expect(onClose).toBeCalled()
		expect(onSave).not.toBeCalled()
	})
})
