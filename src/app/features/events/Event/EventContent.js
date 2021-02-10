import React, { useState } from 'react'
import PropTypes from 'prop-types'

import EventMyLoadout from './components/EventMyLoadout'
import EventGuestLoadout from './components/EventGuestLoadout'
import EventInvite from './components/EventInvite'
import EventUserSelect from './components/EventUserSelect'

const EventContent = ({ event, onEventJoined, onLoadoutRemoved, onLoadoutAdded }) => {
	let [selectedUserIndex, setSelectedUserIndex] = useState(0)

	const selectedUser = event.users[selectedUserIndex]
	const amISelected = selectedUserIndex === 0

	if (event.users.length === 0) {
		return <EventInvite event={ event } onJoin={ onEventJoined } />
	}

	return (
		<React.Fragment>
			{event.users.length > 1 && (
				<EventUserSelect
					users={ event.users }
					userIndex={ selectedUserIndex }
					onUserIndexChange={ setSelectedUserIndex }
				/>
			)}

			{amISelected ? (
				<EventMyLoadout
					event={ event }
					user={ selectedUser }
					addLoadout={ onLoadoutAdded }
					removeLoadout={ onLoadoutRemoved }
				/>
			) : (
				<EventGuestLoadout user={ selectedUser } />
			)}
		</React.Fragment>
	)
}

EventContent.propTypes = {
	event: PropTypes.shape({
		users: PropTypes.array.isRequired
	}).isRequired,

	onEventJoined: PropTypes.func.isRequired,
	onLoadoutAdded: PropTypes.func.isRequired,
	onLoadoutRemoved: PropTypes.func.isRequired
}

export default EventContent
