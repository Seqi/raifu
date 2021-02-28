import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import * as qs from 'qs'
import moment from 'moment'

export default function useEventDate() {
	const location = useLocation()
	const history = useHistory()

	const [date, setDateState] = useState(null)

	// Push new dates to the query string
	const setDate = useCallback((date) => {
		history.push({ search: qs.stringify({ date: date.format('YYYY-MM-DD') }) })
	})

	// Listen out for query string changes
	useEffect(() => {
		const query = qs.parse(location.search, { ignoreQueryPrefix: true })

		if (query.date) {
			const queryDate = moment(query.date)
			if (!queryDate.isSame(date)) {
				setDateState(queryDate)
			}
		} else {
			setDate(moment())
		}
	}, [date, history, location, setDate])

	return [date, setDate]
}
