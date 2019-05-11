import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import database from '../../../../../firebase/database'

export default function AddLoadoutToEventDialog({eventTitle, isOpen, onSave, onClose}) {
	let [loadouts, setLoadouts] = useState([])
	let [loadoutId, setLoadoutId] = useState('')
	let isUnmounted = false

	useEffect(() => {
		database.loadouts
			.get()
			.then((loadouts) => {
				if (!isUnmounted) {
					setLoadouts(loadouts)
				}
			})

		return () => isUnmounted = true
	}, [])

	return (
		<Dialog fullWidth={ true } open={ isOpen }>
			<DialogTitle>Set loadout for { eventTitle }</DialogTitle>
			<DialogContent>				
				<TextField
					label='Loadout'
					fullWidth={ true }
					value={ loadoutId }
					onChange={ (e) => setLoadoutId(e.target.value) }
					select={ true }
					SelectProps={ { name: 'loadoutId' } }
				>
					{loadouts.map((loadout) => (
						<MenuItem key={ loadout.id } value={ loadout.id }>
							{ loadout.getTitle() }
						</MenuItem>
					))}
				</TextField>
			</DialogContent>
			
			<DialogActions>
				<Button onClick={ onClose }>Cancel</Button>
				<Button
					disabled={ !loadoutId }
					variant='contained'
					onClick={ () => onSave(loadouts.find(l => l.id === loadoutId)) }
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