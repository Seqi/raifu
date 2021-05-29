import React, { FC } from 'react'
import PropTypes from 'prop-types'

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	makeStyles,
	Theme,
	Typography,
	Box,
	styled,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'

import EventGuestLoadout from './components/EventGuestLoadout'
import EventInvite from './components/EventInvite'
import { Event, EventPropShape } from '../../models'

const EventAccordian = styled(Accordion)(({ theme }) => ({
	minHeight: theme.spacing(7),
}))

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flex: 1,
	},
	secondaryHeading: {
		flex: 2,
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}))

type EventContentProps = {
	event: Event
	onEventJoined: () => any
	onLoadoutRemoved: () => any
	onLoadoutAdded: (id: string) => any
}

const EventContent: FC<EventContentProps> = ({
	event,
	onEventJoined,
	onLoadoutRemoved,
	onLoadoutAdded,
}) => {
	const classes = useStyles()

	if (event.users!.length === 0) {
		return <EventInvite event={ event } onJoin={ onEventJoined } />
	}

	return (
		<Box flex={ 1 } pt={ 2 }>
			{event.users!.map((user) => (
				<EventAccordian key={ user.uid }>
					<AccordionSummary expandIcon={ <ExpandMoreIcon /> }>
						<Typography align='center' className={ classes.heading }>
							{user.displayName}
						</Typography>
						<Typography align='center' className={ classes.secondaryHeading }>
							{user.loadout?.getTitle() ?? ''}
						</Typography>
					</AccordionSummary>

					<AccordionDetails>
						<EventGuestLoadout user={ user } />
					</AccordionDetails>
				</EventAccordian>
			))}

			{/* {event.users!.length > 1 && (
				<EventUserSelect
					users={ event.users! }
					userIndex={ selectedUserIndex }
					onUserIndexChange={ setSelectedUserIndex }
				/>
			)}

			{amISelected ? (
				<EventMyLoadout
					event={ event }
					user={ selectedUser }
					addLoadout={ onLoadoutAdded }
					removeLoadout={ onLoadoutRemoved }
				/>
			) : (
				<EventGuestLoadout user={ selectedUser } />
			)} */}
		</Box>
	)
}

EventContent.propTypes = {
	event: PropTypes.shape(EventPropShape).isRequired,

	onEventJoined: PropTypes.func.isRequired,
	onLoadoutAdded: PropTypes.func.isRequired,
	onLoadoutRemoved: PropTypes.func.isRequired,
}

export default EventContent
