import React from 'react'
import PropTypes from 'prop-types'
import * as moment from 'moment'

import { Box, styled } from '@material-ui/core'

const EventContainer = styled(Box)(({ theme }) => ({
	padding: '5px',
	borderColor: theme.palette.primary.main,
	borderRadius: '5px',
	borderStyle: 'solid',
	borderWidth: '1px'
}))

const EventItem = ({ event, onClick }) => {
	const date = moment(event.date)

	return (
		<EventContainer key={ event.id } onClick={ (_) => onClick(event) }>
			{event.getTitle()} @ {event.location} ({date.format('HH:mm')})
		</EventContainer>
	)
}

EventItem.propTypes = {
	event: PropTypes.shape({
		id: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		date: PropTypes.instanceOf(Date).isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired,
	onClick: PropTypes.func.isRequired
}

export default EventItem
