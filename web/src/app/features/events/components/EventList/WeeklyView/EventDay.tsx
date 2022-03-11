import { FC } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { Box, styled } from '@material-ui/core'

import EventItem from './EventItem'
import { Event, EventPropShape } from '../../../models'

const EventDayContainer = styled(Box)(({ theme }) => ({
	flex: 1,
	fontSize: '0.9rem',

	'& span': {
		borderBottom: `1px solid ${theme.palette.primary.main}`,
		marginBottom: theme.spacing(1),
	},
}))

type EventDayProps = {
	events: Event[]
	day: moment.Moment
	onEventSelected: (event: Event) => any
	// TODO: keep as moment?
	onSlotSelected: (slot: Date) => any
}

const EventDay: FC<EventDayProps> = ({
	events,
	day,
	onEventSelected,
	onSlotSelected,
}) => {
	return (
		<EventDayContainer onClick={(e) => onSlotSelected(day.toDate())}>
			<span>{day.format('ddd Do')}</span>

			<Box marginTop={0.5}>
				{events.map((event) => (
					<EventItem
						key={event.id}
						event={event}
						onClick={(_) => onEventSelected(event)}
					/>
				))}
			</Box>
		</EventDayContainer>
	)
}

EventDay.propTypes = {
	events: PropTypes.arrayOf(PropTypes.shape(EventPropShape).isRequired).isRequired,
	day: PropTypes.any.isRequired,
	onEventSelected: PropTypes.func.isRequired,
	onSlotSelected: PropTypes.func.isRequired,
}

export default EventDay
