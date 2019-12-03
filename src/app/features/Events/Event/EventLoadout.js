import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

import LoadoutView from 'app/shared/components/Views/Loadout/LoadoutView'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'

const EventLoadout = ({ event, activeUserIndex, removeLoadout }) => {
	let [ activeDialog, setActiveDialog ] = useState() 

	let activeLoadout = event.users[activeUserIndex].loadout

	// Safe assumption!
	let viewingAuthenticatedUser = activeUserIndex === 0

	return (
		<div>
			{ viewingAuthenticatedUser ?
				<Button 
					color='primary' 
					variant='outlined'
					style={ { 
						width: '100%',
						margin: '8px 0px'
					} }
					onClick={ () => setActiveDialog('remove') }
				>
					Remove Loadout ({ activeLoadout.getTitle() })
				</Button> :

				// Lazy way to get the lines to match
				<div style={ {marginTop: '24px'} }/>
			}
					
			<LoadoutView loadout={ activeLoadout } /> 

			<ConfirmDeleteDialog 
				verb='Remove'
				title={ `${activeLoadout.getTitle()} from ${event.getTitle()}` }
				isOpen={ activeDialog === 'remove' }
				onClose={ () => setActiveDialog(null) }
				onConfirm={ () => removeLoadout() }
			/>
		</div>
	)
}

export default EventLoadout

EventLoadout.propTypes = {
	event: PropTypes.object.isRequired,
	activeUserIndex: PropTypes.number.isRequired,
	removeLoadout: PropTypes.func.isRequired,
}