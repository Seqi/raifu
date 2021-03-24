import { FC } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Box, styled } from '@material-ui/core'
import Event, { EventPropShape } from 'app/shared/models/event'

const EventContainer = styled(Box)(({ theme }) => ({
	padding: '5px',
	borderColor: theme.palette.primary.main,
	borderRadius: '5px',
	borderStyle: 'solid',
	borderWidth: '1px',
}))

type EventItemProps = {
	event: Event
	onClick: (event: Event) => any
}

const EventItem: FC<EventItemProps> = ({ event, onClick }) => {
	const date = moment(event.date)

	return (
		<EventContainer key={ event.id } onClick={ (_) => onClick(event) }>
			{event.getTitle()} @ {event.location} ({date.format('HH:mm')})
		</EventContainer>
	)
}

EventItem.propTypes = {
	event: PropTypes.shape(EventPropShape).isRequired,
	onClick: PropTypes.func.isRequired,
}

export default EventItem
