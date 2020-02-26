import React from 'react'
import PropTypes from 'prop-types'

import { styled } from '@material-ui/core'

import Deletable from 'app/shared/actions/Deletable'
import WeaponDisplay from 'app/shared/images/WeaponDisplay'

import { ResourceCard, ResourceCardHeader, ResourceCardContent } from './ResourceCard'

const LoadoutCardContent = styled(ResourceCardContent)({
	overflow: 'unset'
})

export default function LoadoutCard({loadout, canDelete, onClick, onDelete }) {	
	return (
		<ResourceCard onClick={ onClick } >
			<Deletable canDelete={ canDelete } onDelete={ onDelete } dialogTitle={ loadout.getTitle() }>
				<ResourceCardHeader resource={ loadout } />
			
				<LoadoutCardContent>
					<WeaponDisplay weapons={ loadout.weapons } />
				</LoadoutCardContent>
			</Deletable>
		</ResourceCard>
	)
}

LoadoutCard.propTypes = {
	loadout: PropTypes.shape({
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