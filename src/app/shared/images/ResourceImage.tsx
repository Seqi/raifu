import { useState, useEffect, FC } from 'react'
import PropTypes from 'prop-types'

import { ArmoryItems, Category, PlatformOf } from 'app/data/constants/platforms'

import RotatedImage from './RotatedImage'
import { ArmoryItem } from '../models/armory-item'

const defaults: {
	[CKey in Category]: {
		[PKey in PlatformOf<CKey>]: ArmoryItems<CKey, PKey>
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
		barrel: 'Surpressor',
		externals: 'Grip',
		illumination: 'Flashlight',
		sights: 'Red Dot',
		underbarrel: 'Vertical Foregrip',
	},
	clothing: {
		footwear: 'Boots',
		hands: 'Gloves',
		hats: 'Cap',
		jackets: 'Smock',
		legs: 'Pants',
		shirts: 'Ubacs',
		suits: 'Gorka',
	},
	gear: {
		carriers: 'Plate Carrier',
		communication: 'Radio',
		grenades: 'Storm 360',
		holsters: 'Retention Holster',
		misc: 'Knife',
		protection: 'Fast Helmet',
	},
}

// TODO: Restrict types maybe?
const loadImage = (
	resourceCategory: string,
	resourceType: string,
	resourcePlatform: string
): string | undefined => {
	try {
		let formattedPlatform = resourcePlatform
			.toLowerCase()
			.replace(/[.]/g, '')
			.replace(/\s/g, '-')
			.replace(/\//g, '-')

		// TODO: Use esnext modules
		return require(`assets/outlines/${resourceCategory}/${resourceType}/${formattedPlatform}.svg`)
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
		let img = loadImage(resourceType, resource.type, resource.platform)

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
