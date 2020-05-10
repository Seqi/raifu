import React from 'react'
import PropTypes from 'prop-types'

import { Box, Tooltip, Chip } from '@material-ui/core'

import ReactiveTitle from 'app/shared/text/ReactiveTitle'

function EventHeader({ event }) {
	return (
		<React.Fragment>
			<ReactiveTitle>
				{event.getTitle()}

				<Box component='span' paddingLeft={1}>
					{event.public ? (
						<Tooltip placement='right' title='Event can be joined by others!'>
							<Chip label='Public' size='small' color='primary' />
						</Tooltip>
					) : (
						<Tooltip placement='right' title='Only current event attendees can see this event.'>
							<Chip label='Private' size='small' variant='outlined' color='primary' />
						</Tooltip>
					)}
				</Box>
			</ReactiveTitle>

			<ReactiveTitle variant='h4' mobileVariant='h5'>
				{event.location} @ {event.date.toLocaleString()}
			</ReactiveTitle>
		</React.Fragment>
	)
}

export default EventHeader

EventHeader.propTypes = {
	event: PropTypes.shape({
		name: PropTypes.string.isRequired,
		public: PropTypes.bool.isRequired,
		location: PropTypes.string.isRequired,
		date: PropTypes.object.isRequired,
		getTitle: PropTypes.func.isRequired,
	}).isRequired,
}
