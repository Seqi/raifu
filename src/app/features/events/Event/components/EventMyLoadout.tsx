import React, { useState, useCallback, FC } from 'react'
import PropTypes from 'prop-types'

import { Button, styled } from '@material-ui/core'

import { LoadoutView } from 'app/features/loadouts'
import ConfirmDeleteDialog from 'app/shared/actions/delete/ConfirmDeleteDialog'
import EventLoadoutSelect from './EventLoadoutSelect'
import Event from 'app/shared/models/event'

const SpacedButton = styled(Button)(({ theme }) => ({
	margin: theme.spacing(1, 0),
}))

type EventMyLoadoutProps = {
	event: Event
	user: any
	addLoadout: (loadoutId: string) => Promise<any>
	removeLoadout: () => Promise<any>
}

const EventMyLoadout: FC<EventMyLoadoutProps> = ({
	event,
	user,
	addLoadout,
	removeLoadout,
}) => {
	let [activeDialog, setActiveDialog] = useState<'remove' | null>()

	let onDelete = useCallback(() => {
		return removeLoadout()
			.then(() => setActiveDialog(null))
	}, [removeLoadout])

	if (!user.loadout) {
		return <EventLoadoutSelect event={ event } setLoadout={ addLoadout } />
	}

	return (
		<React.Fragment>
			<SpacedButton
				color='primary'
				variant='outlined'
				fullWidth={ true }
				onClick={ () => setActiveDialog('remove') }
			>
				Remove Loadout ({user.loadout.getTitle()})
			</SpacedButton>

			<LoadoutView loadout={ user.loadout } editable={ false } />

			<ConfirmDeleteDialog
				verb='Remove'
				title={ `${user.loadout.getTitle()} from ${event.getTitle()}` }
				isOpen={ activeDialog === 'remove' }
				onClose={ () => setActiveDialog(null) }
				onConfirm={ onDelete }
			/>
		</React.Fragment>
	)
}

export default EventMyLoadout

EventMyLoadout.propTypes = {
	event: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		date: PropTypes.instanceOf(Date).isRequired,
		location: PropTypes.string.isRequired,
		organiser_uid: PropTypes.string.isRequired,
		public: PropTypes.bool.isRequired,
		createdAt: PropTypes.instanceOf(Date).isRequired,
		updatedAt: PropTypes.instanceOf(Date).isRequired,
		owner: PropTypes.string.isRequired,
		isGroup: PropTypes.bool.isRequired,

		users: PropTypes.array.isRequired,

		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
	}).isRequired,
	user: PropTypes.shape({
		loadout: PropTypes.object,
	}).isRequired,
	addLoadout: PropTypes.func.isRequired,
	removeLoadout: PropTypes.func.isRequired,
}
