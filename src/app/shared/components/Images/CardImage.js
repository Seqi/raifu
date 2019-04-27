import React from 'react'
import PropTypes from 'prop-types'

import { getImage } from 'app/shared/services/card-image-service'

export default function CardImage({ entity, category }) {
	let img = getImage(category, entity.type, entity.platform)

	if (img) {
		return <img alt={ entity.platform } src={ img } />
	} else {
		return <div />
	}
}

CardImage.propTypes = {
	category: PropTypes.string.isRequired,
	entity: PropTypes.object.isRequired
}