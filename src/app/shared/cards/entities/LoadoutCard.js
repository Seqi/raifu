import React from 'react'
import PropTypes from 'prop-types'

import { Card, CardHeader, CardContent } from '@material-ui/core'

import Deletable from 'app/shared/actions/Deletable'
import WeaponDisplay from 'app/shared/images/WeaponDisplay'

import './LoadoutCard.css'

export default function LoadoutCard({loadout, canDelete, onClick, onDelete, style }) {	
	return (
		<Card style={ style } onClick={ onClick } className='card loadout-card' >
			<Deletable canDelete={ canDelete } onDelete={ onDelete } dialogTitle={ loadout.getTitle() }>
				<CardHeader title={ loadout.getTitle() } subheader={ loadout.getSubtitle() } className='card-header' />
			
				<CardContent className='card-content'>
					<WeaponDisplay weapons={ loadout.weapons } />
				</CardContent>
			</Deletable>
		</Card>
	)
}

LoadoutCard.propTypes = {
	loadout: PropTypes.shape({
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
		weapons: PropTypes.array
	}).isRequired,	
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	style: PropTypes.object,
}

LoadoutCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	style: {}
}