import React from 'react'
import PropTypes from 'prop-types'

import ResourceImage from 'app/shared/components/images/ResourceImage'

import './WeaponDisplay.css'

let WeaponDisplay = ({ weapons }) => {
	if (!weapons || weapons.length === 0) {
		return <div>No items</div>
	}

	return (
		<div className='loadout-list-item-container'>
			{
				weapons.map((weapon) => 
					<ResourceImage key={ weapon.id } resourceType='weapons' resource={ weapon } rotate={ true } />
				)
			}
		</div>
	)
}

WeaponDisplay.propTypes = {
	weapons: PropTypes.array.isRequired
}

export default WeaponDisplay
