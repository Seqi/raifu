import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import RotatedImage from './RotatedImage'

const defaults = {
	weapons: {
		rifles: 'm4',
		smgs: 'mp5',
		shotguns: 'spas-12',
		pistols: '1911',
		launchers: 'gl06',
		snipers: 'l96',
		support: 'm249'
	},
	attachments: {
		barrel: 'surpressor',
		externals: 'grip',
		illumination: 'flashlight',
		sights: 'red-dot',
		underbarrel: 'vertical-foregrip'
	},
	clothing: {
		footwear: 'boots',
		hands: 'gloves',
		hats: 'cap',
		jackets: 'smock',
		legs: 'pants',
		shirts: 'ubacs',
		suits: 'gorka'
	},
	gear: {
		carriers: 'plate-carrier',
		communication: 'radio',
		grenades: 'storm-360',
		holsters: 'retention-holster',
		misc: 'knife',
		protection: 'fast-helmet'
	}
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

		let img = loadImage(resourceType, resource.type, formattedPlatform)

		// Try fetch a default for the provided options
		if (!img) {
			const resourceTypeDefaults = defaults[resourceType]

			if (!resourceTypeDefaults) {
				console.warn(`Type ${resourceType} is not a valid resource type.`)
			} else {
				const defaultPlatform = resourceTypeDefaults[resource.type]
				img = loadImage(resourceType, resource.type, defaultPlatform)
			}
		}

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
