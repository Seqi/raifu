import React from 'react'
import PropTypes from 'prop-types'

import { LoadoutView } from 'app/features/loadouts'
import { ErrorOverlay } from 'app/shared/state'

const EventMyLoadout = ({ user }) => {
	if (!user.loadout) {
		return (
			<ErrorOverlay icon='fas fa-crosshairs' message='User has not added a loadout to this event.' />
		)
	}

	return (					
		<LoadoutView loadout={ user.loadout } editable={ false }/>
	)
}

export default EventMyLoadout

EventMyLoadout.propTypes = {
	user: PropTypes.shape({
		loadout: PropTypes.object,
	}).isRequired,
}