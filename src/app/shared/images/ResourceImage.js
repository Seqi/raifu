import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import RotatedImage from './RotatedImage'

export default function ResourceImage({ resourceType, resource, rotate }) {
	let [image, setImage] = useState()

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
		}
	}, [resourceType, resource])

	if (image) {
		return <RotatedImage image={image} rotateBy={rotate ? 45 : 0} />
	}

	return <div />
}

ResourceImage.propTypes = {
	rotate: PropTypes.bool,
	resourceType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing']).isRequired,
	resource: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
	}).isRequired,
}

ResourceImage.defaultProps = {
	rotate: false,
}
