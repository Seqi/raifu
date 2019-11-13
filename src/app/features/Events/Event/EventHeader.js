import React from 'react'
import PropTypes from 'prop-types'

import EventActions from './EventActions' 
import ReactiveTitle from 'app/shared/components/Text/ReactiveTitle'

function EventHeader( { event, updateEvent, deleteEvent }) {
	return (
		<React.Fragment>
			<ReactiveTitle>
				{ event.name }
			
				<EventActions event={ event } updateEvent={ updateEvent } deleteEvent={ deleteEvent } />
			</ReactiveTitle>

			<ReactiveTitle variant='h4' mobileVariant='h5'>
				{ event.location } @ { event.date.toLocaleString() }
			</ReactiveTitle>
		</React.Fragment>
	)
}

export default EventHeader

EventHeader.propTypes = {
	event: PropTypes.object.isRequired,
	updateEvent: PropTypes.func.isRequired,
	deleteEvent: PropTypes.func.isRequired,
}