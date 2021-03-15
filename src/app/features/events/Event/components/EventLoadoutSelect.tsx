import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'

import { LoadoutAdd, LoadoutSeparator } from 'app/features/loadouts'
import AddLoadoutToEventDialog from '../dialogs/AddLoadoutToEventDialog'
import Event from 'app/shared/models/event'

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
	event: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		date: PropTypes.instanceOf(Date).isRequired,
		location: PropTypes.string.isRequired,
		organiser_uid: PropTypes.string.isRequired,
		public: PropTypes.bool.isRequired,
		createdAt: PropTypes.instanceOf(Date).isRequired,
		updatedAt: PropTypes.instanceOf(Date).isRequired,
		owner: PropTypes.string.isRequired,
		isGroup: PropTypes.bool.isRequired,

		users: PropTypes.array.isRequired,

		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
	}).isRequired,
	setLoadout: PropTypes.func.isRequired,
}
