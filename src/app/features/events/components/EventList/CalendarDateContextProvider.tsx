import { FC, useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import qs from 'qs'
import moment from 'moment'

import CalendarDateContext from './CalendarDateContext'

const CalendarDateContextProvider: FC = ({ children }) => {
	const location = useLocation()
	const history = useHistory()

	// TODO: Check having default moment here works ok
	const [date, setDateState] = useState<moment.Moment>(moment())

	// Push new dates to the query string
	const setDate = useCallback(
		(newDate: moment.Moment) => {
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
		const date = query.date?.toString()

		if (date) {
			const queryDate = moment(date, 'YYYY-MM-DD')
			setDateState(queryDate)
		}
	}, [location.search])

	return (
		<CalendarDateContext.Provider value={ { date, setDate } }>
			{children}
		</CalendarDateContext.Provider>
	)
}

export default CalendarDateContextProvider
