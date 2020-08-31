import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import * as moment from 'moment'
import { extendMoment } from 'moment-range'

import { Box, IconButton } from '@material-ui/core'

// This'll fire every time we mount this component, but I don't
// really wanna drag moment in until we hit the event stuff
extendMoment(moment)

// Fetch the entire week for the offset
// i.e. for offset of 0, will get monday-sunday of current week as an array
// of days
const getWeekDayRange = (weekOffset) => {
	let start = moment()
		.add('weeks', weekOffset)
		.startOf('week')
	let end = moment()
		.add('weeks', weekOffset)
		.endOf('week')

	let range = moment.range(start, end)
		.by('days')

	return Array.from(range)
}

function EventWeekSelect({ onWeekChange }) {
	let [weekOffset, setWeekOffset] = useState(0)
	let weekRange = getWeekDayRange(weekOffset)

	// Always fire off initial week, not 'good practise' but
	// lazy way of keeping all calcs in this component
	useEffect(() => {
		onWeekChange(weekRange)
		// Really don't want week range to trigger this again
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [weekOffset])

	return (
		<Box display='flex'>
			<IconButton size='small' onClick={ (_) => setWeekOffset(weekOffset - 1) }>
				<i className='fa fa-chevron-left' />
			</IconButton>

			<Box flex={ 1 } textAlign='center'>
				{weekRange[0].format('MMM YYYY')}
			</Box>

			<IconButton size='small' onClick={ (_) => setWeekOffset(weekOffset + 1) }>
				<i className='fa fa-chevron-right' />
			</IconButton>
		</Box>
	)
}

EventWeekSelect.propTypes = {
	onWeekChange: PropTypes.func
}

EventWeekSelect.defaultProps = {
	onWeekChange: (week) => {}
}

export default EventWeekSelect
