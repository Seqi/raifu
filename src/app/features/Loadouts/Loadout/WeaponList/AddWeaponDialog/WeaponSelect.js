import React from 'react'
import PropTypes from 'prop-types'

import { WeaponCard } from 'app/shared/components/Cards/Entities'

import './WeaponSelect.css'

const cardStyle = {
	height: '220px',
	width: '30%',
	minWidth: '0',
	marginRight: '0'
}

const selectedCardStyle = {
	...cardStyle,
	transform: 'scale(1.05)',
	border: '1px solid red'
}

export default function WeaponSelect ({weapons, selectedWeaponId, onWeaponSelected }) {
	return (
		<div className='weapon-select-list'>
			{ weapons.map(weapon => (
				<WeaponCard key={ weapon.id } 
					weapon={ weapon } 
					style={ weapon.id === selectedWeaponId ? selectedCardStyle : cardStyle }
					onClick={ () => onWeaponSelected(weapon.id) } />
			))}
		</div>
	)
}

WeaponSelect.propTypes = {
	weapons: PropTypes.array,
	selectedWeaponId: PropTypes.string,
	onWeaponSelected: PropTypes.func
}

WeaponSelect.defaultProps = {
	weapons: [],
	selectedWeaponId: null,
	onWeaponSelected: (weapon) => {}
}