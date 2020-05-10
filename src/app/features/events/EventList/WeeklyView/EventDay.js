import React from 'react'
import PropTypes from 'prop-types'

import * as moment from 'moment'
import { Box, styled } from '@material-ui/core'

const EventDayContainer = styled(Box)(({ theme }) => ({
	minHeight: '75px'
}))

const EventContainer = styled(Box)(({ theme }) => ({
	padding: '5px',
	borderColor: theme.palette.primary.main,
	borderRadius: '5px',
	borderStyle: 'solid',
	borderWidth: '1px 1px 1px 1px'
}))

const EventDay = ({ events, day, onEventSelected, onSlotSelected }) => {
	return (
		<EventDayContainer fontSize='0.9rem' paddingTop={1}>
			<Box textAlign='right'>{day.format('ddd Do')}</Box>
			{events.map((event) => (
				<EventContainer>
					{event.getTitle()} @ {event.location} ({moment(event.date).format('HH:mm')})
				</EventContainer>
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
	day: PropTypes.instanceOf(moment),
	onEventSelected: PropTypes.func.isRequired,
	onSlotSelected: PropTypes.func.isRequired
}

export default EventDay
