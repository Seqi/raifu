import { FC } from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/core'

import { DeletableOverlay } from 'app/shared/actions/delete'

import {
	ResourceCard,
	ResourceCardHeader,
	ResourceCardContent,
	ResourceItemProps,
} from 'app/features/resource'

import { Loadout, LoadoutPropType } from '../../models'
import LoadoutSummary from '../LoadoutSummary'

export const LoadoutCardContainer = styled(ResourceCard)({
	// For cards with non-height-affecting content (i.e. add card),
	// give it some height
	height: '250px',
	width: '100%',
	'&:hover': {
		transform: 'scale(1.005)',
	},
})

const LoadoutCardContent = styled(ResourceCardContent)({
	overflow: 'unset',
})

export type LoadoutCardProps = ResourceItemProps<Loadout>

export const LoadoutCard: FC<LoadoutCardProps> = ({ item, onClick, onDelete }) => (
	<LoadoutCardContainer onClick={ onClick }>
		<DeletableOverlay
			canDelete={ true }
			onDelete={ onDelete || Promise.resolve }
			dialogTitle={ item.getTitle() }
		>
			<ResourceCardHeader resource={ item } />

			<LoadoutCardContent>
				<LoadoutSummary loadout={ item } />
			</LoadoutCardContent>
		</DeletableOverlay>
	</LoadoutCardContainer>
)

export default LoadoutCard

LoadoutCard.propTypes = {
	item: PropTypes.shape(LoadoutPropType).isRequired,
	onClick: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
}
