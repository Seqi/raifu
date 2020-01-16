import React from 'react'
import PropTypes from 'prop-types'

import ResourceCard from './ResourceCard'
import ResourceImage from 'app/shared/images/ResourceImage'

import './ArmoryCard.css'

export default function ArmoryCard({ resource, resourceType, ...props }) {
	return (		
		<ResourceCard resource={ resource } className='armory-card' { ...props }>
			<ResourceImage resource={ resource } resourceType={ resourceType } />
		</ResourceCard>
	)
}

ArmoryCard.propTypes = {
	resource: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
	}).isRequired,
	resourceType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing']).isRequired,
}
