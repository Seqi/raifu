import { FC } from 'react'
import PropTypes from 'prop-types'
import { Box, styled } from '@material-ui/core'

import { ArmoryItemImage } from 'app/features/armory'
import { Loadout, LoadoutPropType } from '../models'

const LoadoutSummaryContainer = styled(Box)({
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',

	marginTop: '-30px',
	marginBottom: '-30px'
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
				<div key={ weapon.id }>
					<ArmoryItemImage resourceType='weapons' resource={ weapon } rotate={ true } />
				</div>
			))}
		</LoadoutSummaryContainer>
	)
}

LoadoutSummary.propTypes = {
	loadout: PropTypes.shape(LoadoutPropType).isRequired
}

export default LoadoutSummary
