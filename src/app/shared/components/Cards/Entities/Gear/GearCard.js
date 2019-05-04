import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import ArmoryItemImage from 'app/shared/components/Images/ArmoryItemImage'
import CardDeleteButton from 'app/shared/components/Cards/CardDeleteButton'

import './GearCard.css'

export default function GearCard({ gear, canDelete, onClick, onDelete, style }) {
	return (
		<Card style={ style } onClick={ onClick } className='card weapon-card' >
			{ canDelete && <CardDeleteButton onClick={ onDelete } /> }
			<CardHeader title={ gear.getTitle() } subheader={ gear.getSubtitle() } className='card-header' />
			<CardContent className='card-content'>
				<ArmoryItemImage entity={ gear } category='gear' />
			</CardContent>
		</Card>
	)
}

GearCard.propTypes = {
	gear: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		model: PropTypes.string,
		brand: PropTypes.string,
		nickname: PropTypes.string,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
	}).isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	style: PropTypes.object,
}

GearCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	style: {}
}