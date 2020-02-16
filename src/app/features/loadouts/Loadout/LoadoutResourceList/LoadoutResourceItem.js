import React from 'react'
import PropTypes from 'prop-types'

import ResourceImage from 'app/shared/images/ResourceImage'

const fillParent = {
	display: 'flex',
	width: '100%',
	height: '100%'
}

const cornerText = {	
	position: 'absolute',
	bottom: '10px', 
	right: 0, 
	fontSize: '16px',
}

export default function LoadoutResourceItem({ item, resourceType }) {
	return (
		<div style={ fillParent }>
			<ResourceImage 
				style={ fillParent } 
				resource={ item } 
				resourceType={ resourceType }
				rotate={ resourceType === 'attachments' } 
			/>

			<span style={ cornerText }>
				{ item.getTitle() }
			</span>
		</div>
	)
}

LoadoutResourceItem.propTypes = {
	resourceType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing']).isRequired,
	item: PropTypes.shape({
		getTitle: PropTypes.func.isRequired,
	}).isRequired,
}