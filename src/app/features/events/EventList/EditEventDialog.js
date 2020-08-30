import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	FormControlLabel,
	FormHelperText,
	TextField,
	Button,
	Checkbox,
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import { Error } from 'app/shared/state'

let EditEventDialog = ({ event, date, isOpen, onSave, onClose }) => {
	let [error, setError] = useState()
	let { register, handleSubmit, formState, control } = useForm({
		defaultValues: {
			name: event.name,
			location: event.location,
			date: date || event.date,
			public: event.public,
		},
		mode: 'onChange',
	})

	let handleSave = useCallback(
		(updatedEvent) => {
			setError(null)

			onSave(updatedEvent).catch((err) => setError('An error occurred while saving event.'))
		},
		[onSave]
	)

	return (
		<Dialog fullWidth={true} open={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(handleSave)}>
				<DialogTitle>{event.name ? 'Edit' : 'Add'} event</DialogTitle>

				<DialogContent>
					{error && <Error error={error} fillBackground={true} />}

					<TextField
						inputRef={register({ required: true })}
						name='name'
						label='Name'
						type='text'
						fullWidth={true}
					/>

					<TextField
						inputRef={register({ required: true })}
						name='location'
						label='Location'
						type='text'
						fullWidth={true}
					/>

					<MuiPickersUtilsProvider utils={MomentUtils}>
						<Controller
							name='date'
							rules={{ required: true }}
							as={DateTimePicker}
							control={control}
							onChange={([date]) => date.toDate()}
							fullWidth={true}
							label='Date'
						/>
					</MuiPickersUtilsProvider>

					<FormControl>
						<FormControlLabel
							label='Make this event public'
							control={<Checkbox inputRef={register} name='public' />}
						/>
						<FormHelperText>
							If public, users with the event link will be able to add themselves to the event and add
							their own loadouts.
						</FormHelperText>
					</FormControl>
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

EditEventDialog.propTypes = {
	date: PropTypes.instanceOf(Date),
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	event: PropTypes.shape({
		name: PropTypes.string.isRequired,
		date: PropTypes.object,
		location: PropTypes.string.isRequired,
		public: PropTypes.bool.isRequired,
	}),
}

EditEventDialog.defaultProps = {
	date: null,
	event: {
		name: '',
		location: '',
		date: null,
		public: false,
	},
}

export default EditEventDialog
