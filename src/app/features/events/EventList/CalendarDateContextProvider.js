import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import * as qs from 'qs'
import moment from 'moment'

import CalendarDateContext from './CalendarDateContext'

export default function useEventDate(props) {
	const location = useLocation()
	const history = useHistory()

	const [date, setDateState] = useState(null)

	// Push new dates to the query string
	const setDate = useCallback(
		(newDate) => {
			const newQs = moment(newDate)
				.format('YYYY-MM-DD')

			if (!newDate.isSame(date)) {
				history.push({
					search: qs.stringify({ date: newQs }),
				})
			}
		},
		[date, history]
	)

	// Default to current date
	useEffect(() => {
		const query = qs.parse(location.search, { ignoreQueryPrefix: true })

		if (!query.date) {
			setDate(moment())
		}
	}, [location, setDate])

	// Listen out for query string changes
	useEffect(() => {
		const query = qs.parse(location.search, { ignoreQueryPrefix: true })

		if (query.date) {
			const queryDate = moment(query.date, 'YYYY-MM-DD')
			setDateState(queryDate)
		}
	}, [location.search, setDateState])

	// Re-call moment to clone so we're not mutating
	return (
		<CalendarDateContext.Provider value={ { date, setDate } }>
			{props.children}
		</CalendarDateContext.Provider>
	)
}
