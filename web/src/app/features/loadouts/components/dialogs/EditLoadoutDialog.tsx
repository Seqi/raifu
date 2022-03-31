import { useCallback, useState, useEffect, FC } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'

import { Error } from 'app/shared/state'
import { FormTextField } from 'app/shared/extensions/material/FormTextField'

import { Loadout, LoadoutPropType } from '../../models'

type EditLoadoutDialogProps = {
	loadout?: Loadout | null
	action: 'Add' | 'Edit'
	isOpen: boolean
	onSave: (loadout: Loadout) => Promise<any>
	onClose: () => any
}

type LoadoutUpdate = {
	name: string
}

const EditLoadoutDialog: FC<EditLoadoutDialogProps> = ({
	loadout,
	action,
	isOpen,
	onSave,
	onClose,
}) => {
	const [error, setError] = useState<string | null>(null)

	const { handleSubmit, formState, control } = useForm<LoadoutUpdate>({
		mode: 'onChange',
		defaultValues: {
			name: loadout?.name,
		},
	})

	const handleSave = useCallback(
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
				<DialogTitle>{action} loadout</DialogTitle>

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
						label='Name'
						type='text'
						fullWidth={true}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						disabled={!formState.isValid || formState.isSubmitting}
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
	action: PropTypes.oneOf(['Add', 'Edit'] as const).isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
}

EditLoadoutDialog.defaultProps = {
	loadout: {
		name: '',
		id: '',
		shared: false,
		getTitle: () => '',
		getSubtitle: () => '',
		weapons: [],
		gear: [],
		clothing: [],
		createdAt: '',
		updatedAt: '',
	},
}

export default EditLoadoutDialog
