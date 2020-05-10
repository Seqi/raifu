import React from 'react'
import PropTypes from 'prop-types'
import * as moment from 'moment'
import { extendMoment } from 'moment-range'

import { Box, styled } from '@material-ui/core'

import EventDay from './EventDay'
import { useState } from 'react'
import { useCallback } from 'react'

// This'll fire every time we mount this component, but I don't
// really wanna drag moment in until we hit the event stuff
extendMoment(moment)

const DayContainer = styled(Box)(({ theme }) => ({
	border: '1px solid white'
}))

const EventWeeklyView = ({ events, onEventSelected, onSlotSelected }) => {
	let getWeekRange = useCallback((weekOffset) => {
		let start = moment()
			.add('weeks', weekOffset)
			.startOf('week')
		let end = moment()
			.add('weeks', weekOffset)
			.endOf('week')

		let range = moment.range(start, end).by('days')

		return Array.from(range)
	}, [])

	let [weekRange, setWeekRange] = useState(getWeekRange(0))

	return (
		<Box display='flex' flexDirection='column'>
			{weekRange.map((day) => (
				<EventDay key={+day} day={day} />
			))}
		</Box>
	)
}

EventWeeklyView.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			date: PropTypes.instanceOf(Date)
		})
	).isRequired
}

export default EventWeeklyView
