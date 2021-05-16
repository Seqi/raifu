/* eslint-disable react/prop-types */
import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/core'

import { DeletableOverlay } from 'app/shared/actions/delete'
import { Category } from 'app/data/constants/platforms'

import {
	ResourceCard,
	ResourceCardHeader,
	ResourceCardContent,
	ResourceItemProps,
} from 'app/features/resource'

import { RatioedBox } from 'app/shared/containers/RatioedBox'
import ArmoryItemImage from '../ArmoryItemImage'
import { ArmoryItem, ArmoryItemPropShape } from '../../models/armory-item'

// Do some stuff for a reactive, customisable armory card
export type ArmoryCardContainerSize = 'small' | 'large'

export const ArmoryCardContainer = styled(ResourceCard)(({ theme }) => ({
	width: '100%',
	height: '100%',

	'&:hover': {
		transform: 'scale(1.05)',
		zIndex: 11,

		[theme.breakpoints.down('xs')]: {
			transform: 'scale(1.2)',
			'& .MuiCardHeader-title': {
				fontSize: '0.6rem',
			},
			'& .MuiCardHeader-subheader': {
				fontSize: '0.5rem',
			},
		},
	},
}))

export const RatioedArmoryCardContainer: FC<
	Pick<ArmoryCardProps, 'ratio' | 'onClick' | 'size'>
> = ({ ratio = 1.36, onClick, size, children }) => {
	return (
		// Set some static sizes for larger portions as Grid doesnt accommodate
		// for what we want
		<RatioedBox
			ratio={ ratio }
			width={ {
				xl: `${size === 'large' ? 253 : 209}px`,
			} }
		>
			<ArmoryCardContainer onClick={ onClick }>{children}</ArmoryCardContainer>
		</RatioedBox>
	)
}

// Actually implement the card
export type ArmoryCardProps = ResourceItemProps<ArmoryItem> & {
	category: Category
	canDelete?: boolean
	size?: 'small' | 'large'
	ratio?: number
}

// eslint-disable-next-line react/no-multi-comp
export const ArmoryCard: FC<ArmoryCardProps> = ({
	item: resource,
	size,
	ratio = 1.36,
	category,
	canDelete,
	onDelete,
	onClick,
}: ArmoryCardProps) => {
	return (
		<RatioedArmoryCardContainer size={ size } ratio={ ratio } onClick={ onClick }>
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
		</RatioedArmoryCardContainer>
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
