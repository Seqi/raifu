/* eslint-disable react/prop-types */
import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { styled, BoxProps, CardProps } from '@material-ui/core'

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

export const ArmoryCardContainer = styled(ResourceCard)(({ theme }) => ({
	width: '100%',
	height: '100%',

	'&:hover': {
		transform: 'scale(1.05)',
		zIndex: 1,

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

type RatioedArmoryCardContainerProps = BoxProps & Pick<ArmoryCardProps, 'ratio' | 'onClick' | 'cardProps'> 
export const RatioedArmoryCardContainer: FC<RatioedArmoryCardContainerProps> = ({ ratio = 1.36, onClick, children, cardProps, ...boxProps }) => {
	return (
		<RatioedBox ratio={ ratio } { ...boxProps }>
			<ArmoryCardContainer onClick={ onClick } { ...cardProps }>{children}</ArmoryCardContainer>
		</RatioedBox>
	)
}

// Actually implement the card
export type ArmoryCardProps = BoxProps &
	ResourceItemProps<ArmoryItem> & {
		category: Category
		canDelete?: boolean
		ratio?: number
		cardProps?: CardProps
	}

// eslint-disable-next-line react/no-multi-comp
export const ArmoryCard: FC<ArmoryCardProps> = ({
	item: resource,
	ratio = 1.36,
	category,
	canDelete,
	onDelete,
	onClick,
	cardProps,
	...boxProps
}: ArmoryCardProps) => {
	return (
		<RatioedArmoryCardContainer ratio={ ratio } onClick={ onClick } { ...boxProps } cardProps={ cardProps }>
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
}

ArmoryCard.defaultProps = {
	canDelete: true,
}
