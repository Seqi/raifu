import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import * as moment from 'moment'
import { extendMoment } from 'moment-range'

import { Box, IconButton } from '@material-ui/core'
import useEventDate from '../useEventDate'

// This'll fire every time we mount this component, but I don't
// really wanna drag moment in until we hit the event stuff
extendMoment(moment)

// Fetch the entire week for the offset
// i.e. for offset of 0, will get monday-sunday of current week as an array
// of days
const getWeekDayRange = (date) => {
	let start = moment(date)
		.startOf('week')
	let end = moment(date)
		.endOf('week')

	let range = moment.range(start, end)
		.by('days')

	return Array.from(range)
}

function EventWeekSelect({ onWeekChange }) {
	let [date, setDate] = useEventDate()
	let [weekRange, setWeekRange] = useState([])

	const addWeek = useCallback(
		(count) => {
			const newDate = moment(date)
				.add(count, 'week')

			setDate(newDate)
		},
		[date, setDate]
	)

	useEffect(() => {
		if (date) {
			const weekRange = getWeekDayRange(date)
			setWeekRange(weekRange)
		}
	}, [date])

	useEffect(() => {
		onWeekChange(weekRange)
	}, [onWeekChange, weekRange])

	return (
		<Box display='flex'>
			<IconButton size='small' onClick={ (_) => addWeek(-1) }>
				<i className='fa fa-chevron-left' />
			</IconButton>

			<Box flex={ 1 } textAlign='center'>
				{weekRange[0] && weekRange[0].format('MMM YYYY')}
			</Box>

			<IconButton size='small' onClick={ (_) => addWeek(1) }>
				<i className='fa fa-chevron-right' />
			</IconButton>
		</Box>
	)
}

EventWeekSelect.propTypes = {
	onWeekChange: PropTypes.func,
}

EventWeekSelect.defaultProps = {
	onWeekChange: (week) => {},
}

export default EventWeekSelect
