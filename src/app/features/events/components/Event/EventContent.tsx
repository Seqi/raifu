import React, { FC, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	AccordionActions,
	Button,
	makeStyles,
	Theme,
	Typography,
	Box,
	styled,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'

import EventLoadout from './components/EventLoadout'
import EventInvite from './components/EventInvite'

import ConfirmDeleteDialog from 'app/shared/actions/delete/ConfirmDeleteDialog'
import AddLoadoutToEventDialog from './dialogs/AddLoadoutToEventDialog'

import { Event, EventPropShape } from '../../models'

const EventAccordian = styled(Accordion)(({ theme }) => ({
	minHeight: theme.spacing(7),

	// Override the image size to account for smaller widths
	'& img': {
		[theme.breakpoints.down('xs')]: {
			maxHeight: '200px',
		},
	},
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
	onLoadoutRemoved: () => Promise<any>
	onLoadoutAdded: (id: string) => any
}

const EventContent: FC<EventContentProps> = ({ event, onEventJoined, onLoadoutRemoved, onLoadoutAdded }) => {
	const classes = useStyles()

	let [activeDialog, setActiveDialog] = useState<'add' | 'remove' | null>()

	let onDelete = useCallback(() => {
		return onLoadoutRemoved()
			.then(() => setActiveDialog(null))
	}, [onLoadoutRemoved])

	if (event.users!.length === 0) {
		return <EventInvite event={ event } onJoin={ onEventJoined } />
	}

	const soloEvent = event.users!.length === 1

	return (
		<Box flex={ 1 }>
			{event.users!.map((user, index) => (
				<EventAccordian key={ user.uid } expanded={ soloEvent || undefined }>
					<AccordionSummary expandIcon={ soloEvent ? undefined : <ExpandMoreIcon /> }>
						<Typography align='center' className={ classes.heading }>
							{user.displayName}
						</Typography>
						<Typography align='center' className={ classes.secondaryHeading }>
							{user.loadout?.name ?? ''}
						</Typography>
					</AccordionSummary>

					<AccordionDetails>
						<EventLoadout user={ user } />
					</AccordionDetails>

					{index === 0 && (
						<AccordionActions>
							{user.loadout ? (
								<Button variant='text' color='secondary' onClick={ () => setActiveDialog('remove') }>
									Remove loadout
								</Button>
							) : (
								<Button variant='text' color='secondary' onClick={ () => setActiveDialog('add') }>
									Add loadout
								</Button>
							)}
						</AccordionActions>
					)}
				</EventAccordian>
			))}

			<ConfirmDeleteDialog
				verb='Remove'
				title={ 'loadout' }
				isOpen={ activeDialog === 'remove' }
				onClose={ () => setActiveDialog(null) }
				onConfirm={ onDelete }
			/>

			<AddLoadoutToEventDialog
				eventTitle={ event.getTitle() }
				isOpen={ activeDialog === 'add' }
				onSave={ onLoadoutAdded }
				onClose={ () => setActiveDialog(null) }
			/>
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
