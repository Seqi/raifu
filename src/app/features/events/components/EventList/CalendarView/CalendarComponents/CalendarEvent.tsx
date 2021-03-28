import React, { FC } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { EventProps } from 'react-big-calendar'

import { Event, EventPropShape } from '../../../../models'

type CalendarEventProps = EventProps<Event>

const CalendarEvent: FC<CalendarEventProps> = ({ event, title }) => {
	return (
		<React.Fragment>
			<div>{title}</div>
			<div>
				{event.location} @ {moment(event.date)
					.format('HH:mm')}
			</div>
		</React.Fragment>
	)
}

CalendarEvent.propTypes = {
	event: PropTypes.shape(EventPropShape).isRequired,
	title: PropTypes.string.isRequired
}

export default CalendarEvent
