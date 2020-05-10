import React from 'react'
import PropTypes from 'prop-types'

import * as moment from 'moment'
import { Box } from '@material-ui/core'

const EventDay = ({ event, day, onEventSelected, onSlotSelected }) => {
	return (
		<Box padding={2}>
			<Box textAlign='right'>{day.format('ddd Do MMM YY')}</Box>
			Hey!
		</Box>
	)
}

EventDay.propTypes = {
	event: PropTypes.shape({
		name: PropTypes.string.isRequired,
		date: PropTypes.instanceOf(Date).isRequired
	}),
	day: PropTypes.instanceOf(moment),
	onEventSelected: PropTypes.func.isRequired,
	onSlotSelected: PropTypes.func.isRequired
}

export default EventDay
