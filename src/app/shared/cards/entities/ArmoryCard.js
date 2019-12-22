import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import ResourceImage from 'app/shared/images/ResourceImage'
import DeleteButton from 'app/shared/buttons/DeleteButton'

import './ArmoryCard.css'

export default function ArmoryCard({ item, category, canDelete, onClick, onDelete, style, className }) {
	return (
		<Card style={ style } onClick={ onClick } className={ `${className} card armory-card` } >
			{ canDelete && <DeleteButton onClick={ onDelete } /> }
			
			<CardHeader title={ item.getTitle() } subheader={ item.getSubtitle() } className='card-header'/>

			<CardContent className='card-content'>
				<ResourceImage resource={ item } resourceType={ category } />
			</CardContent>
		</Card>
	)
}

ArmoryCard.propTypes = {
	item: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
	}).isRequired,
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear']).isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	style: PropTypes.object,
	className: PropTypes.string
}

ArmoryCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	style: {},
	className: ''
}