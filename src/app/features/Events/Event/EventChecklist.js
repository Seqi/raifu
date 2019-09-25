import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel, Typography } from '@material-ui/core'

let checkboxListStyle = {
	display: 'flex',
	flexDirection: 'column'
}

const EventChecklist = ({ title, loadout, isOpen, onClose }) => {
	function getAllWeapons(loadout) {
		return loadout.weapons || []
	}

	function getAllAttachments(loadout) {
		let attachments = []
		
		if (loadout.weapons) {
			loadout.weapons.forEach(weapon => {
				if (weapon.attachments) {
					weapon.attachments.forEach(attachment => attachments.push(attachment))
				}
			})
		}

		return attachments
	}

	function getAllGear(loadout) {
		return loadout.gear || []
	}

	// eslint-disable-next-line react/no-multi-comp
	function toCheckbox(item, index) {
		return <FormControlLabel key={ index } label={ item.getTitle() } control={ <Checkbox /> } />
	}

	return (
		<Dialog open={ isOpen }>
			<DialogTitle>Checklist for {title} </DialogTitle>

			<DialogContent>
				<div style={ {display: 'flex', justifyContent: 'space-between' } }>
					<div style={ checkboxListStyle }>	
						<Typography variant='h6'>Weapons</Typography>
						{
							getAllWeapons(loadout)
								.map(toCheckbox)
						}
					</div>
				
					<div style={ checkboxListStyle }>
						<Typography variant='h6'>Attachments</Typography>
						{
							getAllAttachments(loadout)
								.map(toCheckbox)
						}
					</div>
				</div>
				
				<Typography variant='h6'>Gear</Typography>
				{
					getAllGear(loadout)
						.map(toCheckbox)
				}
			</DialogContent>

			<DialogActions>
				<Button onClick={ onClose } color='primary' variant='contained'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

EventChecklist.propTypes = {
	title: PropTypes.string.isRequired,
	loadout: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
}

export default EventChecklist
