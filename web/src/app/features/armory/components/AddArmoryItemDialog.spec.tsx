import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddArmoryItemDialog from './AddArmoryItemDialog'

// The autocomplete handler seems a bit slow. This makes these tests prone to
// timeouts on slower machines. This gives it some headway until we can speed the tests up.
// TODO: Really need to fix these timeout issues... Debounce on the change handler maybe?
jest.setTimeout(20000)

describe('Add armory item dialog', () => {
	it('should display a blank form', async () => {
		render(
			<AddArmoryItemDialog
				resourceName='Weapons'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={jest.fn()}
			/>
		)

		const saveButton = await screen.findByRole('button', { name: 'Save' })
		expect(saveButton).toBeDisabled()
	})

	it('should submit a valid form', async () => {
		const saveHandler = jest
			.fn()
			.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

		render(
			<AddArmoryItemDialog
				resourceName='Weapon'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={saveHandler}
			/>
		)

		const weaponField = screen.getByLabelText('Weapon')
		await userEvent.type(weaponField, 'ak')

		const weaponOption = screen.getByRole('option', { name: /ak74u/i })
		await userEvent.click(weaponOption)

		const brandField = screen.getByLabelText('Brand')
		await userEvent.type(brandField, 'bo')

		const brandOption = screen.getByRole('option', { name: /bolt/i })
		await userEvent.click(brandOption)

		const modelField = screen.getByLabelText('Model')
		await userEvent.type(modelField, 'Some Model')

		const nicknameField = screen.getByLabelText('Nickname')
		await userEvent.type(nicknameField, 'A Nickname')

		const saveButton = await screen.findByRole('button', { name: 'Save' })
		await userEvent.click(saveButton)

		expect(saveHandler).toBeCalledWith({
			type: 'rifles',
			platform: 'AK74U',
			brand: 'Bolt',
			model: 'Some Model',
			nickname: 'A Nickname',
		})

		expect(saveButton).toBeDisabled()
		await waitFor(() => expect(saveButton).toBeEnabled())
	})

	it('should submit only when selecting an armory item', async () => {
		const saveHandler = jest
			.fn()
			.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)))

		render(
			<AddArmoryItemDialog
				resourceName='Weapon'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={saveHandler}
			/>
		)

		const weaponField = screen.getByLabelText('Weapon')
		await userEvent.type(weaponField, 'ak')

		const weaponOption = screen.getByRole('option', { name: /ak74u/i })
		await userEvent.click(weaponOption)

		const saveButton = await screen.findByRole('button', { name: 'Save' })
		await userEvent.click(saveButton)

		expect(saveHandler).toBeCalledWith({
			type: 'rifles',
			platform: 'AK74U',
			brand: '',
			model: '',
			nickname: '',
		})

		expect(saveButton).toBeDisabled()
		await waitFor(() => expect(saveButton).toBeEnabled())
	})

	it('should not submit if a manual armory item is entered with no type', async () => {
		render(
			<AddArmoryItemDialog
				resourceName='Weapon'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={jest.fn()}
			/>
		)

		const weaponField = screen.getByLabelText('Weapon')
		await userEvent.type(weaponField, 'ak')

		expect(screen.getByLabelText('Type')).toBeInTheDocument()

		const saveButton = await screen.findByRole('button', { name: 'Save' })
		expect(saveButton).toBeDisabled()
	})

	it('should allow users to manually type in their armory item', async () => {
		const saveHandler = jest.fn().mockResolvedValue(null)

		render(
			<AddArmoryItemDialog
				resourceName='Weapon'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={saveHandler}
			/>
		)

		const weaponField = screen.getByLabelText('Weapon')
		await userEvent.type(weaponField, 'Non-existent Weapon')

		const typeField = screen.getByLabelText('Type')
		await userEvent.click(typeField)

		const typeOption = screen.getByRole('option', { name: /smgs/i })
		await userEvent.click(typeOption)

		const saveButton = await screen.findByRole('button', { name: 'Save' })
		await userEvent.click(saveButton)

		expect(saveHandler).toBeCalledWith({
			type: 'smgs',
			platform: 'Non-existent Weapon',
			brand: '',
			model: '',
			nickname: '',
		})
	})

	it('should autocomplete first armory item result when pressing enter', async () => {
		render(
			<AddArmoryItemDialog
				resourceName='Weapon'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={jest.fn()}
			/>
		)

		const weaponField = screen.getByLabelText('Weapon')
		await userEvent.type(weaponField, 'ak{enter}')

		expect(weaponField).toHaveValue('AK47')
	})

	it('should not show type if a known armory item is typed', async () => {
		const saveHandler = jest.fn().mockResolvedValue(null)

		render(
			<AddArmoryItemDialog
				resourceName='Weapon'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={saveHandler}
			/>
		)

		const weaponField = screen.getByLabelText('Weapon')
		await userEvent.type(weaponField, 'mp5')

		expect(screen.queryByLabelText('Type')).not.toBeInTheDocument()

		const saveButton = await screen.findByRole('button', { name: 'Save' })
		await userEvent.click(saveButton)

		expect(saveHandler).toBeCalledWith({
			type: 'smgs',
			platform: 'mp5',
			brand: '',
			model: '',
			nickname: '',
		})
	})

	it('should not show type if armory item is a known one after deleting some text', async () => {
		const saveHandler = jest.fn().mockResolvedValue(null)

		render(
			<AddArmoryItemDialog
				resourceName='Weapon'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={saveHandler}
			/>
		)

		const weaponField = screen.getByLabelText('Weapon')
		await userEvent.type(weaponField, 'mp5a')

		expect(screen.getByLabelText('Type')).toBeInTheDocument()

		await userEvent.type(weaponField, '{backspace}')
		expect(screen.queryByLabelText('Type')).not.toBeInTheDocument()
	})

	it('should show type if armory item is not a known one after adding some text', async () => {
		const saveHandler = jest.fn().mockResolvedValue(null)

		render(
			<AddArmoryItemDialog
				resourceName='Weapon'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={saveHandler}
			/>
		)

		const weaponField = screen.getByLabelText('Weapon')
		await userEvent.type(weaponField, 'p9')

		const armoryItemOption = await screen.findByRole('option', { name: /p90/i })
		await userEvent.click(armoryItemOption)

		expect(screen.queryByLabelText('Type')).not.toBeInTheDocument()

		await userEvent.type(weaponField, 'Z')
		expect(screen.getByLabelText('Type')).toBeInTheDocument()
	})

	it('should allow users to manually type in their brand', async () => {
		const saveHandler = jest.fn().mockResolvedValue(null)

		render(
			<AddArmoryItemDialog
				resourceName='Weapon'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={saveHandler}
			/>
		)

		const weaponField = screen.getByLabelText('Weapon')
		await userEvent.type(weaponField, 'ak')

		const weaponOption = screen.getByRole('option', { name: /ak74u/i })
		await userEvent.click(weaponOption)

		const brandField = screen.getByLabelText('Brand')
		await userEvent.type(brandField, 'Some unknown brand')

		const saveButton = await screen.findByRole('button', { name: 'Save' })
		await userEvent.click(saveButton)

		expect(saveHandler).toBeCalledWith({
			type: 'rifles',
			platform: 'AK74U',
			brand: 'Some unknown brand',
			model: '',
			nickname: '',
		})
	})

	it('should autocomplete first brand result when pressing enter', async () => {
		render(
			<AddArmoryItemDialog
				resourceName='Weapon'
				resourceTitle='weapon'
				resourceKey='weapons'
				isOpen={true}
				onClose={jest.fn()}
				onSave={jest.fn()}
			/>
		)

		const brandField = screen.getByLabelText('Brand')
		await userEvent.type(brandField, 'toky{enter}')

		expect(brandField).toHaveValue('Tokyo Marui')
	})

	describe('validation', () => {
		it('should require an armory item', async () => {
			const saveHandler = jest.fn().mockResolvedValue(null)

			render(
				<AddArmoryItemDialog
					resourceName='Weapon'
					resourceTitle='weapon'
					resourceKey='weapons'
					isOpen={true}
					onClose={jest.fn()}
					onSave={saveHandler}
				/>
			)

			const weaponField = screen.getByLabelText('Weapon')
			await userEvent.type(weaponField, 'a{backspace}')

			expect(screen.queryByLabelText('Type')).not.toBeInTheDocument()
			expect(screen.getByText('Weapon is required.')).toBeInTheDocument()
		})

		it('should require an armory item type', async () => {
			const saveHandler = jest.fn().mockResolvedValue(null)

			render(
				<AddArmoryItemDialog
					resourceName='Weapon'
					resourceTitle='weapon'
					resourceKey='weapons'
					isOpen={true}
					onClose={jest.fn()}
					onSave={saveHandler}
				/>
			)

			const weaponField = screen.getByLabelText('Weapon')
			await userEvent.type(weaponField, 'foo')

			expect(screen.getByText('Type is required.')).toBeInTheDocument()
		})

		it('should show validation error if armory item is too long', async () => {
			const saveHandler = jest.fn().mockResolvedValue(null)

			render(
				<AddArmoryItemDialog
					resourceName='Weapon'
					resourceTitle='weapon'
					resourceKey='weapons'
					isOpen={true}
					onClose={jest.fn()}
					onSave={saveHandler}
				/>
			)

			const weaponField = screen.getByLabelText('Weapon')
			await userEvent.type(weaponField, '{a>65/}')

			expect(screen.getByText('Cannot exceed 64 characters.')).toBeInTheDocument()
		})

		it('should show validation error if brand is too long', async () => {
			render(
				<AddArmoryItemDialog
					resourceName='Weapon'
					resourceTitle='weapon'
					resourceKey='weapons'
					isOpen={true}
					onClose={jest.fn()}
					onSave={jest.fn()}
				/>
			)

			const weaponField = screen.getByLabelText('Weapon')
			await userEvent.type(weaponField, 'ak')

			const weaponOption = screen.getByRole('option', { name: /ak74u/i })
			await userEvent.click(weaponOption)

			const brandField = screen.getByLabelText('Brand')
			await userEvent.type(brandField, '{a>65/}')

			expect(screen.getByText('Cannot exceed 64 characters.')).toBeInTheDocument()

			const saveButton = await screen.findByRole('button', { name: 'Save' })
			expect(saveButton).toBeDisabled()
		})

		it('should show validation error if model is too long', async () => {
			render(
				<AddArmoryItemDialog
					resourceName='Weapon'
					resourceTitle='weapon'
					resourceKey='weapons'
					isOpen={true}
					onClose={jest.fn()}
					onSave={jest.fn()}
				/>
			)

			const weaponField = screen.getByLabelText('Weapon')
			await userEvent.type(weaponField, 'ak')

			const weaponOption = screen.getByRole('option', { name: /ak74u/i })
			await userEvent.click(weaponOption)

			const modelField = screen.getByLabelText('Model')
			await userEvent.type(modelField, '{a>65/}')

			expect(screen.getByText('Cannot exceed 64 characters.')).toBeInTheDocument()

			const saveButton = await screen.findByRole('button', { name: 'Save' })
			expect(saveButton).toBeDisabled()
		})

		it('should show validation error if nickname is too long', async () => {
			render(
				<AddArmoryItemDialog
					resourceName='Weapon'
					resourceTitle='weapon'
					resourceKey='weapons'
					isOpen={true}
					onClose={jest.fn()}
					onSave={jest.fn()}
				/>
			)

			const weaponField = screen.getByLabelText('Weapon')
			await userEvent.type(weaponField, 'ak')

			const weaponOption = screen.getByRole('option', { name: /ak74u/i })
			await userEvent.click(weaponOption)

			const nicknameField = screen.getByLabelText('Nickname')
			await userEvent.type(nicknameField, '{a>65/}')

			expect(screen.getByText('Cannot exceed 64 characters.')).toBeInTheDocument()

			const saveButton = await screen.findByRole('button', { name: 'Save' })
			expect(saveButton).toBeDisabled()
		})
	})
})
