import React from 'react'
import moment from 'moment'

type CalendarDateContext = {
	date: moment.Moment
	setDate: (date: moment.Moment) => void
}

const defaultContext = {
	date: moment(),
	setDate: (date: moment.Moment) => {},
}

const calendarDateContext = React.createContext<CalendarDateContext>(defaultContext)

export default calendarDateContext
