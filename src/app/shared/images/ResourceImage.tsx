import { useState, useEffect, FC } from 'react'
import PropTypes from 'prop-types'

import { Category, Platform } from 'app/data/constants/platforms'

import RotatedImage from './RotatedImage'
import { ArmoryItem } from '../models/armory-item'

const defaults: {
	[CKey in Category]: {
		// TODO: Unsure why this is classed as unused?
		// eslint-disable-next-line no-unused-vars
		[PKey in Platform<CKey>]: string // TODO: Doesnt work with number indexer.. ArmoryItems<CKey, PKey>
	}
} = {
	weapons: {
		rifles: 'M4',
		smgs: 'MP5',
		shotguns: 'SPAS-12',
		pistols: '1911',
		launchers: 'GL06',
		snipers: 'L96',
		support: 'M249',
	},
	attachments: {
		barrel: 'surpressor',
		externals: 'grip',
		illumination: 'flashlight',
		sights: 'red-dot',
		underbarrel: 'vertical-foregrip',
	},
	clothing: {
		footwear: 'boots',
		hands: 'gloves',
		hats: 'cap',
		jackets: 'smock',
		legs: 'pants',
		shirts: 'ubacs',
		suits: 'gorka',
	},
	gear: {
		carriers: 'plate-carrier',
		communication: 'radio',
		grenades: 'storm-360',
		holsters: 'retention-holster',
		misc: 'knife',
		protection: 'fast-helmet',
	},
}

// TODO: Restrict types maybe?
const loadImage = (
	resourceCategory: string,
	resourceType: string,
	resourcePlatform: string
): string | undefined => {
	try {
		// TODO: Use esnext modules
		return require(`assets/outlines/${resourceCategory}/${resourceType}/${resourcePlatform}.svg`)
			.default
	} catch {
		return undefined
	}
}

type ResourceImageProps = {
	resourceType: Category
	resource: ArmoryItem
	rotate?: boolean
}

const ResourceImage: FC<ResourceImageProps> = ({ resourceType, resource, rotate }) => {
	// TODO: Type
	let [image, setImage] = useState<any>()

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
				// eslint-disable-next-line no-console
				console.warn(`Type ${resourceType} is not a valid resource type.`)
			} else {
				// Hack: Can't get type conversion to work nice
				const type = resource.type as keyof typeof resourceTypeDefaults
				const defaultPlatform = resourceTypeDefaults[type]
				img = loadImage(resourceType, resource.type, defaultPlatform)
			}
		}

		if (!img) {
			// eslint-disable-next-line no-console
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
	resourceType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing'] as const)
		.isRequired,
	resource: PropTypes.shape({
		id: PropTypes.string.isRequired,
		brand: PropTypes.string,
		model: PropTypes.string,
		nickname: PropTypes.string,
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		createdAt: PropTypes.instanceOf(Date).isRequired,
		updatedAt: PropTypes.instanceOf(Date).isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
	}).isRequired,
}

ResourceImage.defaultProps = {
	rotate: false,
}

export default ResourceImage
