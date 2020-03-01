import React from 'react'
import PropTypes from 'prop-types'

import * as moment from 'moment'

function CalendarEvent ({event}) {
	return (
		<React.Fragment>
			<div>{ event.getTitle() }</div>
			<div>{ event.location } @ { moment(event.date)
				.format('HH:mm') } 
			</div>
		</React.Fragment>
	)
}

CalendarEvent.propTypes = {
	event: PropTypes.object.isRequired
}

export default CalendarEvent