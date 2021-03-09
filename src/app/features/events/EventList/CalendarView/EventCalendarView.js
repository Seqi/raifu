import React, { useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { useTheme } from '@material-ui/core'
import { CalendarToolbar, CalendarEvent } from './CalendarComponents'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CalendarComponents/Calendar.css'
import CalendarDateContext from '../CalendarDateContext'

const EventCalendarView = ({ events, onEventSelected, onSlotSelected }) => {
	let theme = useTheme()
	let { date, setDate } = useContext(CalendarDateContext)

	let localizer = useRef(momentLocalizer(moment))

	return (
		<Calendar
			events={ events }
			date={ date && date.toDate() }
			localizer={ localizer.current }
			components={ {
				toolbar: CalendarToolbar,
				event: CalendarEvent,
			} }
			style={ {
				color: theme.palette.text.primary,
			} }
			titleAccessor={ (e) => e.name }
			startAccessor={ (e) => e.date }
			endAccessor={ (e) => e.date }
			defaultView={ 'month' }
			drilldownView='day'
			onNavigate={ (date) => setDate(moment(date)) }
			onSelectSlot={ (slot) => onSlotSelected(slot.end) }
			onSelectEvent={ onEventSelected }
			popup={ true }
			eventPropGetter={ (_) => ({
				style: {
					border: `1px solid ${theme.palette.primary.main}`,
				},
			}) }
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
