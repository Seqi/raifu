import React from 'react'
import PropTypes from 'prop-types'

import { 
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Checkbox,
	FormControlLabel 
} from '@material-ui/core'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'

let checkboxListStyle = {
	display: 'flex',
	flexDirection: 'column'
}

const EventChecklistDialog = ({ title, loadout, isOpen, onClose }) => {
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
					<div style={ {...checkboxListStyle,  paddingRight: '16px' } }>	
						<ReactiveTitle variant='h5' mobileVariant='h6'>Weapons</ReactiveTitle>
						{
							getAllWeapons(loadout)
								.map(toCheckbox)
						}
					</div>
				
					<div style={ {...checkboxListStyle,  paddingLeft: '16px' } }>
						<ReactiveTitle variant='h5' mobileVariant='h6'>Attachments</ReactiveTitle>
						{
							getAllAttachments(loadout)
								.map(toCheckbox)
						}
					</div>
				</div>
				
				<div>	
					<ReactiveTitle variant='h5' mobileVariant='h6'>Gear</ReactiveTitle>
					{
						getAllGear(loadout)
							.map(toCheckbox)
					}
				</div>
			</DialogContent>

			<DialogActions>
				<Button onClick={ onClose } color='primary' variant='contained'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

EventChecklistDialog.propTypes = {
	title: PropTypes.string.isRequired,
	loadout: PropTypes.object.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
}

export default EventChecklistDialog
