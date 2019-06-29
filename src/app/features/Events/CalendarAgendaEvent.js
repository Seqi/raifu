import React from 'react'
import withRouter from 'react-router-dom/withRouter'
import PropTypes from 'prop-types'

import { withTheme } from '@material-ui/core'

import WeaponDisplay from 'app/shared/components/Display/WeaponDisplay'
import useIsMobileMode from 'app/shared/hooks/useIsMobileMode'

function CalendarAgendaEvent ({event, theme, location, history}) {
	let isMobileMode = useIsMobileMode()

	return (
		// By design, agenda events don't have a click event, so we have to make one ourselves
		<div onClick={ () => history.push(`${location.pathname}/${event.id}`) } style={ {cursor: 'pointer'} }>
			<div style={ {
				width: '100%',
				borderBottom: `1px solid ${theme.palette.primary.main}`
			} }>
				<span> { event.getTitle() } @ { event.location } </span>
			</div>

			{ !isMobileMode && event.loadout && <WeaponDisplay weapons={ event.loadout.weapons } />}
			{ isMobileMode && event.loadout && <div>Loadout: {event.loadout.name} </div>}

			{ !event.loadout && 
				<div style={ { width: '100%', textAlign: 'center', padding: '2rem 0rem'} }>
					No loadout
				</div>
			}
		</div>
	)
}

CalendarAgendaEvent.propTypes = {
	event: PropTypes.object.isRequired
}

export default withTheme()(withRouter(CalendarAgendaEvent))