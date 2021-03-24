import { FC } from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/core'

import { DeletableOverlay } from 'app/shared/actions/delete'
import WeaponDisplay from 'app/shared/images/WeaponDisplay'

import {
	ResourceCard,
	ResourceCardHeader,
	ResourceCardContent,
} from './base/ResourceCard'
import { Loadout, LoadoutPropType } from '../models/loadout'
import { ResourceCardProps } from '../resources/ResourceList'

export const LoadoutCardContainer = styled(ResourceCard)({
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

export type LoadoutCardProps = ResourceCardProps<Loadout>

export const LoadoutCard: FC<LoadoutCardProps> = ({ item, onClick, onDelete }) => {
	return (
		<LoadoutCardContainer onClick={ onClick }>
			<DeletableOverlay
				canDelete={ true }
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

export default LoadoutCard

LoadoutCard.propTypes = {
	item: PropTypes.shape(LoadoutPropType).isRequired,
	onClick: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
}
