import React from 'react'
import PropTypes from 'prop-types'

import RotatedImage from './RotatedImage'
import getImage from 'app/shared/services/armory-image-service'

export default function ArmoryItemImage({ style, entity, category, rotate }) {
	let img = getImage(category, entity.type, entity.platform)

	if (img) {
		return rotate ?
			<RotatedImage image={ img } rotateBy={ 45 } /> :
			<img style={ style } alt={ entity.platform } src={ img } />
	} else {
		return <div />
	}
}

ArmoryItemImage.propTypes = {
	style: PropTypes.object,
	rotate: PropTypes.bool,
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear']).isRequired,
	entity: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired
	}).isRequired,
}

ArmoryItemImage.defaultProps = {
	style: {},
	rotate: false
}