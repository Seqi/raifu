import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { Loading, Error } from 'app/shared/components'

import database from '../../../../../firebase/database'

export default function AddLoadoutToEventDialog({eventTitle, isOpen, onSave, onClose}) {
	let [loadouts, setLoadouts] = useState({ data: [], loading: true, error: null })
	let [loadoutId, setLoadoutId] = useState('')
	let [saveError, setSaveError] = useState(null)

	useEffect(() => {
		loadLoadouts()
	}, [])

	let loadLoadouts = () => {
		setLoadouts(prevLoadout => ({ ...prevLoadout, error: null, loading: true }))
		
		database.loadouts
			.get()
			.then((loadouts) => {
				setLoadouts({ data: loadouts, loading: false, error: null })
			})
			.catch((err) => {
				setLoadouts({ data: [], loading: false, error: err.statusText || err.message || err })
			})
	}

	let save = () => {
		setSaveError(false)

		onSave(loadouts.data.find(l => l.id === loadoutId))
			.catch(err => setSaveError(err.statusText || err.message || err))
	}

	return (
		<Dialog fullWidth={ true } open={ isOpen }>
			<DialogTitle>Set loadout for { eventTitle }</DialogTitle>
			<DialogContent>			

				{ loadouts.error && !loadouts.loading && <Error error={ loadouts.error } onRetry={ loadLoadouts } /> }
				{ loadouts.loading && !loadouts.error && <Loading /> }
				{ saveError && <Error error={ saveError } fillBackground={ true } style={ { padding: '8px 0', marginBottom: '8px' } } /> }

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