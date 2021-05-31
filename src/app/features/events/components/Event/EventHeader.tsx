import React, { FC } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Event, EventPropShape } from '../../models'
import { SidewaysTitle } from 'app/shared/text/SidewaysTitle'

type EventHeaderProps = {
	event: Event
}
const EventHeader: FC<EventHeaderProps> = ({ event }) => {
	const eventDate = moment(event.date)

	return (
		<SidewaysTitle
			mr={ { xs: 1, sm: 2 } }
			title={ event.getTitle() }
			subtitle={ `${event.location} ${eventDate.fromNow()}` }
			lowercase={ true }
		/>
	)
}

export default EventHeader

EventHeader.propTypes = {
	event: PropTypes.shape(EventPropShape).isRequired,
}
