import React, { FC, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@material-ui/core'

import { Error, LoadingOverlay } from 'app/shared/state'
import { events } from 'app/data/api'
import useAnalytics from 'app/shared/hooks/useAnalytics'
import Event from 'app/shared/models/event'

type EventInviteProps = {
	event: Event
	onJoin: () => Promise<any>
}

const EventInvite: FC<EventInviteProps> = ({ event, onJoin }) => {
	let [{ loading, error }, setHttpState] = useState({ loading: false, error: null })
	let analytics = useAnalytics()

	let joinEvent = () => {
		setHttpState({ loading: true, error: null })

		events
			.join(event.id)
			.then(() => setHttpState({ loading: false, error: null }))
			.then(() => analytics.logEvent('event_joined'))
			.then(onJoin)
			.catch((e) => setHttpState({ loading: false, error: e }))
	}

	if (loading) {
		return <LoadingOverlay />
	}

	return (
		<Box paddingTop={ 2 }>
			<Button onClick={ joinEvent } variant='outlined' color='primary' fullWidth={ true }>
				Join event!
			</Button>

			{error && <Error error={ 'An error occurred while trying to join event.' } />}
		</Box>
	)
}

export default EventInvite

EventInvite.propTypes = {
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
	onJoin: PropTypes.func.isRequired,
}
