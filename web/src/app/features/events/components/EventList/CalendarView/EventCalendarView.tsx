import { useRef, useContext, FC } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import PropTypes from 'prop-types'

import moment from 'moment'
import { Box, useTheme } from '@material-ui/core'

import { SidewaysTitle } from 'app/shared/text/SidewaysTitle'

import CalendarDateContext from '../CalendarDateContext'
import { Event, EventPropShape } from '../../../models'
import { CalendarToolbar, CalendarEvent } from './CalendarComponents'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarComponents/Calendar.css'

type EventCalendarViewProps = {
	events: Event[]
	onEventSelected: (event: Event) => any
	onSlotSelected: (date: Date) => any
}

const EventCalendarView: FC<EventCalendarViewProps> = ({
	events,
	onEventSelected,
	onSlotSelected,
}) => {
	const theme = useTheme()
	const { date, setDate } = useContext(CalendarDateContext)

	const localizer = useRef(momentLocalizer(moment))

	return (
		<Box height='100%' display='flex'>
			<SidewaysTitle
				lowercase={true}
				marginTop='48px'
				title={date.format('MMMM YYYY')}
				mr={2}
			/>

			<Box flex='1'>
				<Calendar
					events={events}
					date={date && date.toDate()}
					localizer={localizer.current}
					components={{
						toolbar: CalendarToolbar,
						event: CalendarEvent,
					}}
					style={{
						color: theme.palette.text.primary,
					}}
					titleAccessor={(e) => e.getTitle()}
					startAccessor={(e) => e.date}
					endAccessor={(e) => e.date}
					defaultView='month'
					drilldownView='day'
					onNavigate={(date) => setDate(moment(date))}
					selectable={true}
					onSelectSlot={(slot) => onSlotSelected(slot.end as Date)}
					onSelectEvent={onEventSelected}
					popup={true}
					eventPropGetter={(_) => ({
						style: {
							border: `1px solid ${theme.palette.primary.main}`,
						},
					})}
				/>
			</Box>
		</Box>
	)
}

EventCalendarView.propTypes = {
	events: PropTypes.arrayOf(PropTypes.shape(EventPropShape).isRequired).isRequired,
	onEventSelected: PropTypes.func.isRequired,
	onSlotSelected: PropTypes.func.isRequired,
}

export default EventCalendarView
