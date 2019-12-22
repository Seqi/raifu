import React from 'react'
import PropTypes from 'prop-types'

import ResourceImage from 'app/shared/components/images/ResourceImage'

const fillParent = {
	display: 'flex',
	width: '100%',
	height: '100%'
} 

export default function LoadoutItemImage({ item, category, textStyle }) {
	return (
		<div style={ fillParent }>
			<ResourceImage 
				style={ fillParent } 
				resource={ item } 
				resourceType={ category }
				rotate={ category === 'attachments' } />

			<span className='loadout-weapon-attachment-item-text' style={ {
				position: 'absolute',
				bottom: 0, 
				right: 0, 
				fontSize: '16px', 
				...textStyle 
			} }>
				{ item.getTitle() }
			</span>
		</div>
	)
}

LoadoutItemImage.propTypes = {
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
	textStyle: PropTypes.object
}

LoadoutItemImage.defaultProps = {
	textStyle: {}
}