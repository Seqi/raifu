import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import CardImage from 'app/shared/components/Images/CardImage'
import CardDeleteButton from 'app/shared/components/Cards/CardDeleteButton'

import './WeaponCard.css'

export default function WeaponCard({ weapon, canDelete, onClick, onDelete, style }) {
	return (
		<Card style={ style } onClick={ onClick } className='card weapon-card' >
			{ canDelete && <CardDeleteButton onClick={ onDelete } /> }
			<CardHeader title={ weapon.getTitle() } subheader={ weapon.getSubtitle() } className='card-header' />
			<CardContent className='card-content'>
				<CardImage entity={ weapon } category='weapons' />
			</CardContent>
		</Card>
	)
}

WeaponCard.propTypes = {
	weapon: PropTypes.object.isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	style: PropTypes.object,
}

WeaponCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	style: {}
}