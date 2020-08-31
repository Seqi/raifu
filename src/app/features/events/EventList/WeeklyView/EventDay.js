import React from 'react'
import PropTypes from 'prop-types'

import * as moment from 'moment'
import { Box, styled } from '@material-ui/core'

import EventItem from './EventItem'

const EventDayContainer = styled(Box)(({ theme }) => ({
	flex: 1,
	fontSize: '0.9rem'
}))

const EventDay = ({ events, day, onEventSelected, onSlotSelected }) => {
	return (
		<EventDayContainer onClick={ (e) => onSlotSelected(day) }>
			<Box textAlign='left'>{day.format('ddd Do')}</Box>

			{events.map((event) => (
				<EventItem key={ event.id } event={ event } onClick={ (_) => onEventSelected(event) } />
			))}
		</EventDayContainer>
	)
}

EventDay.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			date: PropTypes.instanceOf(Date).isRequired
		})
	).isRequired,
	day: PropTypes.instanceOf(moment).isRequired,
	onEventSelected: PropTypes.func.isRequired,
	onSlotSelected: PropTypes.func.isRequired
}

export default EventDay
