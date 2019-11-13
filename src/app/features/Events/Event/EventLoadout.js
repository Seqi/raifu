import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

import LoadoutView from 'app/shared/components/Views/Loadout/LoadoutView'
import ConfirmDeleteDialog from 'app/shared/components/Cards/ConfirmDeleteDialog'

const EventLoadout = ({ event, removeLoadout }) => {
	let [ activeDialog, setActiveDialog ] = useState() 

	let usersLoadout = event.users[0].loadout

	return (
		<div>
			<Button 
				color='primary' 
				variant='outlined'
				style={ { 
					width: '100%',
					margin: '8px 0px'
				} }
				onClick={ () => setActiveDialog('remove') }
			>
				Remove Loadout ({ usersLoadout.getTitle() })
			</Button>
					
			<LoadoutView loadout={ usersLoadout } /> 

			<ConfirmDeleteDialog 
				verb='Remove'
				title={ `${usersLoadout.getTitle()} from ${event.getTitle()}` }
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
	removeLoadout: PropTypes.func.isRequired,
}