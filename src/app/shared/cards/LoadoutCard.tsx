import React, { FC, MouseEventHandler } from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/core'

import { DeletableOverlay } from 'app/shared/actions/delete'
import WeaponDisplay from 'app/shared/images/WeaponDisplay'

import {
	ResourceCard,
	ResourceCardHeader,
	ResourceCardContent,
} from './base/ResourceCard'
import { Loadout } from '../models/loadout'

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

export type LoadoutCardProps = {
	item: Loadout
	canDelete?: boolean
	onClick?: MouseEventHandler<HTMLDivElement>
	onDelete?: () => Promise<any>
	className?: string
}

export type LoadoutCardLike = FC<LoadoutCardProps> & {
	template: React.ComponentType<any>
}

const LoadoutCard: LoadoutCardLike = ({
	item: loadout,
	canDelete,
	onClick,
	onDelete,
}) => {
	return (
		<LoadoutCardContainer onClick={ onClick }>
			<DeletableOverlay
				canDelete={ canDelete }
				onDelete={ onDelete || Promise.resolve }
				dialogTitle={ loadout.getTitle() }
			>
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
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		shared: PropTypes.bool.isRequired,
		createdAt: PropTypes.instanceOf(Date).isRequired,
		updatedAt: PropTypes.instanceOf(Date).isRequired,
		getTitle: PropTypes.func.isRequired,
		getSubtitle: PropTypes.func.isRequired,
		weapons: PropTypes.array.isRequired,
	}).isRequired,
	canDelete: PropTypes.bool,
	onClick: PropTypes.func,
	onDelete: PropTypes.func,
}

LoadoutCard.defaultProps = {
	canDelete: false,
	onClick: () => {},
	onDelete: Promise.resolve,
}
