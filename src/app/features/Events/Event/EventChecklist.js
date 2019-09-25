import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox } from '@material-ui/core'

const EventChecklist = ({ title, loadout, isOpen, onClose }) => {

	function getAllItems(loadout) {
		let items = []

		if (loadout.weapons) {
			loadout.weapons.forEach(weapon => {
				items.push(weapon)

				if (weapon.attachments) {
					weapon.attachments.forEach(items.push)
				}
			})
		}
		
		if (loadout.gear) {
			loadout.gear.forEach(items.push)
		}
	}

	return (
		<Dialog>
			<DialogTitle>Checklist for {title} </DialogTitle>

			<DialogContent>
				{
					getAllItems(loadout)
						.map((item, i) => (
							<Checkbox key={ i } >item.getTitle()</Checkbox>
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
