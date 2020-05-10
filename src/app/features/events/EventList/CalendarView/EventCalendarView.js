import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import { useTheme } from '@material-ui/core'
import { CalendarToolbar, CalendarEvent, CalendarAgendaEvent } from './CalendarComponents'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarComponents/Calendar.css'

const EventCalendarView = ({ events, onEventSelected, onSlotSelected }) => {
	let theme = useTheme()
	let [view, setView] = useState('month')

	let localizer = useRef(BigCalendar.momentLocalizer(moment))

	let styleEvent = () => {
		// Only give month events the accented border as agenda views don't show this right
		if (view === 'month') {
			return {
				style: {
					border: `1px solid ${theme.palette.primary.main}`,
					background: 'inherit'
				}
			}
		}
	}

	return (
		<BigCalendar
			events={events}
			localizer={localizer.current}
			components={{
				toolbar: CalendarToolbar,
				event: CalendarEvent,
				agenda: {
					event: CalendarAgendaEvent
				}
			}}
			style={{
				color: theme.palette.text.primary
			}}
			titleAccessor={(e) => e.name}
			startAccessor={(e) => e.date}
			endAccessor={(e) => e.date}
			defaultView={view}
			onView={(view) => setView(view)}
			views={['month', 'agenda']}
			// Don't use a drilldown view
			getDrilldownView={(_) => null}
			// Show entire year in agenda view
			length={365}
			selectable={true}
			onSelectSlot={onSlotSelected}
			onSelectEvent={onEventSelected}
			eventPropGetter={styleEvent}
		/>
	)
}

EventCalendarView.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			date: PropTypes.instanceOf(Date)
		})
	).isRequired
}

export default EventCalendarView
