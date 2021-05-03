import { FC } from 'react'
import PropTypes from 'prop-types'
import { Box, styled } from '@material-ui/core'

import { ArmoryItemImage } from 'app/features/armory'
import { Loadout, LoadoutPropType } from '../models'

const LoadoutSummaryContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-around',
	alignItems: 'center',

	padding: theme.spacing(2, 0),
}))

// This is used to control the height of the images
// Not too sure why i gotta do this but it is what it is
const LoadoutSummaryItemContainer = styled(Box)({
	height: '150px',
})

type LoadoutSummaryProps = {
	loadout: Loadout
}

const LoadoutSummary: FC<LoadoutSummaryProps> = ({ loadout }) => {
	if (!loadout.weapons || loadout.weapons.length === 0) {
		return <div>No items</div>
	}

	return (
		<LoadoutSummaryContainer>
			{loadout.weapons.map((weapon) => (
				<LoadoutSummaryItemContainer key={ weapon.id }>
					<ArmoryItemImage resourceType='weapons' resource={ weapon } />
				</LoadoutSummaryItemContainer>
			))}
		</LoadoutSummaryContainer>
	)
}

LoadoutSummary.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType).isRequired,
}

export default LoadoutSummary
