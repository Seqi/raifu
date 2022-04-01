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
	const start = moment(date).startOf('week')
	const end = moment(date).endOf('week')

	const range = moment.range(start, end).by('days')

	return Array.from(range)
}

type EventWeekSelectProps = {
	onWeekChange?: (newWeeks: Moment.Moment[]) => any
}

const EventWeekSelect: FC<EventWeekSelectProps> = ({
	onWeekChange = (week) => {
		// No op
	},
}) => {
	const { date, setDate } = useContext(CalendarDateContext)
	const [weekRange, setWeekRange] = useState<Moment.Moment[]>([])

	const addWeek = useCallback(
		(count: number) => {
			const newDate = moment(date).add(count, 'week')

			setDate(newDate)
		},
		[date, setDate]
	)

	useEffect(() => {
		const weekRange = getWeekDayRange(date)
		setWeekRange(weekRange)
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
				{weekRange[0]?.format('MMM YYYY')}
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
	onWeekChange: (week) => {
		// No op
	},
}

export default EventWeekSelect
