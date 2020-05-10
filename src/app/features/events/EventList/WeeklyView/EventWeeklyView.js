import React from 'react'
import PropTypes from 'prop-types'
import * as moment from 'moment'
import { extendMoment } from 'moment-range'

import { Box, IconButton } from '@material-ui/core'

import EventDay from './EventDay'
import { useState } from 'react'
import { useCallback } from 'react'

// This'll fire every time we mount this component, but I don't
// really wanna drag moment in until we hit the event stuff
extendMoment(moment)

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

	let [weekOffset, setWeekOffset] = useState(0)

	let weekRange = getWeekRange(weekOffset)

	return (
		<div>
			<Box display='flex'>
				<IconButton size='small' onClick={(_) => setWeekOffset(weekOffset - 1)}>
					<i className='fa fa-chevron-left' />
				</IconButton>

				<Box flex={1} textAlign='center'>
					{weekRange[0].format('MMM YYYY')}
				</Box>

				<IconButton size='small' onClick={(_) => setWeekOffset(weekOffset + 1)}>
					<i className='fa fa-chevron-right' />
				</IconButton>
			</Box>

			<Box display='flex' flexDirection='column'>
				{weekRange.map((day) => (
					<EventDay key={+day} day={day} />
				))}
			</Box>
		</div>
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
