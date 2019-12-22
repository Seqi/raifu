import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import RotatedImage from './RotatedImage'

export default function ResourceImage({ resourceType, resource, rotate, style }) {
	let [ image, setImage ] = useState()

	useEffect(() => {
		let formattedPlatform = resource.platform
			.toLowerCase()
			.replace(/[.]/g, '')
			.replace(/\s/g, '-')
			.replace(/\//g, '-')

		try {
			let img = require(`assets/outlines/${resourceType}/${resource.type}/${formattedPlatform}.svg`)
			setImage(img)
		} catch (e) {
			console.warn(e)
			return ''
		}
	}, [resourceType, resource])

	if (image) {
		return <RotatedImage style={ style } image={ image } rotateBy={ rotate ? 45 : 0 } />
	} else {
		return <div />
	}
}

ResourceImage.propTypes = {
	style: PropTypes.object,
	rotate: PropTypes.bool,
	resourceType: PropTypes.oneOf(['weapons', 'attachments', 'gear']).isRequired,
	resource: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired
	}).isRequired,
}

ResourceImage.defaultProps = {
	style: {},
	rotate: false
}