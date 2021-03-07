import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@material-ui/core'

import { Error, LoadingOverlay } from 'app/shared/state'
import { events } from 'app/data/api'
import useAnalytics from 'app/shared/hooks/useAnalytics'

const EventInvite = ({ event, onJoin }) => {
	let [{ loading, error }, setHttpState] = useState({ loading: false, error: null })
	let analytics = useAnalytics()

	let joinEvent = () => {
		setHttpState({ loading: true, error: null })

		events
			.join(event.id)
			.then(() => setHttpState({ loading: false }))
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
	event: PropTypes.object.isRequired,
	onJoin: PropTypes.func.isRequired,
}
