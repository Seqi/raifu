/* eslint-disable react/no-multi-comp */
import React from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/core'

import { DeletableOverlay } from 'app/shared/actions/delete'
import ResourceImage from 'app/shared/images/ResourceImage'

import { ResourceCard, ResourceCardHeader, ResourceCardContent } from './base/ResourceCard'

const ArmoryCardContainer = styled(ResourceCard)(({ theme }) => ({
	width: '220px',
	height: '300px',
	'&:hover': {
		transform: 'scale(1.05)'
	},

	[theme.breakpoints.down('xs')]: {
		height: '200px',
		width: '147px'
	}
}))

const ArmoryCard = ({ item, category, canDelete, onClick, onDelete, className }) => (
	<ArmoryCardContainer className={ className } onClick={ onClick }>
		<DeletableOverlay canDelete={ canDelete } onDelete={ onDelete } dialogTitle={ item.getTitle() }>
			<ResourceCardHeader resource={ item } />

			<ResourceCardContent>
				<ResourceImage resource={ item } resourceType={ category } />
			</ResourceCardContent>
		</DeletableOverlay>
	</ArmoryCardContainer>
)

ArmoryCard.template = ArmoryCardContainer

export { ArmoryCardContainer, ArmoryCard }
export default ArmoryCard

ArmoryCard.propTypes = {
	item: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired
	}).isRequired,
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing']).isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	// Allows us to use styled components to style the ArmoryCard further
	className: PropTypes.string
}

ArmoryCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	className: null
}
