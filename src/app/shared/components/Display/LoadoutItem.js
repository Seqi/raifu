import React from 'react'
import PropTypes from 'prop-types'

import DeleteButton from '../Buttons/DeleteButton'
import LoadoutItemImage from '../Images/LoadoutItemImage'

import './LoadoutItem.css'

export default function LoadoutItem({ item, category, textStyle, onDelete }) {
	return (
		<div className='loadout-item'>
			<DeleteButton style={ {top: '10px'} } onClick={ onDelete } />
			<LoadoutItemImage item={ item } category={ category } textStyle={ textStyle } />		
		</div>
	)
}

LoadoutItem.propTypes = {
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear']).isRequired,
	item: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		model: PropTypes.string,
		brand: PropTypes.string,
		nickname: PropTypes.string,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired
	}).isRequired,
	textStyle: PropTypes.object,
	onDelete: PropTypes.func
}

LoadoutItem.defaultProps = {
	textStyle: {},
	onDelete: () => {}
}