import React from 'react'
import PropTypes from 'prop-types'

import LoadoutWeaponItem from './LoadoutWeaponItem'
import LoadoutWeaponAttachmentList from './LoadoutWeaponAttachmentList'

import './LoadoutWeapon.css'

let LoadoutWeapon = ({ weapon }) => {
	return (
		<div className='loadout-weapon-item-container'>
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
	weapon: PropTypes.shape({
		id: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired
	}).isRequired
}

export default LoadoutWeapon
