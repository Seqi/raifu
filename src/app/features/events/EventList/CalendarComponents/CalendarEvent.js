import React from 'react'
import PropTypes from 'prop-types'

function CalendarEvent ({event}) {
	return (
		<React.Fragment>
			<div>{ event.getTitle() }</div>
			<div>{ event.getSubtitle() }</div>
		</React.Fragment>
	)
}

CalendarEvent.propTypes = {
	event: PropTypes.object.isRequired
}

export default CalendarEvent