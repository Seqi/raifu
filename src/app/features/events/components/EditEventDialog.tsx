import { useState, useCallback, useEffect, FC } from 'react'
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
	Button,
	Checkbox,
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import { Error } from 'app/shared/state'
import { Event, EventPropShape } from '../models'
import { TextFieldError } from 'app/shared/extensions/material/TextFieldError'

const BlankEvent: Event = {
	id: '',
	createdAt: new Date(),
	updatedAt: new Date(),
	date: new Date(),
	name: '',
	organiserUid: '',
	location: '',
	public: false,

	getTitle: () => '',
	getSubtitle: () => '',
}

export type EventUpdate = {
	name: string
	location: string
	date: Date
	public: boolean
	// TODO: Type
	loadout: any
}

export type EditEventDialogProps = {
	event?: Event | null
	date?: Date | null
	isOpen: boolean
	onSave: (evt: EventUpdate) => any
	onClose: () => any
}

export const EditEventDialog: FC<EditEventDialogProps> = ({
	event = BlankEvent,
	date,
	isOpen,
	onSave,
	onClose,
}) => {
	let [error, setError] = useState<string | null>(null)
	let { register, handleSubmit, formState, control, reset } = useForm<EventUpdate>({
		mode: 'onChange',
	})

	// If an updated event comes in, reset the form to reflect it
	useEffect(() => {
		if (event) {
			reset({
				name: event.name,
				location: event.location,
				date: date || event.date,
				public: event.public,
			})
		}
	}, [event, date, reset])

	let handleSave = useCallback(
		(updatedEvent: EventUpdate) => {
			setError(null)

			onSave(updatedEvent)
				.catch((err: any) => {
					setError('An error occurred while saving event.')
				})
		},
		[onSave],
	)

	// Required to read here due to formState being wrapped with Proxy
	const { isDirty, isValid, isSubmitting } = formState

	return (
		<Dialog fullWidth={ true } open={ isOpen } onClose={ onClose }>
			<form onSubmit={ handleSubmit(handleSave) }>
				<DialogTitle>{event!.name ? 'Edit' : 'Add'} event</DialogTitle>

				<DialogContent>
					{error && <Error error={ error } fillBackground={ true } />}

					<TextFieldError
						inputRef={ register({
							required: { value: true, message: 'Name is required.' },
							maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
						}) }
						name='name'
						label='Name'
						type='text'
						fullWidth={ true }
						formState={ formState }
					/>

					<TextFieldError
						inputRef={ register({
							required: { value: true, message: 'Location is required.' },
							maxLength: { value: 64, message: 'Cannot exceed 64 characters.' },
						}) }
						name='location'
						label='Location'
						type='text'
						fullWidth={ true }
						formState={ formState }
					/>

					<MuiPickersUtilsProvider utils={ MomentUtils }>
						<Controller
							name='date'
							rules={ {
								required: { value: true, message: 'Date is required.' },
							} }
							control={ control }
							render={ ({ onChange, onBlur, value, ref }) => (
								<DateTimePicker
									inputRef={ ref }
									onBlur={ onBlur }
									onChange={ (e) => onChange(e?.toDate()) }
									label='Date'
									fullWidth={ true }
									value={ value }
									inputProps={ {
										helperText: formState.errors.date?.message,
										error: !!formState.errors.date,
									} }
								/>
							) }
						/>
					</MuiPickersUtilsProvider>

					<Controller
						name='public'
						control={ control }
						render={ ({ ref, onChange, onBlur, value, ...props }) => (
							<FormControl>
								<FormControlLabel
									label='Make this event public'
									control={
										<Checkbox
											{ ...props }
											inputRef={ ref }
											checked={ value }
											onChange={ (e) => onChange(e.target.checked) }
										/>
									}
								/>
								<FormHelperText>
									If public, users with the event link will be able to add themselves to the event and add
									their own loadouts.
								</FormHelperText>
							</FormControl>
						) }
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={ onClose }>Cancel</Button>
					<Button
						disabled={ !isDirty || !isValid || isSubmitting }
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
	date: PropTypes.oneOfType([PropTypes.instanceOf(Date)]),
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	event: PropTypes.shape(EventPropShape),
}

EditEventDialog.defaultProps = {
	date: null,
	event: BlankEvent,
}

export default EditEventDialog
