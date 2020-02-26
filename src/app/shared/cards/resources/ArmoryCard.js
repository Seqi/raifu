import React from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/core'

import Deletable from 'app/shared/actions/Deletable'
import ResourceImage from 'app/shared/images/ResourceImage'

import { ResourceCard, ResourceCardHeader, ResourceCardContent } from './ResourceCard'

const ArmoryCardContainer = styled(ResourceCard)(({ theme }) => ({
	width: '220px',
	height: '300px',

	[theme.breakpoints.down('xs')]: {
		height: '200px',
		width: '147px',
	}
}))

export default function ArmoryCard({ item, category, canDelete, onClick, onDelete, className }) {
	return (
		<ArmoryCardContainer className={ className } onClick={ onClick }>
			<Deletable canDelete={ canDelete } onDelete={ onDelete } dialogTitle={ item.getTitle() }>
				<ResourceCardHeader resource={ item } />

				<ResourceCardContent>
					<ResourceImage resource={ item } resourceType={ category } />
				</ResourceCardContent>
			</Deletable>
		</ArmoryCardContainer>
	)
}

ArmoryCard.propTypes = {
	item: PropTypes.shape({
		platform: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
	}).isRequired,
	category: PropTypes.oneOf(['weapons', 'attachments', 'gear', 'clothing']).isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
	// Allows us to use styled components to style the ArmoryCard further
	className: PropTypes.string,
}

ArmoryCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
	className: null
}