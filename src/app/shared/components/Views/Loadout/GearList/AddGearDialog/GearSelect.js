import React from 'react'
import PropTypes from 'prop-types'

import { withTheme } from '@material-ui/core'

import { GearCard } from 'app/shared/components/Cards/Entities'

function GearSelect ({theme, gear, selectedGearId, onGearSelected }) {

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
			{ gear.map(g => (
				<GearCard key={ g.id } 
					gear={ g } 
					style={ g.id === selectedGearId ? selectedCardStyle : cardStyle }
					onClick={ () => onGearSelected(g.id) } />
			))}
		</div>
	)
}

GearSelect.propTypes = {
	gear: PropTypes.array,
	selectedGearId: PropTypes.string,
	onGearSelected: PropTypes.func
}

GearSelect.defaultProps = {
	gear: [],
	selectedGearId: null,
	onGearSelected: (gear) => {}
}

export default withTheme()(GearSelect)