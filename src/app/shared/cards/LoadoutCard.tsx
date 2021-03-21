import React, { FC } from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/core'

import { DeletableOverlay } from 'app/shared/actions/delete'
import WeaponDisplay from 'app/shared/images/WeaponDisplay'

import {
	ResourceCard,
	ResourceCardHeader,
	ResourceCardContent,
	ResourceCardProps,
} from './base/ResourceCard'
import { Loadout, LoadoutPropType } from '../models/loadout'

const LoadoutCardContainer = styled(ResourceCard)({
	// For cards with non-height-affecting content (i.e. add card),
	// give it some height
	minHeight: '175px',
	'&:hover': {
		transform: 'scale(1.005)',
	},
})

const LoadoutCardContent = styled(ResourceCardContent)({
	overflow: 'unset',
})

export type LoadoutCardProps = ResourceCardProps & {
	item: Loadout
}

export type LoadoutCardLike = FC<LoadoutCardProps> & {
	template: React.ComponentType<any>
}

const LoadoutCard: LoadoutCardLike = ({ item, canDelete, onClick, onDelete }) => {
	return (
		<LoadoutCardContainer onClick={ onClick }>
			<DeletableOverlay
				canDelete={ canDelete }
				onDelete={ onDelete || Promise.resolve }
				dialogTitle={ item.getTitle() }
			>
				<ResourceCardHeader resource={ item } />

				<LoadoutCardContent>
					<WeaponDisplay weapons={ item.weapons } />
				</LoadoutCardContent>
			</DeletableOverlay>
		</LoadoutCardContainer>
	)
}

LoadoutCard.template = LoadoutCardContainer

export { LoadoutCardContainer, LoadoutCardContent, LoadoutCard }
export default LoadoutCard

LoadoutCard.propTypes = {
	item: PropTypes.shape(LoadoutPropType).isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
}

LoadoutCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: Promise.resolve,
}
