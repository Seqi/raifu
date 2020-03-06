import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	MenuItem,
	TextField,
	Button
} from '@material-ui/core'

import { loadouts as loadoutService } from 'app/data/api'
import { Loading, Error } from 'app/shared/state'

export default function AddLoadoutToEventDialog({eventTitle, isOpen, onSave, onClose}) {
	let [loadouts, setLoadouts] = useState({ data: [], loading: true, error: null })
	let [loadoutId, setLoadoutId] = useState('')
	let [saveError, setSaveError] = useState(null)

	useEffect(() => { loadLoadouts() }, [])

	let loadLoadouts = () => {
		setLoadouts(prevLoadout => ({ ...prevLoadout, error: null, loading: true }))
		
		loadoutService
			.get()
			.then((loadouts) => {
				setLoadouts({ data: loadouts, loading: false, error: null })
			})
			.catch((err) => {
				setLoadouts({ data: [], loading: false, error: 'An error occurred while loading available loadouts.' })
			})
	}

	let save = () => {
		setSaveError(false)

		onSave(loadoutId)
			.catch(err => setSaveError('An error occurred while adding loadout to event.'))
	}

	return (
		<Dialog fullWidth={ true } open={ isOpen }>
			<DialogTitle>Set loadout for { eventTitle }</DialogTitle>
			<DialogContent>			

				{ loadouts.error && !loadouts.loading && <Error error={ loadouts.error } onRetry={ loadLoadouts } /> }
				{ loadouts.loading && !loadouts.error && <Loading /> }
				{ saveError && <Error error={ saveError } fillBackground={ true } /> }

				{ !loadouts.error && !loadouts.loading && (
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
								{ loadout.getTitle() }
							</MenuItem>
						))}
					</TextField>
				)}
			</DialogContent>
			
			<DialogActions>
				<Button onClick={ onClose }>Cancel</Button>
				<Button
					disabled={ !loadoutId || loadouts.loading }
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
	onSave: PropTypes.func.isRequired
}