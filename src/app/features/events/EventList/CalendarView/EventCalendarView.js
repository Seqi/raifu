import React, { useState, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { useTheme } from '@material-ui/core'
import { CalendarToolbar, CalendarEvent, CalendarAgendaEvent } from './CalendarComponents'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarComponents/Calendar.css'
import CalendarDateContext from '../CalendarDateContext'

const EventCalendarView = ({ events, onEventSelected, onSlotSelected }) => {
	let theme = useTheme()
	let [view, setView] = useState('month')
	let { date, setDate } = useContext(CalendarDateContext)

	let localizer = useRef(momentLocalizer(moment))

	let styleEvent = () => {
		// Only give month events the accented border as agenda views don't show this right
		if (view === 'month') {
			return {
				style: {
					border: `1px solid ${theme.palette.primary.main}`,
					background: 'inherit',
				},
			}
		}
	}

	return (
		<Calendar
			events={ events }
			date={ date && date.toDate() }
			localizer={ localizer.current }
			components={ {
				toolbar: CalendarToolbar,
				event: CalendarEvent,
				agenda: {
					event: CalendarAgendaEvent,
				},
			} }
			style={ {
				color: theme.palette.text.primary,
			} }
			titleAccessor={ (e) => e.name }
			startAccessor={ (e) => e.date }
			endAccessor={ (e) => e.date }
			defaultView={ view }
			onView={ (view) => setView(view) }
			onNavigate={ (date) => setDate(moment(date)) }
			views={ ['month', 'agenda'] }
			// Don't use a drilldown view
			getDrilldownView={ (_) => null }
			// Show entire year in agenda view
			length={ 365 }
			selectable={ true }
			onSelectSlot={ (slot) => onSlotSelected(slot.end) }
			onSelectEvent={ onEventSelected }
			eventPropGetter={ styleEvent }
		/>
	)
}

EventCalendarView.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			date: PropTypes.instanceOf(Date),
		})
	).isRequired,
	onEventSelected: PropTypes.func.isRequired,
	onSlotSelected: PropTypes.func.isRequired,
}

export default EventCalendarView
