import React, { FC } from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment'

// import { Tooltip, Chip } from '@material-ui/core'

import { Event, EventPropShape } from '../../models'
import { SidewaysTitle } from 'app/shared/text/SidewaysTitle'

type EventHeaderProps = {
	event: Event
}

// const EventChip = ({ isPublic = false }) => {
// 	if (isPublic) {
// 		return (
// 			<Tooltip placement='right' title='Event can be joined by others!'>
// 				<Chip label='Public' size='small' color='primary' />
// 			</Tooltip>
// 		)
// 	} else {
// 		return (
// 			<Tooltip placement='right' title='Only current event attendees can see this event.'>
// 				<Chip label='Private' size='small' variant='outlined' color='primary' />
// 			</Tooltip>
// 		)
// 	}
// }

const EventHeader: FC<EventHeaderProps> = ({ event }) => {
	// const eventDate = moment(event.date)

	return (
		<SidewaysTitle mr={ 2 } title={ event.getTitle() }>
			{/* {event.getTitle()} */}

			{/* <EventChip isPublic={ event.public } /> */}

			{/* <div>
				{event.location}
				<Tooltip placement='bottom' title={ event.date.toLocaleString() }>
					<span> {eventDate.fromNow()}</span>
				</Tooltip>
			</div> */}
		</SidewaysTitle>
	)
}

export default EventHeader

EventHeader.propTypes = {
	event: PropTypes.shape(EventPropShape).isRequired,
}
