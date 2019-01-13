import React from 'react'
import PropTypes from 'prop-types'

import { getWeaponImage } from '../../services/card-image-service'

export default function WeaponCardContent({ weapon }) {
	let img = getWeaponImage(weapon.type, weapon.platform)

	if (img) {
		return <img alt={ weapon.platform } src={ img } />
	} else {
		return <div />
	}
}

WeaponCardContent.propTypes = {
	weapon: PropTypes.object.isRequired
}
