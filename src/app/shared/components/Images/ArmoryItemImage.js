import React from 'react'
import PropTypes from 'prop-types'

import getImage from 'app/shared/services/armory-image-service'

export default function ArmoryItemImage({ style, entity, category }) {
	let img = getImage(category, entity.type, entity.platform)

	if (img) {
		return <img style={ style } alt={ entity.platform } src={ img } />
	} else {
		return <div />
	}
}

ArmoryItemImage.propTypes = {
	style: PropTypes.object,
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear']).isRequired,
	entity: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired
	}).isRequired,
}

ArmoryItemImage.defaultProps = {
	style: {}
}