import React from 'react'
import PropTypes from 'prop-types'

import useIsMobileMode from 'app/shared/hooks/useIsMobileMode'

import LoadoutWeaponItem from './LoadoutWeaponItem'
import LoadoutWeaponAttachmentList from './LoadoutWeaponAttachmentList'

let LoadoutWeapon = ({ weapon }) => {
	let isMobileMode = useIsMobileMode()

	return (
		<div style={ { display: 'flex', flexDirection: isMobileMode ? 'column': 'row' } }>
			<div style={ { flex: '1' } } >
				<LoadoutWeaponItem weapon={ weapon } />
			</div>	

			<div style={ { flex: 2 } }>
				<LoadoutWeaponAttachmentList weapon={ weapon } />
			</div>
		</div>
	)
}

LoadoutWeapon.propTypes = {
	weapon: PropTypes.object.isRequired,
}

export default LoadoutWeapon
