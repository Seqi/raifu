import React, { useState, useEffect, FC } from 'react'
import PropTypes from 'prop-types'

import { ArmoryItems, Category, PlatformOf } from 'app/data/constants/platforms'

import { ArmoryItem, ArmoryItemPropShape } from '../models/armory-item'

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
const loadImage = async (
	resourceCategory: string,
	resourceType: string,
	resourcePlatform: string,
	rotate?: boolean
): Promise<string | undefined> => {
	try {
		let formattedPlatform = resourcePlatform
			.toLowerCase()
			.replace(/[.]/g, '')
			.replace(/\s/g, '-')
			.replace(/\//g, '-')

		if (rotate) {
			formattedPlatform += '-flat'
		}

		// eslint-disable-next-line import/dynamic-import-chunkname
		return import(
			`assets/outlines/${resourceCategory}/${resourceType}/${formattedPlatform}.svg`
		).then((i) => i.default)
	} catch (e) {
		return undefined
	}
}

const loadImageOrDefault = async (
	resourceCategory: Category,
	resourceType: string,
	resourcePlatform: string,
	rotate?: boolean
): Promise<string | undefined> => {
	let img = await loadImage(resourceCategory, resourceType, resourcePlatform, rotate)

	// Try fetch a default for the provided options
	if (!img) {
		const resourceTypeDefaults = defaults[resourceCategory]

		if (!resourceTypeDefaults) {
			throw new Error(`No default was found for image type ${resourceCategory}`)
		}

		// Hack: Can't get type conversion to work nice
		const type = resourceType as keyof typeof resourceTypeDefaults
		const defaultPlatform = resourceTypeDefaults[type]
		img = await loadImage(resourceType, resourceType, defaultPlatform)
	}

	return img
}

type ResourceImageProps = {
	// TODO: Could use classes for armoryitem and check instance
	resourceType: Category
	resource: ArmoryItem
	rotate?: boolean
	style?: React.CSSProperties
}

const ArmoryItemImage: FC<ResourceImageProps> = ({
	resourceType,
	resource,
	rotate,
	style,
}) => {
	let [image, setImage] = useState<string>()

	useEffect(() => {
		loadImageOrDefault(resourceType, resource.type, resource.platform, rotate).then(
			(img) => {
				if (!img) {
					// eslint-disable-next-line no-console
					console.warn(`Could not find image for ${resource.type} ${resource.platform}`)
				}

				setImage(img)
			}
		)
	}, [resourceType, resource, rotate])

	if (image) {
		return (
			<img
				style={{ ...{ width: '100%', height: '100%' }, ...style }}
				alt={resource.platform}
				src={image}
			/>
		)
	}

	return <div />
}

ArmoryItemImage.propTypes = {
	rotate: PropTypes.bool,
	resourceType: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing'] as const)
		.isRequired,
	resource: PropTypes.shape(ArmoryItemPropShape).isRequired,
	style: PropTypes.object,
}

ArmoryItemImage.defaultProps = {
	rotate: false,
	style: {},
}

export default ArmoryItemImage
