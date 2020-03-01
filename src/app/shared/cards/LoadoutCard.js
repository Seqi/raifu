import React from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/core'

import { DeletableOverlay } from 'app/shared/actions/delete'
import WeaponDisplay from 'app/shared/images/WeaponDisplay'

import { ResourceCard, ResourceCardHeader, ResourceCardContent } from './base/ResourceCard'

const LoadoutCardContainer = styled(ResourceCard)({
	// For cards with non-height-affecting content (i.e. add card),
	// give it some height
	minHeight: '175px',
	'&:hover': {
		transform: 'scale(1.005)',
	},
})

const LoadoutCardContent = styled(ResourceCardContent)({
	overflow: 'unset'
})

const LoadoutCard = ({ item: loadout, canDelete, onClick, onDelete }) => {	
	return (
		<LoadoutCardContainer onClick={ onClick } >
			<DeletableOverlay canDelete={ canDelete } onDelete={ onDelete } dialogTitle={ loadout.getTitle() }>
				<ResourceCardHeader resource={ loadout } />
			
				<LoadoutCardContent>
					<WeaponDisplay weapons={ loadout.weapons } />
				</LoadoutCardContent>
			</DeletableOverlay>
		</LoadoutCardContainer>
	)
}

LoadoutCard.template = LoadoutCardContainer

export { LoadoutCardContainer, LoadoutCardContent, LoadoutCard }
export default LoadoutCard

LoadoutCard.propTypes = {
	item: PropTypes.shape({
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
		weapons: PropTypes.array
	}).isRequired,	
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
}

LoadoutCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: () => {},
}