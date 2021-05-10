import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { CardProps, styled } from '@material-ui/core'

import { DeletableOverlay } from 'app/shared/actions/delete'
import { Category } from 'app/data/constants/platforms'

import {
	ResourceCard,
	ResourceCardHeader,
	ResourceCardContent,
	ResourceItemProps,
} from 'app/features/resource'

import ArmoryItemImage from '../ArmoryItemImage'
import { ArmoryItem, ArmoryItemPropShape } from '../../models/armory-item'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

// Do some stuff for a reactive, customisable armory card
export type ArmoryCardContainerSize = 'small' | 'large'
type ArmoryCardContainerProps = { size?: ArmoryCardContainerSize }

// Map the armory card sizes
const cardSizeMap: {
	[key in ArmoryCardContainerSize]: {
		[key in Breakpoint | number]: [width: number, height: number]
	}
} = {
	small: {
		321: [120, 163],
		xs: [147, 200],
		sm: [180, 244.8],
		md: [209, 285],
		lg: [209, 285],
		xl: [209, 285],
	},
	large: {
		321: [120, 180],
		xs: [135, 197],
		sm: [209, 285],
		md: [240, 326.4],
		lg: [253, 345],
		xl: [253, 345],
	},
}

export const ArmoryCardContainer: React.ComponentType<
	CardProps & ArmoryCardContainerProps
> = styled(ResourceCard)(({ theme, size }) => {
	const sizes = cardSizeMap[size || 'large']

	const mediaQueries = Object.keys(sizes)
		.filter((size) => size !== 'xl')
		.reverse()
		.reduce((queries: any, size: string) => {
			const bp = size as Breakpoint
			const [width, height] = sizes[bp]

			queries[theme.breakpoints.down(bp)] = {
				width: `${width}px`,
				height: `${height}px`,
			}

			return queries
		}, {})

	const [defaultWidth, defaultHeight] = sizes['xl']

	return {
		width: `${defaultWidth}px`,
		height: `${defaultHeight}px`,

		'&:hover': {
			transform: 'scale(1.05)',
		},

		...mediaQueries,
	}
})

// Actually implement the card
export type ArmoryCardProps = ResourceItemProps<ArmoryItem> & {
	category: Category
	canDelete?: boolean
	size?: 'small' | 'large'
	ArmoryCardContainer?: React.ComponentType<CardProps>
}

export const ArmoryCard: FC<ArmoryCardProps> = ({
	item: resource,
	size,
	category,
	canDelete,
	onDelete,
	...props
}: ArmoryCardProps) => {
	return (
		<ArmoryCardContainer size={ size } { ...props }>
			<DeletableOverlay
				canDelete={ canDelete }
				onDelete={ onDelete }
				dialogTitle={ resource.getTitle() }
			>
				<ResourceCardHeader resource={ resource } />

				<ResourceCardContent>
					<ArmoryItemImage resource={ resource } resourceType={ category } />
				</ResourceCardContent>
			</DeletableOverlay>
		</ArmoryCardContainer>
	)
}

export default ArmoryCard

ArmoryCard.propTypes = {
	item: PropTypes.shape(ArmoryItemPropShape).isRequired,
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing'] as const)
		.isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	size: PropTypes.oneOf(['small', 'large'] as const),
}

ArmoryCard.defaultProps = {
	canDelete: true,
	size: 'large',
}
