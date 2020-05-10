import React from 'react'
import PropTypes from 'prop-types'

import * as moment from 'moment'
import { Box } from '@material-ui/core'

const EventDay = ({ events, day, onEventSelected, onSlotSelected }) => {
	console.log(events)
	return (
		<Box paddingTop={2}>
			<Box textAlign='right'>{day.format('ddd Do')}</Box>
			{events.map((event) => event.name)}
		</Box>
	)
}

EventDay.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			date: PropTypes.instanceOf(Date).isRequired
		})
	).isRequired,
	day: PropTypes.instanceOf(moment),
	onEventSelected: PropTypes.func.isRequired,
	onSlotSelected: PropTypes.func.isRequired
}

export default EventDay
