import { FC } from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/core'

import { DeletableOverlay } from 'app/shared/actions/delete'
import ResourceImage from 'app/shared/images/ResourceImage'

import {
	ResourceCard,
	ResourceCardHeader,
	ResourceCardContent,
} from './base/ResourceCard'
import { ArmoryItem, ArmoryItemPropShape } from '../models/armory-item'
import { Category } from 'app/data/constants/platforms'
import { ResourceCardProps } from '../resources/ResourceList'

export const ArmoryCardContainer = styled(ResourceCard)(({ theme }) => ({
	width: '220px',
	height: '300px',
	'&:hover': {
		transform: 'scale(1.05)',
	},

	[theme.breakpoints.down('xs')]: {
		height: '200px',
		width: '147px',
	},
}))

export type ArmoryCardProps = ResourceCardProps<ArmoryItem> & {
	category: Category
	canDelete?: boolean
	className?: string
}

export const ArmoryCard: FC<ArmoryCardProps> = ({
	item: resource,
	category,
	canDelete,
	onClick,
	onDelete,
	className,
}: ArmoryCardProps) => (
	<ArmoryCardContainer className={ className } onClick={ onClick }>
		<DeletableOverlay
			canDelete={ canDelete }
			onDelete={ onDelete }
			dialogTitle={ resource.getTitle() }
		>
			<ResourceCardHeader resource={ resource } />

			<ResourceCardContent>
				<ResourceImage resource={ resource } resourceType={ category } />
			</ResourceCardContent>
		</DeletableOverlay>
	</ArmoryCardContainer>
)

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
}

ArmoryCard.defaultProps = {
	canDelete: true,
	className: '',
}
