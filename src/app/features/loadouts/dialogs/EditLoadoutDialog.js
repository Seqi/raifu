import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import { 
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button 
} from '@material-ui/core'

import { Error } from 'app/shared/state'

let EditLoadoutDialog = ({ loadout, action, isOpen, onSave, onClose }) => {
	let [error, setError] = useState(null)
	let { register, handleSubmit, formState, errors } = useForm({ 
		mode: 'onChange', 
		defaultValues: { 
			name: loadout.name
		}
	})

	let handleSave = useCallback((loadout) => {
		setError(null)

		return onSave(loadout)
			.then(onClose)
			.catch(err => setError('An error occurred while saving loadout.'))
	}, [onClose, onSave])

	useEffect(() => { !isOpen && setError(null) }, [isOpen])

	return (
		<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
			<form onSubmit={ handleSubmit(handleSave) }>
				<DialogTitle>{action} loadout</DialogTitle>

				<DialogContent>
					{ error && <Error error={ error } fillBackground={ true } /> }

					<TextField
						inputRef={ register({required: true}) }
						name='name'
						label='Name'
						type='text'
						fullWidth={ true }
						error={ !!errors.name }
						helperText={ errors.name && 'Name is required.' }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						disabled={ !formState.isValid || formState.isSubmitting }
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
	loadout: PropTypes.shape({
		name: PropTypes.string.isRequired,
	}),
	action: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

EditLoadoutDialog.defaultProps = {
	loadout: { name: '' }
}

export default EditLoadoutDialog
