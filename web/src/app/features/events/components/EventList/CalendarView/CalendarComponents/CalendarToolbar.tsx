import { FC } from 'react'
import { Box, IconButton } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import { ToolbarProps } from 'react-big-calendar'

import { Event } from '../../../../models'

type CalendarToolbarProps = ToolbarProps<Event>

const CalendarToolbar: FC<CalendarToolbarProps> = ({ onNavigate }) => {
	return (
		<Box display='flex' justifyContent='flex-end'>
			<IconButton onClick={(_) => onNavigate('PREV')}>
				<NavigateBefore />
			</IconButton>

			<IconButton onClick={(_) => onNavigate('NEXT')}>
				<NavigateNext />
			</IconButton>
		</Box>
	)
}

export default CalendarToolbar
