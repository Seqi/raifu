import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import RotatedImage from './RotatedImage'

const defaults = {
	rifles: 'm4',
	smgs: 'mp5',
	shotguns: 'spas-12',
	pistols: '1911',
	launchers: 'gl06',
	snipers: 'l96',
	support: 'm249'
}

const loadImage = (resourceCategory, resourceType, resourcePlatform) => {
	try {
		return require(`assets/outlines/${resourceCategory}/${resourceType}/${resourcePlatform}.svg`)
	} catch {
		return undefined
	}
}

export default function ResourceImage({ resourceType, resource, rotate }) {
	let [image, setImage] = useState()

	useEffect(() => {
		let formattedPlatform = resource.platform
			.toLowerCase()
			.replace(/[.]/g, '')
			.replace(/\s/g, '-')
			.replace(/\//g, '-')

		let img =
			loadImage(resourceType, resource.type, formattedPlatform) ??
			loadImage(resourceType, resource.type, defaults[resource.type])

		if (!img) {
			console.warn(`Could not find image for ${resource.type} ${resource.platform}`)
		}

		setImage(img)
	}, [resourceType, resource])

	if (image) {
		return <RotatedImage image={ image } rotateBy={ rotate ? 45 : 0 } />
	}

	return <div />
}

ResourceImage.propTypes = {
	rotate: PropTypes.bool,
	resourceType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing']).isRequired,
	resource: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired
	}).isRequired
}

ResourceImage.defaultProps = {
	rotate: false
}
