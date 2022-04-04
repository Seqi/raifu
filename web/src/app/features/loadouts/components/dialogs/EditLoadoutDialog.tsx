import { useCallback, useState, useEffect, FC } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'

import { Error } from 'app/shared/state'
import { Loadout, LoadoutPropType } from '../../models'
import { FormTextField } from 'app/shared/extensions/material/FormTextField'

type EditLoadoutDialogProps = {
	loadout?: Loadout | null
	isOpen: boolean
	onSave: (loadout: Loadout) => Promise<any>
	onClose: () => any
}

export type LoadoutUpdate = {
	name: string
}

export const EditLoadoutDialog: FC<EditLoadoutDialogProps> = ({
	loadout,
	isOpen,
	onSave,
	onClose,
}) => {
	let [error, setError] = useState<string | null>(null)

	let { handleSubmit, formState, control } = useForm<LoadoutUpdate>({
		mode: 'onChange',
		defaultValues: {
			name: loadout?.name || '',
		},
	})
	const { isValid, isDirty, isSubmitting } = formState

	let handleSave = useCallback(
		(loadout) => {
			setError(null)

			return onSave(loadout)
				.then(onClose)
				.catch((err) => setError('An error occurred while saving loadout.'))
		},
		[onClose, onSave]
	)

	useEffect(() => {
		!isOpen && setError(null)
	}, [isOpen])

	return (
		<Dialog fullWidth={true} open={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(handleSave)}>
				<DialogTitle>{loadout ? 'Edit' : 'Add'} loadout</DialogTitle>

				<DialogContent>
					{error && <Error error={error} fillBackground={true} />}

					<FormTextField
						form={{
							name: 'name',
							control,
							rules: {
								required: { value: true, message: 'Name is required.' },
								maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
							},
						}}
						id='loadout-name'
						label='Name'
						type='text'
						fullWidth={true}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						disabled={!isDirty || !isValid || isSubmitting}
						variant='contained'
						color='primary'
						type='submit'
					>
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}

EditLoadoutDialog.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType),
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
}

EditLoadoutDialog.defaultProps = {
	loadout: null,
}

export default EditLoadoutDialog
