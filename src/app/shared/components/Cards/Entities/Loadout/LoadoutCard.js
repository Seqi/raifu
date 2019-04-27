import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import LoadoutCardContent from './LoadoutCardContent'
import CardDeleteButton from 'app/shared/components/Cards/CardDeleteButton'

import './LoadoutCard.css'

export default function LoadoutCard({loadout, canDelete, onClick, onDelete, styles }) {	
	return (
		<Card style={ styles } onClick={ onClick } className='card loadout-card' >
			{ canDelete && <CardDeleteButton onClick={ onDelete } /> }

			<CardHeader title={ loadout.getTitle() } subheader={ loadout.getSubtitle() } className='card-header' />
			
			<CardContent className='card-content'>
				<LoadoutCardContent weapons={ loadout.weapons } />
			</CardContent>
		</Card>
	)
}

LoadoutCard.propTypes = {
	loadout: PropTypes.object.isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	styles: PropTypes.object,
}

LoadoutCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	styles: {}
}