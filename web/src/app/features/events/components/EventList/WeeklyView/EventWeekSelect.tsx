import { useState, useEffect, useCallback, useContext, FC } from 'react'
import PropTypes from 'prop-types'

import * as Moment from 'moment'
import { extendMoment } from 'moment-range'

import { Box, IconButton } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

import CalendarDateContext from '../CalendarDateContext'

// This'll fire every time we mount this component, but I don't
// really wanna drag moment in until we hit the event stuff
const moment = extendMoment(Moment)

// Fetch the entire week for the provided date
const getWeekDayRange = (date: Moment.Moment): Moment.Moment[] => {
	let start = moment(date).startOf('week')
	let end = moment(date).endOf('week')

	let range = moment.range(start, end).by('days')

	return Array.from(range)
}

type EventWeekSelectProps = {
	onWeekChange?: (newWeeks: Moment.Moment[]) => any
}

const EventWeekSelect: FC<EventWeekSelectProps> = ({ onWeekChange = (week) => {} }) => {
	let { date, setDate } = useContext(CalendarDateContext)
	let [weekRange, setWeekRange] = useState<Moment.Moment[]>([])

	const addWeek = useCallback(
		(count: number) => {
			const newDate = moment(date).add(count, 'week')

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
			<IconButton size='small' onClick={(_) => addWeek(-1)}>
				<NavigateBefore />
			</IconButton>

			<Box flex={1} textAlign='center'>
				{weekRange[0] && weekRange[0].format('MMM YYYY')}
			</Box>

			<IconButton size='small' onClick={(_) => addWeek(1)}>
				<NavigateNext />
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
