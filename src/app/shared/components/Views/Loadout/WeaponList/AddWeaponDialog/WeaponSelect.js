import React from 'react'
import PropTypes from 'prop-types'

import { withTheme } from '@material-ui/core'

import { WeaponCard } from 'app/shared/components/Cards/Entities'

function WeaponSelect ({theme, weapons, selectedWeaponId, onWeaponSelected }) {

	const cardStyle = {
		height: '220px',
		width: '30%',
		minWidth: '0',
		marginRight: '0'
	}
	
	const selectedCardStyle = {
		...cardStyle,
		transform: 'scale(1.05)',
		border: `1px solid ${theme.palette.primary.main}`
	}

	return (
		<div className='loadout-select-list'>
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

export default withTheme()(WeaponSelect)