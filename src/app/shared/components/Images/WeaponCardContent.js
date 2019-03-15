import React from 'react'
import PropTypes from 'prop-types'

import { getImage } from 'app/shared/services/card-image-service'

export default function WeaponCardContent({ weapon }) {
	let img = getImage('weapons', weapon.type, weapon.platform)

	if (img) {
		return <img alt={ weapon.platform } src={ img } />
	} else {
		return <div />
	}
}

WeaponCardContent.propTypes = {
	weapon: PropTypes.object.isRequired
}
