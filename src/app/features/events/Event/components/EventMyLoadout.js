import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import { Button, styled } from '@material-ui/core'

import { LoadoutView } from 'app/features/loadouts'
import ConfirmDeleteDialog from 'app/shared/actions/delete/ConfirmDeleteDialog'
import EventLoadoutSelect from './EventLoadoutSelect'

const SpacedButton = styled(Button)(({ theme }) => ({
	margin: theme.spacing(1, 0),
}))

const EventMyLoadout = ({ event, user, addLoadout, removeLoadout }) => {
	let [activeDialog, setActiveDialog] = useState()

	let onDelete = useCallback(() => {
		return removeLoadout().then(() => setActiveDialog(null))
	}, [removeLoadout])

	if (!user.loadout) {
		return <EventLoadoutSelect event={event} setLoadout={addLoadout} />
	}

	return (
		<React.Fragment>
			<SpacedButton color='primary' variant='outlined' fullWidth={true} onClick={() => setActiveDialog('remove')}>
				Remove Loadout ({user.loadout.getTitle()})
			</SpacedButton>

			<LoadoutView loadout={user.loadout} editable={false} />

			<ConfirmDeleteDialog
				verb='Remove'
				title={`${user.loadout.getTitle()} from ${event.getTitle()}`}
				isOpen={activeDialog === 'remove'}
				onClose={() => setActiveDialog(null)}
				onConfirm={onDelete}
			/>
		</React.Fragment>
	)
}

export default EventMyLoadout

EventMyLoadout.propTypes = {
	event: PropTypes.object.isRequired,
	user: PropTypes.shape({
		loadout: PropTypes.object,
	}).isRequired,
	addLoadout: PropTypes.func.isRequired,
	removeLoadout: PropTypes.func.isRequired,
}
