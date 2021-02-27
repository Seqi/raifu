import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import * as moment from 'moment'

import { styled, Box, Fade } from '@material-ui/core'

import StaggeredAnimation from 'app/shared/animations/StaggeredAnimation'

import EventWeekSelect from './EventWeekSelect'
import EventDay from './EventDay'

const EventWeeklyViewContainer = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	height: '100%'
})

const EventWeeklyView = ({ events, onEventSelected, onSlotSelected }) => {
	let [week, setWeek] = useState([])

	const getEventsForDay = useCallback(
		(day) => {
			return events.filter((event) => moment(event.date)
				.isSame(day, 'day'))
		},
		[events]
	)

	return (
		<EventWeeklyViewContainer>
			<EventWeekSelect onWeekChange={ (newWeek) => setWeek(newWeek) } />

			<Box display='flex' flexDirection='column' flex={ 1 } paddingTop={ 2 }>
				<StaggeredAnimation minInterval={ 0.025 } freezeAfterInitial={ false }>
					{week.map((day) => (
						<Fade key={ +day } timeout={ 1000 } in={ true }>
							{/* Necessary for animation to work */}
							<Box display='flex' flex={ 1 }>
								<EventDay
									events={ getEventsForDay(day) }
									day={ day }
									onEventSelected={ onEventSelected }
									onSlotSelected={ onSlotSelected }
								/>
							</Box>
						</Fade>
					))}
				</StaggeredAnimation>
			</Box>
		</EventWeeklyViewContainer>
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
