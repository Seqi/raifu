import React from 'react'
import PropTypes from 'prop-types'

import ResourceImage from 'app/shared/images/ResourceImage'

const weaponDisplayContainerStyle = {
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',

	marginTop: '-30px',
	marginBottom: '-30px',
}

let WeaponDisplay = ({ weapons }) => {
	if (!weapons || weapons.length === 0) {
		return <div>No items</div>
	}

	return (
		<div style={ weaponDisplayContainerStyle }>
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
