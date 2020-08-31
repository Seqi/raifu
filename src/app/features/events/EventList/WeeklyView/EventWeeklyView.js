import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import * as moment from 'moment'

import { Box } from '@material-ui/core'

import EventWeekSelect from './EventWeekSelect'
import EventDay from './EventDay'

const EventWeeklyView = ({ events, onEventSelected, onSlotSelected }) => {
	let [week, setWeek] = useState([])

	const getEventsForDay = useCallback((day) => events.filter((event) => moment(event.date)
		.isSame(day, 'day')), [
		events
	])

	return (
		<React.Fragment>
			<EventWeekSelect onWeekChange={ (newWeek) => setWeek(newWeek) } />

			<Box display='flex' flexDirection='column'>
				{week.map((day) => (
					<EventDay
						key={ +day }
						events={ getEventsForDay(day) }
						day={ day }
						onEventSelected={ onEventSelected }
						onSlotSelected={ onSlotSelected }
					/>
				))}
			</Box>
		</React.Fragment>
	)
}

EventWeeklyView.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			date: PropTypes.instanceOf(Date)
		})
	).isRequired,
	onEventSelected: PropTypes.func.isRequired,
	onSlotSelected: PropTypes.func.isRequired
}

export default EventWeeklyView
