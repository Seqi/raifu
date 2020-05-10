import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useMediaQuery, useTheme } from '@material-ui/core'

import WeaponDisplay from 'app/shared/images/WeaponDisplay'

function CalendarAgendaEvent({ event }) {
	let location = useLocation()
	let history = useHistory()

	let theme = useTheme()
	let isMobileMode = useMediaQuery(theme.breakpoints.down('xs'))

	// TODO: remove this, temp solution
	function findUsersLoadout(eventLoadouts) {
		return eventLoadouts[0]
	}

	return (
		// By design, agenda events don't have a click event, so we have to make one ourselves
		<div onClick={() => history.push(`${location.pathname}/${event.id}`)} style={{ cursor: 'pointer' }}>
			<div
				style={{
					width: '100%',
					borderBottom: `1px solid ${theme.palette.primary.main}`,
				}}
			>
				<span>
					{' '}
					{event.getTitle()} @ {event.location}{' '}
				</span>
			</div>

			{!isMobileMode && findUsersLoadout(event.users).loadout && (
				<WeaponDisplay weapons={findUsersLoadout(event.users).loadout.weapons} />
			)}
			{isMobileMode && findUsersLoadout(event.users).loadout && (
				<div>Loadout: {findUsersLoadout(event.users).loadout.name} </div>
			)}

			{!findUsersLoadout(event.users).loadout && (
				<div style={{ width: '100%', textAlign: 'center', padding: '2rem 0rem' }}>No loadout</div>
			)}
		</div>
	)
}

CalendarAgendaEvent.propTypes = {
	event: PropTypes.object.isRequired,
}

export default CalendarAgendaEvent
