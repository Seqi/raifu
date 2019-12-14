import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { LoadoutAdd, LoadoutSeparator } from 'app/features/Loadouts'
import AddLoadoutToEventDialog from './AddLoadoutToEventDialog/AddLoadoutToEventDialog'

const EventLoadoutSelect = ({ event, setLoadout }) => {
	let [activeDialog, setActiveDialog] = useState()

	return (
		<React.Fragment>
			<div style={ { paddingTop: '24px' } }>
				<LoadoutSeparator showBottom={ true }>
					<LoadoutAdd onClick={ () => setActiveDialog('add') } />
				</LoadoutSeparator>
			</div>

			<AddLoadoutToEventDialog 
				eventTitle={ event.getTitle() }
				isOpen={ activeDialog === 'add' }
				onSave={ (loadoutId) => setLoadout(loadoutId) }
				onClose={ () => setActiveDialog(null) } />
		</React.Fragment>
	)
}

export default EventLoadoutSelect

EventLoadoutSelect.propTypes = {
	event: PropTypes.object.isRequired,
	setLoadout: PropTypes.func.isRequired,
}