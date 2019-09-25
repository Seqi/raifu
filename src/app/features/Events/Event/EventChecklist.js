import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormControlLabel } from '@material-ui/core'

const EventChecklist = ({ title, loadout, isOpen, onClose }) => {

	function getAllItems(loadout) {
		let items = []

		if (loadout.weapons) {
			loadout.weapons.forEach(weapon => {
				items.push(weapon)

				if (weapon.attachments) {
					weapon.attachments.forEach(attachment => items.push(attachment))
				}
			})
		}
		
		if (loadout.gear) {
			loadout.gear.forEach(gear => items.push(gear))
		}

		console.log(items)

		return items
	}

	return (
		<Dialog open={ isOpen }>
			<DialogTitle>Checklist for {title} </DialogTitle>

			<DialogContent style={ {display: 'flex', flexDirection: 'column'} }>
				{
					getAllItems(loadout)
						.map((item, i) => (
							<FormControlLabel key={ i } label={ item.getTitle() }
								control={ <Checkbox /> }
							/>
						))
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
