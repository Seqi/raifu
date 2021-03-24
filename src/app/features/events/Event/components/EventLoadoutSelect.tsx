import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'

import { LoadoutAdd, LoadoutSeparator } from 'app/features/loadouts'
import AddLoadoutToEventDialog from '../dialogs/AddLoadoutToEventDialog'
import { Event, EventPropShape } from 'app/shared/models/event'

type EventLoadoutSelectProps = {
	event: Event
	setLoadout: (loadoutId: string) => Promise<any>
}

const EventLoadoutSelect: FC<EventLoadoutSelectProps> = ({ event, setLoadout }) => {
	let [activeDialog, setActiveDialog] = useState<'add' | null>()

	return (
		<React.Fragment>
			<LoadoutSeparator>
				<LoadoutAdd onClick={ () => setActiveDialog('add') } />
			</LoadoutSeparator>

			<AddLoadoutToEventDialog
				eventTitle={ event.getTitle() }
				isOpen={ activeDialog === 'add' }
				onSave={ setLoadout }
				onClose={ () => setActiveDialog(null) }
			/>
		</React.Fragment>
	)
}

export default EventLoadoutSelect

EventLoadoutSelect.propTypes = {
	event: PropTypes.shape(EventPropShape).isRequired,
	setLoadout: PropTypes.func.isRequired,
}
