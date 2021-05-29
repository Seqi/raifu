import { useState, useEffect, FC } from 'react'
import PropTypes from 'prop-types'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	MenuItem,
	TextField,
	Button,
} from '@material-ui/core'

import { loadouts as loadoutService } from 'app/data/api'
import { Loading, Error } from 'app/shared/state'
import { Loadout } from 'app/features/loadouts'

type AddLoadoutToEventDialogProps = {
	eventTitle: string
	isOpen: boolean
	onSave: (loadoutId: string) => Promise<any>
	onClose: () => any
}

type LoadoutFetchState = {
	data: Loadout[]
	loading: boolean
	error: string | null
}

type SubmissionState = {
	submitting: boolean
	error: boolean
}

const AddLoadoutToEventDialog: FC<AddLoadoutToEventDialogProps> = ({
	eventTitle,
	isOpen,
	onSave,
	onClose,
}) => {
	let [loadouts, setLoadouts] = useState<LoadoutFetchState>({
		data: [],
		loading: true,
		error: null,
	})
	let [loadoutId, setLoadoutId] = useState<string>('')
	let [submitState, setSubmitState] = useState<SubmissionState>({
		submitting: false,
		error: false,
	})

	useEffect(() => {
		loadLoadouts()
	}, [])

	let loadLoadouts = () => {
		setLoadouts((prevLoadout) => ({ ...prevLoadout, error: null, loading: true }))

		loadoutService
			.get()
			.then((loadouts) => {
				setLoadouts({ data: loadouts, loading: false, error: null })
			})
			.catch((err) => {
				setLoadouts({
					data: [],
					loading: false,
					error: 'An error occurred while loading available loadouts.',
				})
			})
	}

	let save = () => {
		setSubmitState({ submitting: true, error: false })

		onSave(loadoutId)
			.then(() => onClose())
			.catch((err) => setSubmitState({ submitting: false, error: true }))
	}

	return (
		<Dialog fullWidth={ true } open={ isOpen }>
			<DialogTitle>Set loadout for {eventTitle}</DialogTitle>
			<DialogContent>
				{loadouts.error && !loadouts.loading && (
					<Error error={ loadouts.error } onRetry={ loadLoadouts } />
				)}
				{loadouts.loading && !loadouts.error && <Loading />}
				{submitState.error && (
					<Error
						error={ 'An error occurred while adding loadout to event.' }
						fillBackground={ true }
					/>
				)}

				{!loadouts.error && !loadouts.loading && (
					<TextField
						label='Loadout'
						fullWidth={ true }
						value={ loadoutId }
						onChange={ (e) => setLoadoutId(e.target.value) }
						select={ true }
						SelectProps={ { name: 'loadoutId' } }
					>
						{loadouts.data.map((loadout) => (
							<MenuItem key={ loadout.id } value={ loadout.id }>
								{loadout.getTitle()}
							</MenuItem>
						))}
					</TextField>
				)}
			</DialogContent>

			<DialogActions>
				<Button onClick={ onClose }>Cancel</Button>
				<Button
					disabled={ !loadoutId || loadouts.loading || submitState.submitting }
					variant='contained'
					onClick={ save }
					color='primary'
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	)
}

AddLoadoutToEventDialog.propTypes = {
	eventTitle: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
}

export default AddLoadoutToEventDialog
