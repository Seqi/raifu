import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { LoadoutAdd, LoadoutSeparator } from 'app/features/loadouts'
import AddLoadoutToEventDialog from './AddLoadoutToEventDialog'

const EventLoadoutSelect = ({ event, setLoadout }) => {
	let [activeDialog, setActiveDialog] = useState()

	return (
		<React.Fragment>
			<LoadoutSeparator>
				<LoadoutAdd onClick={ () => setActiveDialog('add') } />
			</LoadoutSeparator>

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