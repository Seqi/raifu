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

export type ArmoryCardContainerSize = 'small' | 'large'
type ArmoryCardContainerProps = CardProps & { size?: ArmoryCardContainerSize }

export const ArmoryCardContainer: React.ComponentType<ArmoryCardContainerProps> = styled(
	ResourceCard
)(({ theme, size }) => ({
	width: size === 'large' ? '253px' : '209px', // Old: 220
	height: size === 'large' ? '345px' : '285px', // Old: 300

	'&:hover': {
		transform: 'scale(1.05)',
	},

	[theme.breakpoints.down('xs')]: {
		height: '200px',
		width: '147px',
	},
}))

export type ArmoryCardProps = ResourceItemProps<ArmoryItem> &
	CardProps & {
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
	// Allows us to use styled components to style the ArmoryCard further
	className: PropTypes.string,
	size: PropTypes.oneOf(['small', 'large'] as const),
}

ArmoryCard.defaultProps = {
	canDelete: true,
	className: '',
	size: 'large',
}
